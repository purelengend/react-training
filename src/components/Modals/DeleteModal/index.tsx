import { Button } from '../../common/Button';
import deleteModalStyles from './delete-modal.module.css';
const DeleteModal = () => {
  return (
    <div id="delete-modal" className="d-flex-center modal-overlay">
      <form
        id="delete-form"
        className={`d-flex-col ${deleteModalStyles['delete-modal-body']}`}
      >
        <input id="hidden-delete-id" type="number" value="0" name="id" hidden />
        <h2 className={deleteModalStyles['delete-modal-content']}>
          Are you sure you want to delete this food?
        </h2>
        <div
          className={`d-flex ${deleteModalStyles['delete-modal-btn-wrapper']}`}
        >
          <Button className="modal-btn cancel">Cancel</Button>
          <Button className="modal-btn confirm">Yes</Button>
        </div>
      </form>
    </div>
  );
};

export default DeleteModal;
