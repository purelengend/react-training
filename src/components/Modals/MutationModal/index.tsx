import mutationModalStyles from './mutation-modal.module.css';
import { Button } from '../../common/Button';
import { Food } from '../../common/Cards/ProductCard';
import { InputField } from '../../common/InputField';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../../context';
// import {
//   FOOD_IMG_WARNING_MSG,
//   FOOD_NAME_WARNING_MSG,
//   FOOD_PRICE_WARNING_MSG,
//   FOOD_QUANTITY_WARNING_MSG
// } from '../../../constants/food';
import { validateForm } from '../../../helpers/form-validation';
import { defaultData } from '../../../constants/food';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutationFood } from '../../../services/food.service';
import {
  TOAST_ADD_MSG,
  TOAST_EDIT_MSG,
  TOAST_ERROR_MSG,
  TOAST_TIME
} from '../../../constants/toast';

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

const defaultErrorMessage: FoodErrorMessage = {
  name: '',
  price: '',
  imageUrl: '',
  quantity: ''
};
const MutationModal = ({
  isVisible,
  title,
  prodData = defaultData
}: MutationModalProps) => {
  const [mutationData, setMutationData] = useState(prodData);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const { setMutationShowUp, setLoadingShowUp, showToast, hideToast } =
    useContext(ModalContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    setMutationData(prodData);
  }, [prodData]);

  const mutation = useMutation({
    mutationFn: (input: Food) => {
      return mutationFood(input);
    },
    onMutate: () => {
      setLoadingShowUp(true);
    },
    onSuccess: data => {
      const oldFoodList = queryClient.getQueryData<Food[]>(['foods']);
      let toastMessage = '';
      if (oldFoodList) {
        const updatedFoodIndex = oldFoodList.findIndex(
          food => food.id === data.id
        );
        if (updatedFoodIndex < 0) {
          queryClient.setQueryData<Food[]>(['foods'], [...oldFoodList, data]);
          toastMessage = TOAST_ADD_MSG;
        } else {
          const updatedFoodList = [...oldFoodList];
          updatedFoodList[updatedFoodIndex] = data;
          queryClient.setQueryData<Food[]>(['foods'], [...updatedFoodList]);
          toastMessage = TOAST_EDIT_MSG;
        }
      }
      onCancelClick();
      setLoadingShowUp(false);
      showToast(toastMessage, true);
      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    },
    onError: () => {
      onCancelClick();
      setLoadingShowUp(false);
      showToast(TOAST_ERROR_MSG, false);
      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    }
  });

  const onChangeMutation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMutationData({
      ...mutationData,
      [e.target.name]: value
    });
  };

  const onCancelClick = useCallback(() => {
    if (mutationData.id === defaultData.id) setMutationData(defaultData);
    setErrorMessage(defaultErrorMessage);
    setMutationShowUp(false);
  }, [setMutationShowUp, mutationData.id]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateMessage = validateForm(mutationData);
    if (Object.values(validateMessage).join('')) {
      setErrorMessage(validateMessage);
    } else {
      mutation.mutate(mutationData);
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
              value={mutationData.createdAt}
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
              {errorMessage.name && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorMessage.name}
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
                value={`${mutationData.price}`}
                onChange={onChangeMutation}
              />
              {errorMessage.price && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorMessage.price}
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
                value={mutationData.imageUrl}
                onChange={onChangeMutation}
              />
              {errorMessage.imageUrl && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorMessage.imageUrl}
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
                value={`${mutationData.quantity}`}
                onChange={onChangeMutation}
              />
              {errorMessage.quantity && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errorMessage.quantity}
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
    )
  );
};

MutationModal.whyDidYouRender = true;
export default MutationModal;
