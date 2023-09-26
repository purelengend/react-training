import productCardStyles from './product-card.module.css';
import deleteIcon from '../../../../assets/icons/cross-icon.svg';
import editIcon from '../../../../assets/icons/edit-icon.svg';
// interface ProductCardProps {
//   children: ReactNode;
// }
export const ProductCard = () => {
  return (
    <div
      className={`d-flex-center d-flex-col ${productCardStyles['product-card']}`}
    >
      <button
        className={`d-flex-center ${productCardStyles['secondary-icon']} ${productCardStyles['delete-btn']}`}
      >
        <img src={deleteIcon} alt="Cross Icon" data-id="${food.id}" />
      </button>

      <div className={`d-flex-col ${productCardStyles['product-wrapper']}`}>
        <img
          src="https://images.unsplash.com/photo-1614777986387-015c2a89b696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3774&q=80"
          alt="${food.name}"
          className={productCardStyles['primary-product']}
        />
        <div
          className={`d-flex-col ${productCardStyles['product-content-wrapper']}`}
        >
          <p className={productCardStyles['product-name']}>Food name</p>
          <div
            className={`d-flex-center ${productCardStyles['product-detail']}`}
          >
            $ 123
            <div className={productCardStyles.separate}></div>123 Bowls
          </div>
        </div>
      </div>

      <button
        className={`d-flex-center ${productCardStyles['product-mutation']} ${productCardStyles.mutation}`}
        data-id="${food.id}"
      >
        <img
          src={editIcon}
          alt="Edit Icon"
          className={`primary-icon ${productCardStyles.mutation}`}
          data-id="${food.id}"
        />
        <p
          className={`${productCardStyles['mutation-content']} ${productCardStyles.mutation}`}
          data-id="${food.id}"
        >
          Edit dish
        </p>
      </button>
    </div>
  );
};
