import * as React from 'react';
import { useResize } from '../hooks';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from './icons';

export interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  pagesCount: number;
  onChangePage: (newPageNum: number) => void;
  categoryGenitiveName: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  pageSize,
  currentPage,
  pagesCount,
  onChangePage,
  categoryGenitiveName,
}) => {
  const { isMobile } = useResize();

  function pages() {
    const displayedPagesButtons = Math.min(isMobile ? 2 : 4, pagesCount - 2);

    if (displayedPagesButtons < 1) return [];

    let start = Math.max(currentPage - Math.floor(displayedPagesButtons / 2), 2);
    start = Math.min(start, pagesCount - displayedPagesButtons);

    return new Array(displayedPagesButtons).fill(start).map((item, index) => item + index);
  }
  const pagesButtons = pages();
  const pagesButtonsFirst = pagesButtons[0];
  const pagesButtonsLast = pagesButtons[pagesButtons.length - 1];

  const prevPage = (
    <Button
      onClick={() => onChangePage(currentPage - 1)}
      disabled={currentPage <= 1}
      icon={<ChevronLeft size={24} />}
    />
  );

  const firstPage = (
    <Button onClick={() => onChangePage(1)} variant={'outline'} toggled={currentPage == 1}>
      1
    </Button>
  );

  const startDots = pagesButtonsFirst > 2 ? <div className='pagination__dots'>...</div> : undefined;

  const endDots = pagesButtonsLast < pagesCount - 1 ? <div className='pagination__dots'>...</div> : undefined;

  const lastPage =
    pagesCount > 1 ? (
      <Button onClick={() => onChangePage(pagesCount)} variant={'outline'} toggled={currentPage == pagesCount}>
        {pagesCount}
      </Button>
    ) : undefined;

  const nextPage = (
    <Button
      onClick={() => onChangePage(currentPage + 1)}
      disabled={currentPage >= pagesCount}
      icon={<ChevronRight size={24} />}
    />
  );

  const startIndex = 1 + pageSize * (currentPage - 1);
  const endIndex = Math.min(totalCount, pageSize * currentPage);

  return (
    <ul className='pagination'>
      <div className='pagination__numbers'>
        {prevPage}
        {firstPage}
        {startDots}
        {pagesButtons.map((page) => {
          return (
            <Button onClick={() => onChangePage(page)} variant={'outline'} toggled={currentPage === page} key={page}>
              {page}
            </Button>
          );
        })}
        {endDots}
        {lastPage}
        {nextPage}
      </div>
      <div className='pagination__total-size'>
        Показаны {startIndex} — {endIndex} из {totalCount} {categoryGenitiveName}
      </div>
    </ul>
  );
};
