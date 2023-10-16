import headerStyles from '@components/Header/header.module.css';
import searchIcon from '@assets/icons/search-icon.svg';
import { Select, SelectOptionProps } from '@components/common/Select';
import { InputField } from '@components/common/InputField';
import {
  ASCENDING_FILTER_ATTRIBUTE,
  DEFAULT_FILTER_ATTRIBUTE,
  DESCENDING_FILTER_ATTRIBUTE
} from '@constants/filter';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UrlContext } from '@context/url';
import useFood from '@hooks/useFood';
import { ModalContext } from '@context/modal';
import { useDebounce } from '@hooks/useDebounce';

const Header = () => {
  const { path, sortFilter, setSortFilter, searchName, setSearchName } =
    useContext(UrlContext);
  const { setLoadingShowUp } = useContext(ModalContext);

  const { refetch, isRefetching } = useFood();

  const [searchText, setSearchText] = useState('');
  const debouncedText = useDebounce(searchText);

  useEffect(() => {
    async function getFoods() {
      await refetch();
    }
    getFoods();
  }, [refetch, path, searchName]);

  useEffect(
    () => setLoadingShowUp(isRefetching),
    [isRefetching, setLoadingShowUp]
  );

  useEffect(() => setSearchName(debouncedText), [debouncedText, setSearchName]);

  const onRefresh = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.location.reload();
  };

  const selectOptions: SelectOptionProps[] = useMemo(
    () => [
      {
        value: undefined,
        disabled: true,
        label: 'Sort by price'
      },
      {
        value: DEFAULT_FILTER_ATTRIBUTE,
        disabled: false,
        label: 'Default'
      },
      {
        value: ASCENDING_FILTER_ATTRIBUTE,
        disabled: false,
        label: 'Ascending'
      },
      {
        value: DESCENDING_FILTER_ATTRIBUTE,
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
        <a href="#" onClick={onRefresh}>
          <h1 id="header" className={headerStyles['header-brand']}>
            Foods Management
          </h1>
        </a>
        <form
          onSubmit={e => e.preventDefault()}
          className={`d-flex ${headerStyles['search-form']}`}
        >
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
        </form>
      </div>
      <div className={`d-flex-center ${headerStyles['header-sub-wrapper']}`}>
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
