import * as React from 'react';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { HEADER_HEIGHT } from './common';
import { Expand } from './icons';

export interface AccordionProps {
  className?: string;
  children?: ReactElement | React.ReactNode;
  header: string | ReactElement;
  opened?: boolean;
  onToggle?: () => void;
  showExpand?: boolean;
  scrollOnOpen?: boolean;
  dataId?: string | number;
}

export const Accordion: React.FC<AccordionProps> = ({ showExpand = true, scrollOnOpen = false, ...props }) => {
  const [open, setOpen] = useState(props.opened ?? false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(props.opened ?? false);
  }, [props.opened]);

  useEffect(() => {
    if (open && scrollOnOpen && contentRef.current) {
      setTimeout(() => {
        if (contentRef.current) {
          const elementPosition = contentRef.current.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [open, scrollOnOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.text_field') || target.closest('.button')) return;
    props.onToggle?.();
    setOpen(!open);
  };

  return (
    <div
      ref={contentRef}
      className={`accordion__wrapper ${props.className} ${open && 'opened'}`}
      data-id={props.dataId}
    >
      <div className={'accordion__header'} onClick={handleToggle}>
        {props.header}
        {showExpand && <Expand rotated={open} />}
      </div>
      {open && <div className={'accordion__content'}>{props.children}</div>}
    </div>
  );
};
