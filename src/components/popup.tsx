import * as React from 'react';
import { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Close } from './icons';
import { Button } from './button';

export type TypePopupPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export interface PopupProps {
  className?: string;
  children?: ReactElement | ReactElement[];
  anchor?: HTMLElement;
  open: boolean;
  onClose: Function;
  onMouseUp?: Function;
  onMouseDown?: Function;
  onCloseBtn?: Function;
  id: string;
  title?: string | ReactElement;
  offset?: number;
  level?: number;
  placement?: TypePopupPlacement;
  /** Если задано true, в мобильной версии будет выглядеть и позиционироваться так же, как и на Desktop */
  preventMobileStyle?: boolean;
  container?: HTMLElement;
  disablePortal?: boolean;
  style?: React.CSSProperties;
  initContentHeight?: number;
}

export const Popup: React.FC<PopupProps> = ({
  offset = 6,
  placement = 'bottom',
  preventMobileStyle = false,
  ...props
}) => {
  const [ref, setRef] = useState<HTMLDivElement>(null);

  const getAncestors = (el) => {
    let ancestors = [];

    while (el) {
      ancestors.unshift(el);
      el = el.parentNode;
    }

    return ancestors;
  };

  useEffect(() => {
    if (!props.container) return;
    props.container.style.position = 'relative';
  }, [props.container]);

  const handleBodyClick = (e) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (
      !target.closest(`#${props.id}`) &&
      !target.closest('.modal_mobile-height_auto') &&
      target.id != props.id &&
      target != props.anchor &&
      !getAncestors(target).includes(props.anchor)
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.removeEventListener('click', handleBodyClick);
    if (props.open) document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [props.open]);

  if (!props.open) return;

  let left;
  let top;

  if (props.anchor && !props.disablePortal) {
    const bbox = props.anchor.getBoundingClientRect();
    const containerBbox = props.container?.getBoundingClientRect();
    const popupWidth = ref?.getBoundingClientRect().width ?? 0;
    const popupHeight = Math.max(props.initContentHeight ?? 0, ref?.getBoundingClientRect().height ?? 0);
    const sidebarWidth = document.getElementsByClassName('sidebar')[0]?.clientWidth ?? 0;
    const scrollX = props.container?.scrollLeft ?? window.scrollX;

    // Calculating "left" position
    if (ref == null) {
      left = bbox.left + bbox.width;
    } else if (placement.includes('left')) {
      left = bbox.left - popupWidth - offset;
    } else if (['bottom-start', 'top-start'].includes(placement)) {
      left = bbox.left;
    } else if (['bottom', 'top'].includes(placement)) {
      left = bbox.left + bbox.width / 2 - popupWidth / 2;
    } else if (['bottom-end', 'top-end'].includes(placement)) {
      left = bbox.left + bbox.width - popupWidth;
    } else {
      left = bbox.left + bbox.width + offset;
    }

    if (containerBbox) left -= containerBbox.left;
    left += scrollX;

    if (!containerBbox && left + popupWidth > window.innerWidth - 18 + scrollX) {
      left = window.innerWidth - popupWidth - 18;
    }
    if (!containerBbox && left < sidebarWidth) left = sidebarWidth + 18 + scrollX;

    // Calculating "top" position
    if (placement.includes('top')) {
      top = bbox.top - popupHeight - offset;
    } else if (['left-start', 'right-start'].includes(placement)) {
      top = bbox.top;
    } else if (['left', 'right'].includes(placement)) {
      top = bbox.top + bbox.height / 2 - popupHeight / 2;
    } else if (['left-end', 'right-end'].includes(placement)) {
      top = bbox.top + bbox.height - popupHeight;
    } else {
      top = bbox.top + bbox.height + offset;
    }

    if (containerBbox) top -= containerBbox.top;

    const scrollY = props.container?.scrollTop ?? window.scrollY;

    top += scrollY;
    if (top < 0) top = 10;
    if (top + popupHeight - scrollY > window.innerHeight) {
      top = bbox.top - popupHeight - offset + scrollY - (containerBbox?.top ?? 0);
    }
  }

  const renderPopup = () => (
    <div
      id={props.id}
      ref={(newRef) => setRef(newRef)}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={props.onMouseDown as MouseEventHandler<HTMLDivElement>}
      onMouseUp={props.onMouseUp as MouseEventHandler<HTMLDivElement>}
      className={`popup__wrapper ${preventMobileStyle ? 'popup_prevent-mobile' : ''} ${props.className ?? ''}`}
      style={{
        left: left,
        top: top,
        zIndex: 1000000 + (props.level ?? 0) * 100,
        opacity: props.anchor && ref ? '1' : '0',
        ...props.style,
      }}
    >
      <div className={'popup__header'}>
        <div className={'popup__title'}>{props.title}</div>
        <Button
          onClick={() => {
            props.onClose();
            props.onCloseBtn?.();
          }}
        >
          <Close />
        </Button>
      </div>
      <div className={'popup__body'}>{props.children}</div>
    </div>
  );

  if (props.disablePortal) {
    return renderPopup();
  } else {
    return createPortal(renderPopup(), props.container ?? document.body);
  }
};
