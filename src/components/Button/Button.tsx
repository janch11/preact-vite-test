import { h, FunctionComponent } from "preact";

type ButtonProps = {
  onClick?: () => void;
  type: "button" | "submit";
  children: h.JSX.Element | string;
  customClassName?: string;
};

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  type,
  customClassName
}) => {
  return (
    <button class={customClassName} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
