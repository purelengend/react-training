import mutationModalStyles from './mutation-modal.module.css';
import { Button } from '../../common/Button';
import { Food } from '../../common/Cards/ProductCard';
import { InputField } from '../../common/InputField';
import { FormEvent, useCallback, useContext, useState } from 'react';
import { ModalContext } from '../../../context';
// import {
//   FOOD_IMG_WARNING_MSG,
//   FOOD_NAME_WARNING_MSG,
//   FOOD_PRICE_WARNING_MSG,
//   FOOD_QUANTITY_WARNING_MSG
// } from '../../../constants/food';
import { validateForm } from '../../../helpers/form-validation';

interface MutationModalProps {
  isVisible: boolean;
  title: string;
  prodData?: Food;
}

export interface FoodErrorMessage {
  name: string;
  price: string;
  imageUrl: string;
  quantity: string;
}

const defaultData: Food = {
  id: '',
  name: '',
  price: 0,
  imageUrl: '',
  quantity: 0,
  createdAt: new Date()
};

const MutationModal = ({
  isVisible,
  title,
  prodData = defaultData
}: MutationModalProps) => {
  const [mutationData, setMutationData] = useState(prodData);
  // const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const { setMutationShowUp } = useContext(ModalContext);
  const onChangeMutation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMutationData({
      ...mutationData,
      [e.target.name]: value
    });
  };
  const onCancelClick = useCallback(() => {
    setMutationData(defaultData);
    setMutationShowUp(false);
  }, [setMutationShowUp]);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateMessage = validateForm(mutationData);
    if (Object.values(validateMessage).join('')) {
      console.log(validateMessage);
    } else {
      console.log('Enough for submitting');
    }
  };
  return (
    isVisible && (
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
            <input
              type="hidden"
              id="food-id"
              name="food-id"
              value={mutationData.id}
            />
            <input
              type="hidden"
              id="created-at"
              name="created-at"
              value={mutationData.createdAt.toDateString()}
            />
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
                value={mutationData.name}
                onChange={onChangeMutation}
              />
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
                value={`${mutationData.price}`}
                onChange={onChangeMutation}
              />
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
                value={mutationData.imageUrl}
                onChange={onChangeMutation}
              />
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
                value={`${mutationData.quantity}`}
                onChange={onChangeMutation}
              />
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
    )
  );
};

MutationModal.whyDidYouRender = true;
export default MutationModal;
