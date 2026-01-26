import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.get("/convert", async (req, res) => {
  const { base = "USD", target } = req.query;

  if (!target) {
    return res.status(400).json({ error: "Target currency required" });
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${base}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== "success") {
      return res.status(500).json({ error: data["error-type"] });
    }

    const rate = data.conversion_rates[target.toUpperCase()];

    if (!rate) {
      return res.status(404).json({ error: "Invalid currency code" });
    }

    res.json({
      base,
      target: target.toUpperCase(),
      rate
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
