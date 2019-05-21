const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const doctorRouter = require("./Routes/routes.ts");

mongoose
    .connect(
        'mongodb://mongo:27017/hospital',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use("/doctor", doctorRouter);

app.get('/', (req, res) =>{
  res.send("Hello World");
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8060, () => {
  console.log('Example app listening on port 8060!')
});
