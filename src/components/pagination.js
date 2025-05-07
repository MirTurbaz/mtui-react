import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useResize } from '../hooks/use_resize';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from './icons';
export const Pagination = ({ totalCount, pageSize, currentPage, pagesCount, onChangePage, categoryGenitiveName, }) => {
    const { isMobile } = useResize();
    function pages() {
        const displayedPagesButtons = Math.min(isMobile ? 2 : 4, pagesCount - 2);
        if (displayedPagesButtons < 1)
            return [];
        let start = Math.max(currentPage - Math.floor(displayedPagesButtons / 2), 2);
        start = Math.min(start, pagesCount - displayedPagesButtons);
        return new Array(displayedPagesButtons).fill(start).map((item, index) => item + index);
    }
    const pagesButtons = pages();
    const pagesButtonsFirst = pagesButtons[0];
    const pagesButtonsLast = pagesButtons[pagesButtons.length - 1];
    const prevPage = (_jsx(Button, { onClick: () => onChangePage(currentPage - 1), disabled: currentPage <= 1, children: _jsx(ChevronLeft, { size: 24 }) }));
    const firstPage = (_jsx(Button, { onClick: () => onChangePage(1), variant: 'outline', toggled: currentPage == 1, children: _jsx("span", { className: 'typography-regular', children: "1" }) }));
    const startDots = pagesButtonsFirst > 2 ? _jsx("div", { className: 'pagination__dots', children: "..." }) : undefined;
    const endDots = pagesButtonsLast < pagesCount - 1 ? _jsx("div", { className: 'pagination__dots', children: "..." }) : undefined;
    const lastPage = pagesCount > 1 ? (_jsx(Button, { onClick: () => onChangePage(pagesCount), variant: 'outline', toggled: currentPage == pagesCount, children: _jsx("span", { className: 'typography-regular', children: pagesCount }) })) : undefined;
    const nextPage = (_jsx(Button, { onClick: () => onChangePage(currentPage + 1), disabled: currentPage >= pagesCount, children: _jsx(ChevronRight, { size: 24 }) }));
    const startIndex = 1 + pageSize * (currentPage - 1);
    const endIndex = Math.min(totalCount, pageSize * currentPage);
    return (_jsxs("ul", { className: 'pagination', children: [_jsxs("div", { className: 'pagination__numbers', children: [prevPage, firstPage, startDots, pagesButtons.map((page) => {
                        return (_jsx(Button, { onClick: () => onChangePage(page), variant: 'outline', toggled: currentPage === page, children: _jsx("span", { className: 'typography-regular', children: page }) }, page));
                    }), endDots, lastPage, nextPage] }), _jsxs("div", { className: 'pagination__total-size', children: ["\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B ", startIndex, " \u2014 ", endIndex, " \u0438\u0437 ", totalCount, " ", categoryGenitiveName] })] }));
};
//# sourceMappingURL=pagination.js.map