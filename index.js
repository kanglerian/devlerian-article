const express = require('express');
const cors = require('cors');
const app = express();
const port = 3033;

const data = require('./database/articles.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Dev Lerian 🇮🇩');
});

app.get('/post', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/list', async (req, res) => {
  try {
    return res.status(200).json({
      data: data.articles
  });
  } catch (error) {
    console.log(error);
  }
});

app.get('/list/:id', async (req, res) => {
  try {
    let hasil = [];
    const articles = data.articles;
    articles.forEach(article => {
      if(article.id == req.params.id){
        hasil.push(article);
      }
    });
    return res.status(200).json({
      data: hasil
  });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});