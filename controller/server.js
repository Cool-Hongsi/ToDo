const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const db = require('../model/db');
const alert = require('alert-node');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/getData', (req, res) => {
    db.getData().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.post('/api/addData', (req, res) => {
    db.addData(req.body).then(() => {
        console.log("add success");
    }).catch((err) => {
        console.log(err);
        alert("Existing ID");
    })
});

app.put('/api/updateData/:id', (req, res) => {
    db.updateData(parseInt(req.params.id), req.body).then(() => {
        console.log("update success");
    }).catch((err) => {
        console.log(err);
    })
});

app.delete('/api/deleteData/:id', (req, res) => {
    db.deleteData(parseInt(req.params.id)).then(() => {
        console.log("delete success");
    }).catch((err) => {
        console.log(err);
    })
});

app.listen(port, () => {
    console.log(`Connected ${port}`);
});