import { memo } from 'react';
import mutationModalStyles from './mutation-modal.module.css';
import { Button } from '../../common/Button';
import { Food } from '../../common/Cards/ProductCard';
import { InputField } from '../../common/InputField';

interface MutationModalProps {
  isVisible: boolean;
  title: string;
  prodData?: Food;
}

const defaultData: Food = {
  id: '0',
  name: 'test value',
  price: 230,
  imageUrl: 'google.com',
  quantity: 2000,
  createdAt: new Date()
};
const MutationModal = memo(
  ({ isVisible, title, prodData = defaultData }: MutationModalProps) => {
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
            >
              <input
                type="hidden"
                id="food-id"
                name="food-id"
                value={prodData.id}
              />
              <input
                type="hidden"
                id="created-at"
                name="created-at"
                value={prodData.createdAt.toDateString()}
              />
              <div
                className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
              >
                <InputField
                  htmlFor="food"
                  labelClass={mutationModalStyles['mutation-label']}
                  type="text"
                  inputClass={mutationModalStyles['mutation-input']}
                  name="food"
                  value={prodData.name}
                >
                  Name
                </InputField>
              </div>
              <div
                className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
              >
                <InputField
                  htmlFor="price"
                  labelClass={mutationModalStyles['mutation-label']}
                  type="number"
                  inputClass={mutationModalStyles['mutation-input']}
                  name="price"
                  value={`${prodData.price}`}
                >
                  Price
                </InputField>
              </div>
              <div
                className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
              >
                <InputField
                  htmlFor="image"
                  labelClass={mutationModalStyles['mutation-label']}
                  type="text"
                  inputClass={mutationModalStyles['mutation-input']}
                  name="image"
                  value={prodData.imageUrl}
                >
                  Image URL
                </InputField>
              </div>
              <div
                className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
              >
                <InputField
                  htmlFor="quantity"
                  labelClass={mutationModalStyles['mutation-label']}
                  type="number"
                  inputClass={`${mutationModalStyles['mutation-input']} ${mutationModalStyles.half}`}
                  name="quantity"
                  value={`${prodData.quantity}`}
                >
                  Quantity
                </InputField>
              </div>
              <div
                className={`d-flex ${mutationModalStyles['mutation-modal-btn-wrapper']}`}
              >
                <Button className="modal-btn cancel">Cancel</Button>
                <Button className="modal-btn confirm">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
);

export default MutationModal;
