const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      path = require('path');
      app = express();

app.use(cors());      

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

var isProduction = process.env.NODE_ENV === 'production';
  
 var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/meanstackdb';
  if(isProduction){
    mongoose.connect(process.env.MONGODB_URI);
  } else {
    mongoose.connect("mongodb://ganeshmani:Sridevi!23789@ds253284.mlab.com:53284/mean_kickstarter",{ useNewUrlParser : true });
    mongoose.set('debug', true);
  }

  require('./model/post');


  app.use(require('./routes/posts'))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`app is listening to port ${PORT}`);
})