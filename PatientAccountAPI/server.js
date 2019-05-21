const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patientRouter = require("./Routes/routes.ts");

mongoose
    .connect(
        'mongodb://mongo:27017/hospital',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use("/patient", patientRouter);

app.get('/', (req, res) =>{
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
