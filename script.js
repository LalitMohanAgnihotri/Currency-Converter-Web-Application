window.convertCurrency = async function () {
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value.toUpperCase();
  const result = document.getElementById("result");

  if (!amount || !currency) {
    result.innerText = "Please fill all fields";
    result.style.color = "red";
    return;
  }

  const apiKey = "";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); 

    if (data.result !== "success") {
      result.innerText = `API Error: ${data["error-type"]}`;
      result.style.color = "red";
      return;
    }

    const rate = data.conversion_rates[currency];

    if (!rate) {
      result.innerText = "Invalid currency code";
      result.style.color = "red";
      return;
    }

    result.innerText = `${amount} USD = ${(amount * rate).toFixed(2)} ${currency}`;
    result.style.color = "#1a1b1a";

  } catch (error) {
    console.error(error);
    result.innerText = "Network error";
    result.style.color = "red";
  }
};
