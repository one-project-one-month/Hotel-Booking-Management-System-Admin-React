interface ToastText {
  text: string;
}

const Toast = ({ text }: ToastText) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
};

export default Toast;
