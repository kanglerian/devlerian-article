const express = require('express');
const cors = require('cors');
const app = express();
const port = 7000;

const { Artikel } = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Dev Lerian');
});

app.get('/post', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/list', async (req, res) => {
  try {
    const posts = await Artikel.findAll();
    return res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

app.post('/post', async (req, res) => {
  try {
    await Artikel.create(req.body);
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json(error)
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});