import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Trash } from './icons';
import { FolderOpen, Image } from './icons';
import { Button } from './button';
import { Flex } from './flex';
export const FileInput = (props) => {
    var _a;
    const className = `file_input__wrapper ${props.className}`;
    let files = [];
    for (let i = 0; i < ((_a = props.value) === null || _a === void 0 ? void 0 : _a.length) || 0; i++)
        files.push(props.value[i]);
    return (_jsxs("div", { className: className, children: [_jsxs("label", { className: 'file_input__label', style: props.value && { display: 'none' }, children: [_jsx(Button, { variant: 'outline', icon: _jsx(FolderOpen, {}), children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B" }), _jsx("input", { type: 'file', className: 'file_input__input', accept: props.accept, onChange: (e) => props.onChange(e.target.files) })] }), files.map((file) => (_jsxs("div", { className: 'file_input__uploaded', children: [_jsxs(Flex, { gap: 'small', align: 'center', children: [_jsx(Image, { color: '#1E5BBE' }), _jsx("div", { className: 'file_input__uploaded_name', children: file.name })] }), _jsx(Button, { onClick: () => props.onChange(null), icon: _jsx(Trash, { color: '#1E5BBE' }) })] })))] }));
};
//# sourceMappingURL=file_input.js.map