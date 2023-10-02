import mutationModalStyles from './mutation-modal.module.css';
import { Button } from '../../common/Button';
import { Food } from '../../common/Cards/ProductCard';
import { InputField } from '../../common/InputField';
import { useState } from 'react';

interface MutationModalProps {
  isVisible: boolean;
  title: string;
  prodData?: Food;
}

const defaultData: Food = {
  id: '0',
  name: 'test value',
  price: 230,
  imageUrl:
    'https://images.unsplash.com/photo-1614777986387-015c2a89b696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3774&q=80',
  quantity: 2000,
  createdAt: new Date()
};

const MutationModal = ({
  isVisible,
  title,
  prodData = defaultData
}: MutationModalProps) => {
  const [mutationData, setMutationData] = useState(prodData);
  const onChangeMutation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMutationData({
      ...mutationData,
      [e.target.name]: value
    });
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
              <Button className="modal-btn cancel">Cancel</Button>
              <Button className="modal-btn confirm">Save</Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

MutationModal.whyDidYouRender = true;
export default MutationModal;
