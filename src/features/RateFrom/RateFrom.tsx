import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import getETHBalance from "../../api/getETHBalance";
import "./styles.css";
import { isAddress } from "web3-validator";

const RateForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [labelText, setLabelText] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateAddress = (address) => {
    if (!isAddress(address, true)) {
      setInputError("Invalid address - please re-check!");
      return false;
    }
    setInputError("");
    return true;
  };

  const resetPreviousValues = () => {
    setError("");
    setLabelText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPreviousValues();
    if (!validateAddress(inputValue)) {
      return;
    }
    setIsLoading(true);

    getETHBalance(inputValue)
      .then((v) => {
        setLabelText(v);
      })
      .catch((e) => {
        setError(e?.message);
      })
      .finally(() => {
        setInputValue("");
        setIsLoading(false);
      });
  };

  return (
    <form class="rate-form" onSubmit={handleSubmit}>
      <Input
        label="ETH wallet address"
        name="address"
        type="text"
        value={inputValue}
        error={inputError}
        onChange={(v) => setInputValue(v)}
        placeholder="Enter ETH wallet address to get balance"
      />
      <Button customClassName="rate-form__button" type="submit">
        Click Me
      </Button>
      {labelText && <p class="rate-form__text">Your Balance: {labelText}</p>}
      {isLoading && <p class="rate-form__text"> "Loading... Please wait!"</p>}
      {error && <p class="rate-form__error">{error}</p>}
    </form>
  );
};

export default RateForm;
