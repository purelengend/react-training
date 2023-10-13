import { memo } from 'react';
import { Spinner } from '@components/common/Spinner';
import loadingModalStyles from '@components/Modals/LoadingModal/loading-modal.module.css';
interface LoadingModalProps {
  isVisible: boolean;
}
const LoadingModal = memo(({ isVisible }: LoadingModalProps) => {
  return (
    isVisible && (
      <div
        style={{ display: isVisible ? 'inline-flex' : 'none' }}
        className="d-flex-center modal-overlay"
      >
        <Spinner customStyle={`${loadingModalStyles['modal-loading']}`} />
      </div>
    )
  );
});

LoadingModal.whyDidYouRender = true;
export default LoadingModal;
