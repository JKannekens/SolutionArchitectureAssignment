const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



mongoose
    .connect(
        'mongodb://mongo:27017/expressmongo',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

Item = mongoose.model('item', ItemSchema);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  res.send('Hello World!')
});

//Post route
app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: "test"
  });

  newItem.save().then(item => res.redirect('/'));
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});