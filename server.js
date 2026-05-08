const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

async function getBTCPrice() {

  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
  );

  return await response.json();
}

app.get('/', async (req, res) => {

  try {

    const data = await getBTCPrice();

    res.json({
      status: 'AlphaNode Backend Running',
      btc_price: data.bitcoin.usd
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