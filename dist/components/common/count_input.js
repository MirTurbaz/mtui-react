import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Add from '../icons/add';
import { Minus } from '../icons/remove';
import { Button } from './button';
import { InputGroup } from './input_group';
import { TextField } from './text_field';
export const CountInput = (props) => {
    var _a;
    const onChange = (value) => {
        if ((value <= props.max || props.max == null) && (value >= props.min || props.min == null) && !isNaN(value)) {
            props.onChange(value);
        }
    };
    return (_jsxs(InputGroup, { className: `count_input__wrapper ${props.className}`, children: [_jsx(Button, { variant: 'outline', disabled: props.min != null && props.value <= props.min, size: 'square', onClick: () => onChange(props.value - 1), children: _jsx(Minus, {}) }), _jsx(TextField, { size: 'mini', wrapperStyle: { maxWidth: 44, width: 44 }, value: (_a = props.value) === null || _a === void 0 ? void 0 : _a.toString(), onChange: (v) => onChange(parseInt(v)) }), _jsx(Button, { variant: 'outline', size: 'square', disabled: props.max != null && props.value >= props.max, onClick: () => onChange(props.value + 1), children: _jsx(Add, {}) })] }));
};
//# sourceMappingURL=count_input.js.map