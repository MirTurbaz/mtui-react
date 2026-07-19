import { Button } from './button';
import { useResize } from '../hooks';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface SearchProps {
  className?: string;
  icon?: ReactElement | string;
  searchText: string;
  buttonText: string;
  handleSearch: (searchText: string) => void;
}

export const SearchInput: React.FC<SearchProps> = (props) => {
  const [focus, setFocus] = useState(false);
  const { isExtraLargeScreen } = useResize();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

  let classNames = `search-input__wrapper ${props.className}`;
  if (focus) classNames += ' search-input-focus';

  const handleClick = () => {
    if (inputValue.trim()) {
      props.handleSearch(inputValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.handleSearch(inputValue.trim());
    }
  };

  useEffect(() => {
    setInputValue(searchParams.get('q') || '');
    if (searchParams.get('q') == null) setFocus(false);
  }, [searchParams]);

  return (
    <div className={`search-container ${props.className ?? ''}`}>
      <div className={classNames}>
        {props.icon && <div className={'search-input__icon'}>{props.icon}</div>}
        <div className={'search-input__input_wrapper'}>
          <input
            value={inputValue}
            type='text'
            onFocus={() => setFocus(true)}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className={'search-input__input'}
          />
          <div className={'search-input__placeholder'}>{!inputValue && props.searchText}</div>
        </div>
      </div>
      {!isExtraLargeScreen && (
        <Button className={'outline-grey search-button'} onClick={handleClick}>
          {props.buttonText}
        </Button>
      )}
    </div>
  );
};
