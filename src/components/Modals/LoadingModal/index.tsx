import { Spinner } from '@components/common/Spinner';
import loadingModalStyles from '@components/Modals/LoadingModal/loading-modal.module.css';

const LoadingModal = () => {
  return (
    <div className="d-flex-center modal-overlay">
      <Spinner customStyle={`${loadingModalStyles['modal-loading']}`} />
    </div>
  );
};

export default LoadingModal;
