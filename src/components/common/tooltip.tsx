import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useResize } from '../../hooks/use_resize';
import Close from '../icons/close';
import { Button } from './button';
import { TypePopupPlacement } from './popup';

export interface TooltipProps {
  className?: string;
  content: string | ReactElement | ReactElement[];
  title?: string | ReactElement | ReactElement[];
  children?: ReactElement | ReactElement[] | string | number;
  animated?: boolean;
  onChange?: (value: boolean) => void;
  placement?: TypePopupPlacement;
  isLeaveOnClick?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const [anchor, setAnchor] = useState<HTMLDivElement>(null);
  const [ref, setRef] = useState<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResize();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    let newClicked = !clicked && !props.isLeaveOnClick;
    setClicked(newClicked);
    setIsOpen(newClicked);
    props.onChange(newClicked);
  };

  const handleMouseEnter = () => {
    if (!isMobile && !clicked) {
      setIsOpen(true);
      props.onChange(true);
    }
  };

  const handleMouseLeave = (e) => {
    if (!isMobile && !clicked && (!ref || !ref.contains(e.relatedTarget))) {
      setIsOpen(false);
      props.onChange(false);
    }
  };

  const calculateTooltipPosition = (anchor: HTMLElement | null,
                                    placement: TypePopupPlacement = 'bottom',
                                    ref: HTMLElement | null): [number, number] => {
    let left = 0;
    let top = 0;

    if (!anchor || !ref) return [ left, top ];

    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = ref.getBoundingClientRect();
    const scrollY = window.scrollY;

    const vertical = ['top', 'bottom'].includes(placement);

    if (vertical) {
      left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
    } else {
      top = anchorRect.top + (anchorRect.height / 2 - tooltipRect.height / 2) + scrollY;
    }

    if (placement.includes('right')) {
      left = anchorRect.left + anchorRect.width;
    } else if (placement.includes('left')) {
      left = anchorRect.left - tooltipRect.width;
    } else if (placement.includes('top')) {
      top = anchorRect.top - tooltipRect.height + scrollY;
    } else {
      top = anchorRect.top + anchorRect.height + scrollY;
    }

    if (left < 0) left = 18;
    if (top < 0) top = 10;
    if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width  - 18;

    return [left, top];
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && ref && !ref.contains(event.target as Node) && anchor && !anchor.contains(event.target as Node)) {
        setIsOpen(false);
        props.onChange(false);
        setClicked(false);
      }
    };

    if (isMobile && anchor) {
      document.body.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (isMobile && anchor) {
        document.body.removeEventListener('click', handleClickOutside);
      }
    };
  }, [anchor, ref, isMobile]);

  const renderTooltip = () => {
    let left, top;
    [ left, top ] = calculateTooltipPosition(anchor, props.placement, ref);

    return createPortal(
        <div
            ref={setRef}
            className={`tooltip__wrapper ${props.className} ${props.animated === false ? 'no-animation' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{ left, top }}
        >
          {isMobile ? (
              <>
                <div className={'tooltip__header'}>
                  <div className={'tooltip__title'}>{props.title}</div>
                  <Button
                      onClick={() => {
                        setClicked(false);
                        setIsOpen(false);
                      }}
                  >
                    <Close />
                  </Button>
                </div>
                <div className={'tooltip__body'}>{props.content}</div>
              </>
          ) : (
              <div className={'tooltip__body'}>{props.content}</div>
          )}
        </div>,
        document.body
    );
  };

  return (
      <div ref={setAnchor} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {props.children}
        {isOpen && renderTooltip()}
      </div>
  );
};
