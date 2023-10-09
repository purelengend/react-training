import headerStyles from '@components/Header/header.module.css';
import searchIcon from '@assets/icons/search-icon.svg';
import { SelectOption } from '@components/common/Select/SelectOption';
import { Select } from '@components/common/Select';
import { InputField } from '@components/common/InputField';
import {
  ASCENDING_FILTER_ATTRIBUTE,
  DEFAULT_FILTER_ATTRIBUTE,
  DESCENDING_FILTER_ATTRIBUTE
} from '@constants/filter';
import { useContext, useEffect } from 'react';
import { UrlContext } from '@context/url';
import useFood from '@hooks/useFood';
import { ModalContext } from '@context/modal';

const Header = () => {
  const { path, sortFilter, setSortFilter } = useContext(UrlContext);
  const { setLoadingShowUp } = useContext(ModalContext);

  const { refetch, isFetching } = useFood();

  useEffect(() => {
    async function getFoods() {
      await refetch();
    }
    getFoods();
  }, [refetch, path]);

  useEffect(() => setLoadingShowUp(isFetching), [isFetching, setLoadingShowUp]);

  const onRefresh = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.location.reload();
  };
  return (
    <header className={headerStyles['header-container']}>
      <div className={`d-flex ${headerStyles['header-main-wrapper']}`}>
        <a href="#" onClick={onRefresh}>
          <h1 id="header" className={headerStyles['header-brand']}>
            Foods Management
          </h1>
        </a>
        <form className={`d-flex ${headerStyles['search-form']}`}>
          <InputField
            htmlFor="search"
            type="text"
            name="search"
            inputClass={headerStyles['search-input']}
            placeholder="Search for food, coffee, etc.."
            onChange={e => console.log(e.target.value)}
            label={
              <img
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
          onChange={e => {
            setSortFilter(e.target.value);
          }}
        >
          <SelectOption disable={true}>Sort by price</SelectOption>
          <SelectOption value={DEFAULT_FILTER_ATTRIBUTE}>Default</SelectOption>
          <SelectOption value={ASCENDING_FILTER_ATTRIBUTE}>
            Ascending
          </SelectOption>
          <SelectOption value={DESCENDING_FILTER_ATTRIBUTE}>
            Descending
          </SelectOption>
        </Select>
      </div>
    </header>
  );
};

export default Header;
