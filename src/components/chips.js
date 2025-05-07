import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Close } from './icons';
export const Chips = (props) => {
    if (props.chips.length == 0)
        return null;
    return (_jsx("div", { style: props.style, className: `chips__wrapper ${props.className}`, children: props.chips.map((chip) => (_jsxs("div", { className: 'chip__wrapper', onClick: () => props.onDelete(chip.value, chip.label), children: [chip.label, _jsx(Close, { size: 16, color: '#417ee1cc' })] }))) }));
};
//# sourceMappingURL=chips.js.map