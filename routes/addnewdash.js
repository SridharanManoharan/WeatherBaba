var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CityModel = require('./citymodule');

router.post('/',function(req,res,next){
  var flag =0;
  //console.log("we are in the addnewdash function");
  mongoose.connect('mongodb://127.0.0.1:27017/cityDatabase');
  //console.log(mongoose.connection.readyState);
  //console.log(req.body);
  var newCity = CityModel(req.body);
  CityModel.find({ip:req.body.ip,cityName:req.body.cityName},function(err,data){
    if(err){
      mongoose.connection.close();
      //console.log(err);
      res.end("not able to fetch data");
    }
    else
    {
      //console.log("data",data);
      if(data.length===0 || data === null || data === undefined)
      {
        CityModel.find({ip:req.body.ip},function(err,data){
          if(err){
            mongoose.connection.close();
            //console.log(err);
            res.end("now able to fetch data");
          }else{
            if(data.length===10){
              //console.log("you have already added ten dashboards");
              mongoose.connection.close();
              res.end("already added 10 dashboards");
            }else{
              //console.log("data1",data);
              newCity.save(function(err){
                if(err){
                  //console.log("having error in saving the device");
                  mongoose.connection.close();
                  res.end("data not added successfully");
                }else{
                  //console.log("dashboard saved successfully");
                  mongoose.connection.close();
                  res.end("dashboard added successfully");
                }
              });
            }
          }
        });
      }
      else
      {
        //console.log("this data is already available");
        mongoose.connection.close();
        res.end("data is already available");
      }
    }
  });
});


module.exports = router;
