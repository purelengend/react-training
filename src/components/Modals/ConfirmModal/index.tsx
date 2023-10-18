import { FormEvent, memo } from 'react';
import { Button } from '@components/common/Button';
import confirmModalStyles from '@components/Modals/ConfirmModal/confirm-modal.module.css';

interface ConfirmModalProps {
  message: string;
  dataId: string;
  onCancelClick: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ConfirmModal = memo(
  ({ message, dataId, onCancelClick, onSubmit }: ConfirmModalProps) => {
    return (
      <div id="confirm-modal" className="d-flex-center modal-overlay">
        <form
          id="confirm-form"
          className={`d-flex-col ${confirmModalStyles['confirm-modal-body']}`}
          onSubmit={onSubmit}
        >
          <input
            id="hidden-confirm-id"
            type="number"
            defaultValue={dataId}
            name="id"
            hidden
          />
          <h2 className={confirmModalStyles['confirm-modal-content']}>
            {message}
          </h2>
          <div
            className={`d-flex ${confirmModalStyles['confirm-modal-btn-wrapper']}`}
          >
            <Button onClick={onCancelClick} className="modal-btn cancel">
              Cancel
            </Button>
            <Button type="submit" className="modal-btn confirm">
              Yes
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

ConfirmModal.whyDidYouRender = true;
export default ConfirmModal;
