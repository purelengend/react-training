import spinnerStyles from '@components/common/Spinner/spinner.module.css';
export const Spinner = () => {
  return <div id="spin" className={spinnerStyles.loader}></div>;
};
