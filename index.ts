const express = require('express');
const app = express();
const PORT = process.env.PORT || 4444;
import {Request,Response } from 'express';

app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/', (req: Request, res: Response)=>{
    res.render('/public/index.html');
})


app.listen(PORT,()=>{
    console.log('go to http://localhost:'+PORT)
});