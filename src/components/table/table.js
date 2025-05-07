import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
export function Table(props) {
    const rowLinkExists = useMemo(() => ['string', 'function'].includes(typeof props.rowLink), [props.rowLink]);
    const navigate = useNavigate();
    function handleClick(row) {
        if (typeof props.rowLink === 'string') {
            navigate(props.rowLink);
        }
        else if (typeof props.rowLink === 'function') {
            navigate(props.rowLink(row));
        }
    }
    return (_jsxs("table", { className: 'table' + props.className ? ` ${props.className}` : '', children: [_jsx("thead", { children: _jsx("tr", { children: props.columns.map((column, index) => {
                        var _a;
                        return (_jsx("th", { className: column.className, style: { width: column.width }, children: column.title }, (_a = column.dataIndex) !== null && _a !== void 0 ? _a : index));
                    }) }) }), _jsx("tbody", { className: 'typography-regular', children: props.dataSource.length ? (props.dataSource.map((row, rowIndex) => (_jsx("tr", { onClick: rowLinkExists ? () => handleClick(row) : null, className: rowLinkExists ? 'table__row_link' : null, children: props.columns.map((column, cellIndex) => {
                        var _a;
                        let value = ((_a = row[column.dataIndex]) !== null && _a !== void 0 ? _a : '');
                        if (column.render)
                            value = column.render(value, row);
                        return (_jsx("td", { className: column.className, children: value }, `row-${rowIndex}-cell-${cellIndex}`));
                    }) }, `row-${rowIndex}`)))) : (_jsx("tr", { children: _jsx("td", { colSpan: props.columns.length, style: { textAlign: 'center' }, children: "\u0414\u0430\u043D\u043D\u044B\u0445 \u043D\u0435\u0442" }) })) })] }));
}
//# sourceMappingURL=table.js.map