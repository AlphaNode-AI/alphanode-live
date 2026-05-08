const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();

app.use(cors());

let latestPrice = null;

const ws = new WebSocket(
  'wss://stream.binance.com:9443/ws/btcusdt@ticker'
);

ws.on('message', (data) => {
  const ticker = JSON.parse(data);

  latestPrice = {
    symbol: ticker.s,
    price: ticker.c
  };

  console.log(latestPrice);
});

app.get('/', (req, res) => {
  res.json({
    status: 'AlphaNode Backend Running',
    live: latestPrice
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
