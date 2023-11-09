import searchIcon from '@assets/icons/search-icon.svg';
import { InputField } from '@components/common/InputField';
import { Select, SelectOptionProps } from '@components/common/Select';
import headerStyles from '@components/Header/header.module.css';
import { FILTER_ATTRIBUTE } from '@constants/filter';
import { UrlContext } from '@context/url';
import { useDebounce } from '@hooks/useDebounce';
import useFood from '@hooks/useFood';
import { useBoundStore } from '@store/index';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const Header = () => {
  const { path, sortFilter, setSortFilter, searchName, setSearchName } =
    useContext(UrlContext);

  const { setLoadingShowUpZustand } = useBoundStore(
    useShallow(state => ({
      setLoadingShowUpZustand: state.setLoadingShowUp
    }))
  );

  const { refetch, isRefetching } = useFood();

  const [searchText, setSearchText] = useState('');

  const debouncedText = useDebounce(searchText.replace(/\s+/g, ' ').trim()); // remove extra spaces of the search text

  // This effect is to refetch the list food based on path and search name
  useEffect(() => {
    refetch();
    setSearchText(debouncedText);
  }, [refetch, path, searchName, debouncedText]);

  useEffect(
    () => setLoadingShowUpZustand(isRefetching),
    [isRefetching, setLoadingShowUpZustand]
  );

  useEffect(() => setSearchName(debouncedText), [debouncedText, setSearchName]);

  const onRefresh = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>): void => {
      e.preventDefault();

      window.location.reload();
    },
    []
  );

  const selectOptions: Array<SelectOptionProps> = useMemo(
    () => [
      {
        value: undefined,
        disabled: true,
        label: 'Sort by price'
      },
      {
        value: FILTER_ATTRIBUTE.DEFAULT,
        disabled: false,
        label: 'Default'
      },
      {
        value: FILTER_ATTRIBUTE.ASCENDING,
        disabled: false,
        label: 'Ascending'
      },
      {
        value: FILTER_ATTRIBUTE.DESCENDING,
        disabled: false,
        label: 'Descending'
      }
    ],
    []
  );

  const onChangeSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value),
    []
  );

  const onChangeSelectOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortFilter(e.target.value);
    },
    [setSortFilter]
  );

  return (
    <header className={headerStyles['header-container']}>
      <div className={`d-flex ${headerStyles['header-main-wrapper']}`}>
        <div>
          <a href="#" onClick={onRefresh}>
            <h1 id="header" className={headerStyles['header-brand']}>
              Foods Management
            </h1>
          </a>
        </div>
        <div className={`d-flex ${headerStyles['search-form']}`}>
          <InputField
            htmlFor="search"
            type="text"
            name="search"
            inputClass={headerStyles['search-input']}
            placeholder="Search for food, coffee, etc.."
            value={searchText}
            onChange={onChangeSearchInput}
            label={
              <img
                width="16"
                height="16"
                src={searchIcon}
                alt="Search Icon"
                className={headerStyles['primary-icon']}
              />
            }
          />
        </div>
      </div>
      <div className={`d-flex ${headerStyles['header-sub-wrapper']}`}>
        <Select
          value={sortFilter}
          onChange={onChangeSelectOption}
          selectOptions={selectOptions}
        />
      </div>
    </header>
  );
};

export default Header;
