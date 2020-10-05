const express = require('express');
var app = express();
var Mongoose = require('mongoose');
var path  = require('path');
var url = "mongodb://localhost:27017/mydb";
var dir_path = path.join(__dirname)  
var reload = require('reload');
Mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},(err, db)=>
{
    if(err){
        throw err ;
     }
     console.log("Database created!");
   });

var test_router = require(dir_path+'/router/testroute');
var schema_path = require(dir_path+'/schema/schema');
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',dir_path+'/views');
app.use(express.static(dir_path+'/public'));
app.use('/',test_router);
var server= app.listen(app.get('port'),(err) => 
   console.log('I am listing on PORT ' + app.get('port'))
)

reload(app,server);

