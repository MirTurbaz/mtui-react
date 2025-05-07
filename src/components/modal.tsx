import * as React from 'react';
import { MouseEventHandler, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { ScreenSize } from '../hooks/use_resize';
import { Close } from './icons';
import { Button } from './button';

export interface ModalProps {
  className?: string;
  children?: ReactElement | ReactElement[];
  open: boolean;
  onClose: Function;
  title?: string | ReactElement;
  size?: ScreenSize;
  titleClassName?: string;
  bodyRef?: any;
  overlayClassName?: string;
  bodyProps?: any;
}

export const Modal: React.FC<ModalProps> = (props) => {
  if (!props.open) return;

  return createPortal(
    <div
      className={`modal__overlay ${props.overlayClassName}`}
      onMouseDown={props.onClose as MouseEventHandler<HTMLDivElement>}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        className={`modal__wrapper ${props.className} modal__wrapper-size_${props.size ?? 'sm'}`}
      >
        <div className={`modal__title ${props.titleClassName ?? ''}`}>
          <div>{props.title}</div>
          <Button onClick={props.onClose}>
            <Close />
          </Button>
        </div>
        <div className={'modal__body'} ref={props.bodyRef} {...props.bodyProps}>
          {props.children}
        </div>
      </div>
    </div>,
    document.body
  );
};
