import { FormEvent, memo } from 'react';
import { Button } from '../../common/Button';
import confirmModalStyles from './confirm-modal.module.css';
interface ConfirmModalProps {
  isVisible: boolean;
  message: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
const ConfirmModal = memo(
  ({ isVisible, message, onSubmit }: ConfirmModalProps) => {
    return (
      isVisible && (
        <div id="confirm-modal" className="d-flex-center modal-overlay">
          <form
            id="confirm-form"
            className={`d-flex-col ${confirmModalStyles['confirm-modal-body']}`}
            onSubmit={onSubmit}
          >
            <input
              id="hidden-confirm-id"
              type="number"
              defaultValue="0"
              name="id"
              hidden
            />
            <h2 className={confirmModalStyles['confirm-modal-content']}>
              {message}
            </h2>
            <div
              className={`d-flex ${confirmModalStyles['confirm-modal-btn-wrapper']}`}
            >
              <Button className="modal-btn cancel">Cancel</Button>
              <Button type="submit" className="modal-btn confirm">
                Yes
              </Button>
            </div>
          </form>
        </div>
      )
    );
  }
);

export default ConfirmModal;
