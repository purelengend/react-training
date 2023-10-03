import productCardStyles from './product-card.module.css';
import deleteIcon from '../../../../assets/icons/cross-icon.svg';
import editIcon from '../../../../assets/icons/edit-icon.svg';
import { Button } from '../../Button';
// import { memo } from 'react';

export interface Food {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  createdAt: Date;
}
interface ProductCardProps {
  product: Food;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      className={`d-flex-center d-flex-col ${productCardStyles['product-card']}`}
    >
      <Button
        className={`d-flex-center ${productCardStyles['secondary-icon']} ${productCardStyles['delete-btn']}`}
      >
        <img src={deleteIcon} alt="Cross Icon" data-id={product.id} />
      </Button>

      <div className={`d-flex-col ${productCardStyles['product-wrapper']}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={productCardStyles['primary-product']}
        />
        <div
          className={`d-flex-col ${productCardStyles['product-content-wrapper']}`}
        >
          <p className={productCardStyles['product-name']}>{product.name}</p>
          <div
            className={`d-flex-center ${productCardStyles['product-detail']}`}
          >
            $ {product.price}
            <div className={productCardStyles.separate}></div>
            {product.quantity} Bowls
          </div>
        </div>
      </div>

      <Button
        className={`d-flex-center ${productCardStyles['product-mutation']} ${productCardStyles.mutation}`}
      >
        <img
          src={editIcon}
          alt="Edit Icon"
          className={`primary-icon ${productCardStyles.mutation}`}
        />
        <p
          className={`${productCardStyles['mutation-content']} ${productCardStyles.mutation}`}
        >
          Edit dish
        </p>
      </Button>
    </div>
  );
};
