import searchIcon from '@assets/icons/search-icon.svg';
// import { Select, SelectOptionProps } from '@components/common/InputField';
import { Select, SelectOptionProps } from '@components/common/Select';
import headerStyles from '@components/Header/header.module.css';
import { FILTER_ATTRIBUTE } from '@constants/filter';
import { useDebounce } from '@hooks/useDebounce';
import useFood from '@hooks/useFood';
import { useBoundStore } from '@store/index';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const Header = () => {
  const {
    pathZustand,
    sortFilterZustand,
    setSortFilterZustand,
    searchNameZustand,
    setSearchNameZustand
  } = useBoundStore(
    useShallow(state => ({
      pathZustand: state.getPath(),
      sortFilterZustand: state.sort,
      setSortFilterZustand: state.setSortFilter,
      searchNameZustand: state.name,
      setSearchNameZustand: state.setSearchName
    }))
  );

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
  }, [refetch, pathZustand, searchNameZustand, debouncedText]);

  useEffect(
    () => setLoadingShowUpZustand(isRefetching),
    [isRefetching, setLoadingShowUpZustand]
  );

  useEffect(() => {
    setSearchNameZustand(debouncedText);
  }, [debouncedText, setSearchNameZustand]);

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
      setSortFilterZustand(e.target.value);
    },
    [setSortFilterZustand]
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
          {/* <InputField
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
          /> */}
          <label htmlFor="search">
            <img
              width="16"
              height="16"
              src={searchIcon}
              alt="Search Icon"
              className={headerStyles['primary-icon']}
            />
          </label>
          <input
            type="text"
            className={headerStyles['search-input']}
            id="search"
            placeholder="Search for food, coffee, etc.."
            step="any"
            value={searchText}
            onChange={onChangeSearchInput}
          />
        </div>
      </div>
      <div className={`d-flex ${headerStyles['header-sub-wrapper']}`}>
        <Select
          value={sortFilterZustand}
          onChange={onChangeSelectOption}
          selectOptions={selectOptions}
        />
      </div>
    </header>
  );
};

export default Header;
