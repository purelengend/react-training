import mutationModalStyles from '@components/Modals/MutationModal/mutation-modal.module.css';
import { Button } from '@components/common/Button';
import { Food } from '@components/common/Cards/ProductCard';
import { InputField } from '@components/common/InputField';
import { FormEvent, memo, useCallback } from 'react';
import {
  FoodErrorMessage,
  defaultData,
  defaultFoodErrorMessage
} from '@constants/food';
import isEqual from 'react-fast-compare';
interface MutationModalProps {
  title: string;
  productData?: Food;
  setProductData: (food: Food) => void;
  errorProductMessage?: FoodErrorMessage;
  setErrorProductMessage: (error: FoodErrorMessage) => void;
  onCancelClick: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const MutationModal = memo(
  ({
    title,
    productData = defaultData,
    setProductData,
    errorProductMessage = defaultFoodErrorMessage,
    onCancelClick,
    onSubmit
  }: MutationModalProps) => {
    const onChangeMutationProductData = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProductData({
          ...productData,
          [e.target.name]: value
        });
      },
      [productData, setProductData]
    );

    return (
      <div id="mutation-modal" className={`d-flex-center modal-overlay`}>
        <div
          className={`d-flex-col ${mutationModalStyles['mutation-modal-body']}`}
        >
          <h2
            id="mutation-title"
            className={mutationModalStyles['mutation-modal-content']}
          >
            {title}
          </h2>
          <form
            id="mutation-form"
            className={`d-flex-col ${mutationModalStyles['mutation-form']}`}
            onSubmit={onSubmit}
          >
            <div
              className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
            >
              <InputField
                label="Name"
                htmlFor="name"
                labelClass={mutationModalStyles['mutation-label']}
                type="text"
                inputClass={mutationModalStyles['mutation-input']}
                name="name"
                value={productData.name}
                onChange={onChangeMutationProductData}
              />
              {errorProductMessage.name && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorProductMessage.name}
                </p>
              )}
            </div>
            <div
              className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
            >
              <InputField
                label="Price"
                htmlFor="price"
                labelClass={mutationModalStyles['mutation-label']}
                type="number"
                inputClass={mutationModalStyles['mutation-input']}
                name="price"
                value={`${productData.price}`}
                onChange={onChangeMutationProductData}
              />
              {errorProductMessage.price && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorProductMessage.price}
                </p>
              )}
            </div>
            <div
              className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
            >
              <InputField
                label="Image URL"
                htmlFor="image"
                labelClass={mutationModalStyles['mutation-label']}
                type="text"
                inputClass={mutationModalStyles['mutation-input']}
                name="imageUrl"
                value={productData.imageUrl}
                onChange={onChangeMutationProductData}
              />
              {errorProductMessage.imageUrl && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorProductMessage.imageUrl}
                </p>
              )}
            </div>
            <div
              className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
            >
              <InputField
                label="Quantity"
                htmlFor="quantity"
                labelClass={mutationModalStyles['mutation-label']}
                type="number"
                inputClass={`${mutationModalStyles['mutation-input']} ${mutationModalStyles.half}`}
                name="quantity"
                value={`${productData.quantity}`}
                onChange={onChangeMutationProductData}
              />
              {errorProductMessage.quantity && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorProductMessage.quantity}
                </p>
              )}
            </div>
            <div
              className={`d-flex ${mutationModalStyles['mutation-modal-btn-wrapper']}`}
            >
              <Button onClick={onCancelClick} className="modal-btn cancel">
                Cancel
              </Button>
              <Button type="submit" className="modal-btn confirm">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  },
  isEqual
);

MutationModal.whyDidYouRender = true;
export default MutationModal;
