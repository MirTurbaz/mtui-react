import * as React from 'react';
import { ReactElement, useEffect, useRef, useState } from 'react';

interface ExpandTextProps {
  maxHeight: number;
  children?: ReactElement | ReactElement[] | string | number;
}

export const ExpandText: React.FC<ExpandTextProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setIsOverflowed(contentHeight > props.maxHeight);
    }
  }, [props.children, props.maxHeight]);

  return (
    <div className={'expand-text expand-text__wrapper'}>
      <div
        className={`expand-text__content ${isExpanded || !isOverflowed ? 'expanded' : 'collapsed'}`}
        style={{ maxHeight: isExpanded ? 'none' : `${props.maxHeight}px` }}
        ref={contentRef}
      >
        {props.children}
      </div>

      {!isExpanded && isOverflowed && (
        <div className={'typography-regular expand-btn'} onClick={() => setIsExpanded(true)}>
          Показать полностью
        </div>
      )}
    </div>
  );
};
