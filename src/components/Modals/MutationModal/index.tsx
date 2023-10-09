import mutationModalStyles from '@components/Modals/MutationModal/mutation-modal.module.css';
import { Button } from '@components/common/Button';
import { Food } from '@components/common/Cards/ProductCard';
import { InputField } from '@components/common/InputField';
import {
  FormEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { ModalContext } from '@context/modal';
import { validateForm } from '@helpers/form-validation';
import { defaultData } from '@constants/food';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutationFood } from '@services/food.service';
import {
  TOAST_ADD_MSG,
  TOAST_EDIT_MSG,
  TOAST_ERROR_MSG,
  TOAST_TIME
} from '@constants/toast';
import { InfiniteQueryProps } from '@hooks/useFood';
import { deepClone } from '@helpers/deep-clone';

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
const MutationModal = memo(
  ({ isVisible, title, prodData = defaultData }: MutationModalProps) => {
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
        const currentFoodData = queryClient.getQueryData<
          InfiniteQueryProps<Food>
        >(['foods']);
        let toastMessage = '';
        if (currentFoodData) {
          let existedFoodIndex = -1;

          // Loop all food pages, check the data prop and loop over all food items in data to find the existed food
          for (const [index, foodPage] of currentFoodData.pages.entries()) {
            const foundedFoodIndex = foodPage.data.findIndex(food => {
              return food.id === data.id;
            });

            // If the food is exist, update the local client food data
            if (foundedFoodIndex > -1) {
              existedFoodIndex = foundedFoodIndex;

              const updatedFoodData =
                deepClone<InfiniteQueryProps<Food>>(currentFoodData);

              updatedFoodData.pages[index].data[foundedFoodIndex] = data;
              queryClient.setQueryData<InfiniteQueryProps<Food>>(
                ['foods'],
                updatedFoodData
              );
            }
          }

          // Otherwise, re-call the get food API
          if (existedFoodIndex < 0) {
            toastMessage = TOAST_ADD_MSG;
            queryClient.resetQueries({ queryKey: ['foods'] });
          } else {
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
      else setMutationData(prodData);
      setErrorMessage(defaultErrorMessage);
      setMutationShowUp(false);
    }, [mutationData.id, prodData, setMutationShowUp]);

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
                value={
                  typeof mutationData.createdAt === 'string'
                    ? mutationData.createdAt
                    : mutationData.createdAt.toDateString()
                }
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
  }
);

MutationModal.whyDidYouRender = true;
export default MutationModal;
