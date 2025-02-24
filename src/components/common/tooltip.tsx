import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useResize } from '../../hooks/use_resize';
import Close from '../icons/close';
import { Button } from './button';

export interface TooltipProps {
  className?: string;
  content: string | ReactElement | ReactElement[];
  title?: string | ReactElement | ReactElement[];
  children?: ReactElement | ReactElement[] | string | number;
  animated?: boolean;
  onChange?: (value: boolean) => void;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const [anchor, setAnchor] = useState<HTMLDivElement>(null);
  const [ref, setRef] = useState<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResize();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    let newClicked = !clicked;
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
    if (anchor) {
      const bbox = anchor.getBoundingClientRect();
      const tooltipWidth = ref?.getBoundingClientRect().width ?? 0;

      left = bbox.left + bbox.width / 2 - tooltipWidth / 2;
      if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 18;
      if (left < 0) left = 18;

      top = bbox.top + bbox.height + window.scrollY;
      if (top < 0) top = 10;
    }

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
