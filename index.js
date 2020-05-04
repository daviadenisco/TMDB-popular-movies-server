const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

const api_key = process.env.apiKey;
// const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

const baseUrl = 'https://api.themoviedb.org/3';

//const results = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

async function getData(url) {
    const res = await axios.get(url, {params: {api_key}});
    return res.data;
}

//getData(url);

app.get('/', async function(req, res, net) {
    const data = await getData(`${baseUrl}/movie/popular`);
    res.json(data);
});

app.get('/movie/:id/:credits', async function(req,res){
    const data = await getData(`${baseUrl}/movie/${req.params.id}/${req.params.credits}`);
    res.json(data);
});

app.get('/movie/:id/:similar', async function(req,res){
    const data = await getData(`${baseUrl}/movie/${req.params.id}/${req.params.similar}`)
    res.json(data);
});

app.listen(5000, () => {
    console.log('******  SERVER HAS STARTED ON PORT 5000 ******');
});