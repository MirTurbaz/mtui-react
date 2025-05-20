import * as React from 'react';
export interface PaginationProps {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    pagesCount: number;
    onChangePage: (newPageNum: number) => void;
    categoryGenitiveName: string;
}
export declare const Pagination: React.FC<PaginationProps>;
