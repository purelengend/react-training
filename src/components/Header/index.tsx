import headerStyles from '@components/Header/header.module.css';
import searchIcon from '@assets/icons/search-icon.svg';
import { SelectOption } from '@components/common/Select/SelectOption';
import { Select } from '@components/common/Select';
import { InputField } from '@components/common/InputField';

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
        <Select value="1" onChange={e => console.log(e.target.value)}>
          <SelectOption disable={true}>Sort by price</SelectOption>
          <SelectOption value="orderby=createdAt&order=desc">
            Default
          </SelectOption>
          <SelectOption value="orderby=price">Ascending</SelectOption>
          <SelectOption value="orderby=price&order=desc">
            Descending
          </SelectOption>
        </Select>
      </div>
    </header>
  );
};

export default Header;
