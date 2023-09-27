import { memo } from 'react';
import plusIcon from '../../../../assets/icons/plus-icon.svg';
import addCardStyles from './add-card.module.css';

export interface AddCardProps {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}
export const AddCard = memo(({ handleClick }: AddCardProps) => {
  return (
    <div
      id="add-card"
      className={`d-flex-center ${addCardStyles['addition-card']}`}
      onClick={handleClick}
    >
      <div className={`d-flex-col ${addCardStyles['addition-wrapper']}`}>
        <img src={plusIcon} alt="Plus Icon" className="primary-icon" />
        <p className={addCardStyles['addition-content']}>Add new dish</p>
      </div>
    </div>
  );
});
