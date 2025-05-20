import { jsx as _jsx } from "react/jsx-runtime";
export const InputGroup = (props) => {
    const className = `${props.className} ${props.wrap ? 'input_group-wrapped' : 'input_group'}`;
    const render = () => {
        if (props.children instanceof Array) {
            return props.children.map((el) => (el ? _jsx("div", { className: 'input_group__item', children: el }) : null));
        }
        else {
            return _jsx("div", { className: 'input_group__item', children: props.children });
        }
    };
    return _jsx("div", { className: className, children: render() });
};
//# sourceMappingURL=input_group.js.map