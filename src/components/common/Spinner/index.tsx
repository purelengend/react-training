import spinnerStyles from '@components/common/Spinner/spinner.module.css';
export interface SpinnerProps {
  customStyle?: string;
}

export const Spinner = ({ customStyle }: SpinnerProps) => {
  return (
    <div id="spin" className={`${spinnerStyles.loader} ${customStyle}`}></div>
  );
};
