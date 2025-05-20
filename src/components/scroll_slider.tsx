import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';

export interface ScrollSliderProps {
  className?: string;
  children?: ReactElement;
}

export const ScrollSlider: React.FC<ScrollSliderProps> = (props) => {
  const [ref, setRef] = useState<HTMLDivElement>(null);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);

  const handlePrev = () => {
    ref.scrollTo({
      top: 0,
      left: Math.max(ref.scrollLeft - 500, 0),
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    ref.scrollTo({
      top: 0,
      left: ref.scrollLeft + 500,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    setIsLeft(!ref.scrollLeft);
    setIsRight(ref.scrollWidth === ref.scrollLeft + ref.getBoundingClientRect().width);
  };

  useEffect(() => {
    if (ref) handleScroll();
  }, [ref]);

  return (
    <div className={`scroll_slider__wrapper ${props.className ?? ''}`}>
      <div className={`scroll_slider`} ref={setRef} onScroll={handleScroll}>
        {props.children}
      </div>
      <div className={'scroll_slider__arrows'}>
        <div className={`scroll_slider__arrow ${isLeft ? 'scroll_slider__arrow_hidden' : ''}`} onClick={handlePrev}>
          <ChevronLeft size={24} />
        </div>
        <div className={`scroll_slider__arrow ${isRight ? 'scroll_slider__arrow_hidden' : ''}`} onClick={handleNext}>
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};
