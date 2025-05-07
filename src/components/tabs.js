import { jsx as _jsx } from "react/jsx-runtime";
export const Tabs = (props) => {
    return (_jsx("div", { className: 'tabs__wrapper', children: props.items.map((item) => (_jsx("div", { className: `tabs__item ${item.key == props.value && 'tabs__item-current'}`, onClick: () => props.onChange(item.key), children: item.label }, item.key))) }));
};
//# sourceMappingURL=tabs.js.map