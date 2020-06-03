const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

//==================IMPORTS====================================================

const userRoute = require('./routes/user');
const kitchenRoute = require('./routes/kitchen');
const foodRoute = require('./routes/food');
const discussionRoute = require('./routes/discussion');

//==================MIDDLEWARES====================================================
const app = express();

// app.use((req,res,next)=>{

// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));


//==================ROUTES====================================================

app.use(userRoute);
app.use(kitchenRoute);
app.use(foodRoute);
app.use(discussionRoute);

//==================MONGODB CONNECT====================================================

mongoose
  .connect(
    "mongodb+srv://communitykitchen:Shivam@6239@cluster0-wstkd.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });