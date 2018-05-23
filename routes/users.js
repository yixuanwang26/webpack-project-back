var express = require('express');
var router = express.Router();

var queryUser = require('../database/model/userModel').queryData;
var createUser = require('../database/model/userModel').saveData;
var updateUser = require('../database/model/userModel').updateData;
var removeUser = require('../database/model/userModel').removeData;

var submitUser = require('../database/model/userModel').submitData;


function formatData(success, result){
  let responseData = {
    success: false,
    message: 'successful!'
  }
  if (success) {
    if(result instanceof Array){
      responseData.rows = result;
    }else if(result._id){
      responseData.newRecord = result;
    }
    responseData.success = true;
  } else {
    responseData.success = false;
    responseData.message = result;
  }
  const data = JSON.stringify(responseData);
  return data;
}

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/* 获取用户 */
router.get('/query', function(req, res, next) {
  const { query } = req;
  //调取model层查询方法
  queryUser({ ...query }, function (success, result) {
    res.send(formatData(success, result));
  });

});

/* 创建用户 */
router.post('/create',function(req,res,next){
  createUser(req.body, function(success, result){
    res.send(formatData(success, result));
  });
  
})

router.post('/submit',function(req,res,next){
  submitUser(req.body, function(success, result){
    res.send(formatData(success, result));
  });
  
})

/* 修改用户 */
router.post('/update', function(req, res, next) {
  updateUser(req.body, function(success, result){
    res.send(formatData(success, result));
  })
});

/* 删除用户 */
router.post('/delete', function(req, res, next) {
  removeUser(req.body, function(success, result){
    res.send(formatData(success, result));
  })
});

module.exports = router;
