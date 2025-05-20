import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'tiny-slider/dist/tiny-slider.css';
const { tns } = require('tiny-slider/src/tiny-slider');

interface PhotoSliderPopupProps {
  pictures: Picture[];
  open: boolean;
  onClose: () => void;
  anchor?: HTMLElement;
  id: string;
}

export interface Picture {
  src: string;
  description: string;
}

export const PhotoSliderPopup: React.FC<PhotoSliderPopupProps> = (props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slider, setSlider] = useState(null);

  useEffect(() => {
    if (props.open) {
      document.documentElement.style.overflow = 'hidden';
    }
  }, [props.open]);

  useEffect(() => {
    if (props.open && sliderRef.current && !slider) {
      const newSlider = tns({
        container: sliderRef.current,
        items: 1,
        slideBy: 'page',
        controls: true,
        nav: true,
        navPosition: 'bottom',
        swipeAngle: false,
        speed: 400,
        mouseDrag: true,
        touch: true,
        autoplay: false,
        autoplayButtonOutput: false,
        lazyload: true,
        controlsContainer: '.photo_slider_popup__controls',
      });
      setSlider(newSlider);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          newSlider.goTo('prev');
        } else if (e.key === 'ArrowRight') {
          newSlider.goTo('next');
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    return () => {
      if (slider) {
        slider.destroy();
        setSlider(null);
      }
    };
  }, [props.open]);

  if (!props.open) return;

  return createPortal(
    <div id={props.id} className={`photo_slider_popup`}>
      <span
        className='photo_slider_popup__close'
        onClick={() => {
          document.documentElement.style.overflow = 'auto';
          props.onClose();
        }}
      >
        <div className='icon icon-close-gray icon-close-gray-dims'></div>
      </span>
      <div className={'photo_slider_popup__body'}>
        <div ref={sliderRef}>
          {props.pictures.map((image, index) => (
            <div key={index} className='photo_slider_popup__item'>
              <img src={image.src} alt={image.description} />
            </div>
          ))}
        </div>

        <div className='photo_slider_popup__controls'>
          <div className='photo_slider_popup__controls__arrow photo_slider_popup__controls__arrow-prev'>
            <div className='icon icon-arrow-white-light'></div>
          </div>
          <div className='photo_slider_popup__controls__arrow photo_slider_popup__controls__arrow-next'>
            <div className='icon icon-arrow-white-light'></div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
