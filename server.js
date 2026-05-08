const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

async function getBTCPrice() {
  const response = await fetch(
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
  );

  return await response.json();
}

app.get('/', async (req, res) => {
  try {
    const data = await getBTCPrice();

    res.json({
      status: 'AlphaNode Backend Running',
      live: data
    });

  } catch (err) {

    res.json({
      error: err.message
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});