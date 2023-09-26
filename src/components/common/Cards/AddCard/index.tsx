import { ReactNode } from 'react';
import plusIcon from '../../../../assets/icons/plus-icon.svg';
import addCardStyles from './add-card.module.css';
interface AddCardProps {
  children: ReactNode;
}
export const AddCard = ({children}: AddCardProps) => {
  return (
    <div
      id="add-card"
      className={`d-flex-center ${addCardStyles['addition-card']}`}
    >
      <div className={`d-flex-col ${addCardStyles['addition-wrapper']}`}>
        <img src={plusIcon} alt="Plus Icon" className="primary-icon" />
        <p className={addCardStyles['addition-content']}>{children}</p>
      </div>
    </div>
  );
};
