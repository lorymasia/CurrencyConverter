import { useState, useEffect } from "react";

export default function App() {
  const [currency, setCurrency] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeCurrency(e) {
    setCurrency(Number(e.target.value));
  }

  function handleFromCur(e) {
    setFromCur(e.target.value);
  }

  function handleToCur(e) {
    setToCur(e.target.value);
  }

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${currency}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);

        fetchCurrency();
      }
    },
    [currency, fromCur, toCur]
  );

  return (
    <div>
      <input type="text" value={currency} onChange={handleChangeCurrency} />
      <select value={fromCur} onChange={handleFromCur} disable={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={handleToCur} disable={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted} {toCur}
      </p>
    </div>
  );
}
