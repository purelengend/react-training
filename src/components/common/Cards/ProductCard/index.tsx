import deleteIcon from '@assets/icons/cross-icon.svg';
import editIcon from '@assets/icons/edit-icon.svg';
import { Button } from '@components/common/Button';
import productCardStyles from '@components/common/Cards/ProductCard/product-card.module.css';
import { memo, useCallback } from 'react';

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
  onDeleteClick: (foodId: string) => void;
  onEditClick: (food: Food) => void;
}

export const ProductCard = memo(
  ({ product, onDeleteClick, onEditClick }: ProductCardProps) => {
    const onDeleteFood = useCallback(
      () => onDeleteClick(product.id),
      [onDeleteClick, product.id]
    );

    const onEditFood = useCallback(
      () => onEditClick(product),
      [onEditClick, product]
    );

    return (
      <div
        className={`d-flex-center d-flex-col ${productCardStyles['product-card']}`}
      >
        <Button
          onClick={onDeleteFood}
          className={`d-flex-center ${productCardStyles['secondary-icon']} ${productCardStyles['delete-btn']}`}
        >
          <img
            width="20"
            height="20"
            src={deleteIcon}
            alt="Cross Icon"
            data-id={product.id}
          />
        </Button>

        <div className={`d-flex-col ${productCardStyles['product-wrapper']}`}>
          <img
            width="127"
            height="127"
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
          onClick={onEditFood}
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
  }
);

ProductCard.whyDidYouRender = true;
