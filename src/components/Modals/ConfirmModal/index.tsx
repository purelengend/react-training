import { FormEvent, memo, useContext } from 'react';
import { Button } from '@components/common/Button';
import confirmModalStyles from '@components/Modals/ConfirmModal/confirm-modal.module.css';
import { ModalContext } from '@context/modal';
import isEqual from 'react-fast-compare';
interface ConfirmModalProps {
  message: string;
  dataId: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
const ConfirmModal = memo(
  ({ message, dataId, onSubmit }: ConfirmModalProps) => {
    const { setConfirmShowUp } = useContext(ModalContext);
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
            <Button
              onClick={() => setConfirmShowUp(false)}
              className="modal-btn cancel"
            >
              Cancel
            </Button>
            <Button type="submit" className="modal-btn confirm">
              Yes
            </Button>
          </div>
        </form>
      </div>
    );
  },
  isEqual
);

ConfirmModal.whyDidYouRender = true;
export default ConfirmModal;
