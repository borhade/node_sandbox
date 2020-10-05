var express = require('express');
var bodyParser = require('body-parser'); 
//var flash = require('connect-flash');
var router = express.Router();
var BASE_URL = path.join(__dirname)
var UserModel =  require(BASE_URL+'/schema/schema');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
// router.use(flash());
router.get('/',(req,res) =>{
    res.render('simple_view');
});

router.post('/savedata',(req,res) => {
   var firstname = req.body.firstname;
   var lastname  = req.body.lastname;
   var mydata  = {
    "firstname": firstname, 
    "lastname":lastname, 
   }
   
   var data  = UserModel(mydata);
   data.save((err) => {
    if(!err){
        //req.flash('test','it worked');
        // console.log(req.flash('test'));
        console.log('Data Added Successfully !');
        return res.redirect('/');
      }
   });
});

router.get('/display',(req,res)=> {
    UserModel.find((err,docs) => {
        if(!err){
            res.render('list',{
                user_data:docs
            });
        }
    });
});

//show single User
 router.get('/show/:id',(req,res) => {
    var parameter_id = req.params.id;
    UserModel.findById(parameter_id,(err,docs)=>{
        if(!err){
            //console.log(docs);
             res.render('show_user',{
              data_by_id:docs
            });
        }
    });
});

//Delete id
router.get('/delete/:id',(req,res)=>{
    var delete_id  = req.params.id;
    UserModel.deleteOne({'_id':delete_id},(err)=>{
        res.redirect('/display');
    });
});

module.exports= router;