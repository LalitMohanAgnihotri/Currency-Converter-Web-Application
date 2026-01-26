window.convertCurrency = async function () {
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;
  const result = document.getElementById("result");

  result.className = "result";
  result.innerText = "Converting...";
  result.classList.remove("hidden");

  if (!amount || !currency) {
    result.innerText = "Please fill all fields";
    result.classList.add("error");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/convert?target=${currency}`
    );
    const data = await response.json();

    if (data.error) {
      result.innerText = data.error;
      result.classList.add("error");
      return;
    }

    result.innerText = `${amount} USD = ${(amount * data.rate).toFixed(2)} ${currency}`;
    result.classList.add("success");

  } catch (error) {
    result.innerText = "Network error. Please try again.";
    result.classList.add("error");
  }
};
