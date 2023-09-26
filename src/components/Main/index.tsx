import { ReactNode } from 'react';
import mainStyles from './main.module.css';
import plusIcon from '../../assets/icons/plus-icon.svg'
interface Props {
  children?: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <main className={`d-flex-col ${mainStyles['main-container']}`}>
      <div
        id="food-list"
        className={`d-flex ${mainStyles['main-content-wrapper']}`}
      >
        <div id="spin" className={mainStyles.loader}></div>
        <div
          id="add-card"
          className={`d-flex-center ${mainStyles['addition-card']}`}
        >
          <div className={`d-flex-col ${mainStyles['addition-wrapper']}`}>
            <img
              src={plusIcon}
              alt="Plus Icon"
              className={mainStyles['primary-icon']}
            />
            <p className={mainStyles['addition-content']}>Add new dish</p>
          </div>
        </div>
      </div>
      <button
        id="expand"
        type="button"
        className={`d-flex-center ${mainStyles['expand-btn']}`}
      >
        SHOW MORE
      </button>
    </main>
  );
};

export default Main;
