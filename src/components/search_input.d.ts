import * as React from 'react';
import { ReactElement } from 'react';
export interface SearchProps {
    className?: string;
    icon?: ReactElement | string;
    searchText: string;
    buttonText: string;
    handleSearch: (searchText: string) => void;
}
export declare const SearchInput: React.FC<SearchProps>;
