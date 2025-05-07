import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useResize } from '../../hooks/use_resize';
import { Flex } from './flex';
export const EmptyData = ({ title, description, icon, actions }) => {
    const { isMobile } = useResize();
    return (_jsxs(Flex, { vertical: true, align: 'center', className: 'empty-data', children: [_jsxs(Flex, { justify: 'center', className: `empty-data__bg ${isMobile ? 'empty-data__bg_mobile' : ''}`, children: [_jsx("div", { className: 'empty-data__blur-container' }), _jsx("div", { className: 'empty-data__blur-ellipse' })] }), _jsx("div", { className: 'empty-data__icon', children: icon }), _jsxs(Flex, { vertical: true, gap: 'small', justify: 'center', align: 'center', className: 'empty-data__text', children: [_jsx("div", { className: 'typography-medium-3', children: title }), description && _jsx("div", { className: 'typography-regular', children: description })] }), actions && _jsx("div", { className: 'empty-data__actions', children: actions })] }));
};
//# sourceMappingURL=empty_data.js.map