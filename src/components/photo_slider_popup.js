import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'tiny-slider/dist/tiny-slider.css';
const { tns } = require('tiny-slider/src/tiny-slider');
export const PhotoSliderPopup = (props) => {
    const sliderRef = useRef(null);
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
            const handleKeyDown = (e) => {
                if (e.key === 'ArrowLeft') {
                    newSlider.goTo('prev');
                }
                else if (e.key === 'ArrowRight') {
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
    if (!props.open)
        return;
    return createPortal(_jsxs("div", { id: props.id, className: `photo_slider_popup`, children: [_jsx("span", { className: 'photo_slider_popup__close', onClick: () => {
                    document.documentElement.style.overflow = 'auto';
                    props.onClose();
                }, children: _jsx("div", { className: 'icon icon-close-gray icon-close-gray-dims' }) }), _jsxs("div", { className: 'photo_slider_popup__body', children: [_jsx("div", { ref: sliderRef, children: props.pictures.map((image, index) => (_jsx("div", { className: 'photo_slider_popup__item', children: _jsx("img", { src: image.src, alt: image.description }) }, index))) }), _jsxs("div", { className: 'photo_slider_popup__controls', children: [_jsx("div", { className: 'photo_slider_popup__controls__arrow photo_slider_popup__controls__arrow-prev', children: _jsx("div", { className: 'icon icon-arrow-white-light' }) }), _jsx("div", { className: 'photo_slider_popup__controls__arrow photo_slider_popup__controls__arrow-next', children: _jsx("div", { className: 'icon icon-arrow-white-light' }) })] })] })] }), document.body);
};
//# sourceMappingURL=photo_slider_popup.js.map