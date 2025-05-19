import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Add, Minus } from './icons';
import { Button } from './button';
import { InputGroup } from './input_group';
import { TextField } from './text_field';
export const CountInput = (props) => {
    var _a;
    const onChange = (value) => {
        var _a;
        if ((value <= props.max || props.max == null) && (value >= props.min || props.min == null) && !isNaN(value)) {
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, value);
        }
    };
    return (_jsxs(InputGroup, { className: `count_input__wrapper ${props.className}`, children: [_jsx(Button, { variant: 'outline', disabled: props.min != null && props.value <= props.min, onClick: () => onChange(props.value - 1), icon: _jsx(Minus, {}) }), _jsx(TextField, { size: 'mini', wrapperStyle: { maxWidth: 44, width: 44 }, value: (_a = props.value) === null || _a === void 0 ? void 0 : _a.toString(), onChange: (v) => onChange(parseInt(v)) }), _jsx(Button, { variant: 'outline', disabled: props.max != null && props.value >= props.max, onClick: () => onChange(props.value + 1), icon: _jsx(Add, {}) })] }));
};
//# sourceMappingURL=count_input.js.map