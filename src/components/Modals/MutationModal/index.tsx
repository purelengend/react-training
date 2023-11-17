import { Button } from '@components/common/Button';
import { Food } from '@components/common/Cards/ProductCard';
import { InputField } from '@components/common/InputField';
import mutationModalStyles from '@components/Modals/MutationModal/mutation-modal.module.css';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Control, UseFormRegister, useFormState } from 'react-hook-form';

export interface MutationModalProps {
  title: string;
  onCancelClick: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  control: Control<Food>;
  register: UseFormRegister<Food>;
}

const MutationModal = memo(
  ({
    title,
    onCancelClick,
    onSubmit,
    control,
    register
  }: MutationModalProps) => {
    const { errors } = useFormState({ control });

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
              <input hidden {...register('id')} />
              <InputField
                label="Name"
                htmlFor="name"
                labelClass={mutationModalStyles['mutation-label']}
                type="text"
                inputClass={mutationModalStyles['mutation-input']}
                name="name"
                register={register}
              />
              {errors.name && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errors.name.message}
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
                register={register}
                typeValue="valueAsNumber"
              />
              {errors.price && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errors.price.message}
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
                register={register}
              />
              {errors.imageUrl && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errors.imageUrl.message}
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
                register={register}
                typeValue="valueAsNumber"
              />
              {errors.quantity && (
                <p className={mutationModalStyles['mutation-warning']}>
                  {errors.quantity.message}
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
