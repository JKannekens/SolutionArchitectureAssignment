const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patientRouter = require('./Routes/routes.ts');

mongoose
    .connect(
        'mongodb://mongo:27017/hospitalpatientwrite',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/patient", patientRouter);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
