// const express = require('express')
import express from 'express';
const app = express()
// let bodyParser = require('body-parser');
// const userRout=require('./routs/user')
import bodyParser from 'body-parser'
import userRout from './routs/user.js'


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(userRout);

app.listen(4000, ()=>{
    console.log("Hello from the other side!!");
})