import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from './text_field';
export const TimeField = (props) => {
    return _jsx(TextField, Object.assign({ mask: ['9:99', '99:99'], uncontrolled: true }, props));
};
//# sourceMappingURL=time_field.js.map