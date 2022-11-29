// const express = require('express')
import express from 'express';
const router = express.Router()
// const controllers=require('../controller/meter');
import controllers from '../controller/meter.js' 


router.get('/active',async (req, res) =>{
    res.end("Updating database ");

})

router.patch('/meter/on', controllers.on);

router.patch('/meter/off', controllers.off);


// module.exports=router;
export default router;