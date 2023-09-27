import React from 'react';
import mutationModalStyles from './mutation-modal.module.css';
const MutationModal = () => {
  return (
    <div
      id="mutation-modal"
      // style={{ display: 'none' }}
      className={`d-flex-center modal-overlay`}
    >
      <div
        className={`d-flex-col ${mutationModalStyles['mutation-modal-body']}`}
      >
        <h2
          id="mutation-title"
          className={mutationModalStyles['mutation-modal-content']}
        >
          Edit
        </h2>
        <form
          id="mutation-form"
          className={`d-flex-col ${mutationModalStyles['mutation-form']}`}
        >
          <input type="hidden" id="food-id" name="food-id" />
          <input type="hidden" id="created-at" name="created-at" />
          <div
            className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
          >
            <label
              htmlFor="food"
              className={mutationModalStyles['mutation-label']}
            >
              Name
            </label>
            <input
              type="text"
              className={mutationModalStyles['mutation-input']}
              id="food"
              name="food"
            />
          </div>
          <div
            className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
          >
            <label
              htmlFor="price"
              className={mutationModalStyles['mutation-label']}
            >
              Price
            </label>
            <input
              type="number"
              step="any"
              className={mutationModalStyles['mutation-input']}
              id="price"
              name="price"
            />
          </div>
          <div
            className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
          >
            <label
              htmlFor="image"
              className={mutationModalStyles['mutation-label']}
            >
              Image URL
            </label>
            <input
              type="text"
              className={mutationModalStyles['mutation-input']}
              id="image"
              name="image"
            />
          </div>
          <div
            className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
          >
            <label
              htmlFor="quantity"
              className={mutationModalStyles['mutation-label']}
            >
              Quantity
            </label>
            <input
              type="number"
              step="any"
              className={`${mutationModalStyles['mutation-input']} ${mutationModalStyles.half}`}
              id="quantity"
              name="quantity"
            />
          </div>
          <div
            className={`d-flex ${mutationModalStyles['mutation-modal-btn-wrapper']}`}
          >
            <button
              id="close-mutation-btn"
              type="button"
              className={`${mutationModalStyles['modal-btn']} ${mutationModalStyles.cancel}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${mutationModalStyles['modal-btn']} ${mutationModalStyles.confirm}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MutationModal;
