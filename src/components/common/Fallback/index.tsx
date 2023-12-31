import fallbackStyles from '@components/common/Fallback/Fallback.module.css';

export const Fallback = () => {
  return (
    <div className={`d-flex-center ${fallbackStyles['fallback-message']}`}>
      Something went wrong
    </div>
  );
};
