import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js';
import Cors from 'cors';

// const express = require('express');
// const mongoose = require('mongoose');
// const Cards = require('./dbCards.js');
// const Cors = require('cors');
//AppConfig
const app = express();
const port = process.env.PORT||8001;
const connectin_url = "mongodb+srv://admin:Q1fNahR4boJQfO9J@cluster0.newtx.mongodb.net/tinderdb?retryWrites=true&w=majority";
//Middlewares
app.use(express.json());
app.use(Cors());

//DBconfig
mongoose.connect(connectin_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//Apiendpoints
app.get('/', (req, res) => res.status(200).send("Hello siddharth"));

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

//Listener
app.listen(port, () => console.log("listening to localhost : "+port));