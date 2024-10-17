import { h, FunctionComponent } from "preact";
import { useCallback } from "preact/hooks";
import "./index.css";

type InputProps = {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
  value?: string;
  onChange: (value: string) => void;
  error?: string;
} & Omit<h.JSX.HTMLAttributes<HTMLInputElement>, "onChange">;

const Input: FunctionComponent<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  ...props
}) => {

  const handleChange = useCallback(
    (e: h.JSX.TargetedEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <div class="input">
      <label for={name} class="input__label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        class={`input__field ${error ? "input__field--error" : ""}`}
        {...props}
      />
      {error && <p class="input__error-message">{error}</p>}
    </div>
  );
};

export default Input;
