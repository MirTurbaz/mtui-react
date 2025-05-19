import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './button';
import { useResize } from '../hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export const SearchInput = (props) => {
    var _a;
    const [focus, setFocus] = useState(false);
    const { isExtraLargeScreen } = useResize();
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
    let classNames = `search-input__wrapper ${props.className}`;
    if (focus)
        classNames += ' search-input-focus';
    const handleClick = () => {
        if (inputValue.trim()) {
            props.handleSearch(inputValue.trim());
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            props.handleSearch(inputValue.trim());
        }
    };
    useEffect(() => {
        setInputValue(searchParams.get('q') || '');
        if (searchParams.get('q') == null)
            setFocus(false);
    }, [searchParams]);
    return (_jsxs("div", { className: `search-container ${(_a = props.className) !== null && _a !== void 0 ? _a : ''}`, children: [_jsxs("div", { className: classNames, children: [props.icon && _jsx("div", { className: 'search-input__icon', children: props.icon }), _jsxs("div", { className: 'search-input__input_wrapper', children: [_jsx("input", { value: inputValue, type: 'text', onFocus: () => setFocus(true), onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyPress, className: 'search-input__input' }), _jsx("div", { className: 'search-input__placeholder', children: !inputValue && props.searchText })] })] }), !isExtraLargeScreen && (_jsx(Button, { className: 'outline-grey search-button', onClick: handleClick, children: props.buttonText }))] }));
};
//# sourceMappingURL=search_input.js.map