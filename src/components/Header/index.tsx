import headerStyles from './header.module.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import { SelectOption } from '../common/SelectOption';

const Header = () => {
  return (
    <header className={headerStyles['header-container']}>
      <div className={`d-flex ${headerStyles['header-main-wrapper']}`}>
        <a href="#">
          <h1 id="header" className={headerStyles['header-brand']}>
            Foods Management
          </h1>
        </a>
        <form className={`d-flex ${headerStyles['search-form']}`}>
          <img
            src={searchIcon}
            alt="Search Icon"
            className={headerStyles['primary-icon']}
          />
          <input
            id="search"
            type="text"
            className={headerStyles['search-input']}
            placeholder="Search for food, coffee, etc.."
          />
        </form>
      </div>
      <div className={`d-flex-center ${headerStyles['header-sub-wrapper']}`}>
        <select id="sort" className={headerStyles['sort-select']}>
          <SelectOption disable={true}>Sort by price</SelectOption>
          <SelectOption value="orderby=createdAt&order=desc">
            Default
          </SelectOption>
          <SelectOption value="orderby=price">Ascending</SelectOption>
          <SelectOption value="orderby=price&order=desc">
            Descending
          </SelectOption>
        </select>
      </div>
    </header>
  );
};

export default Header;
