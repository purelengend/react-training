import { memo } from 'react';
import plusIcon from '@assets/icons/plus-icon.svg';
import addCardStyles from '@components/common/Cards/AddCard/add-card.module.css';

export interface AddCardProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const AddCard = memo(({ onClick }: AddCardProps) => {
  return (
    <div
      id="add-card"
      className={`d-flex-center ${addCardStyles['addition-card']}`}
      onClick={onClick}
    >
      <div className={`d-flex-col ${addCardStyles['addition-wrapper']}`}>
        <img src={plusIcon} alt="Plus Icon" className="primary-icon" />
        <p className={addCardStyles['addition-content']}>Add new dish</p>
      </div>
    </div>
  );
});

AddCard.whyDidYouRender = true;
