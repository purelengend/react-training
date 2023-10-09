import { memo } from 'react';
import { Spinner } from '@components/common/Spinner';

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
        <Spinner />
      </div>
    )
  );
});

LoadingModal.whyDidYouRender = true;
export default LoadingModal;
