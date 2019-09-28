var express = require('express');
var router = express.Router();
var session = require('express-session');


router.get('/index2', function(req, res, next) {
   var db = req.connection;
  
  var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
      if(ip.split(',').length>0){
          ip = ip.split(',')[0];
      }
  var sql = {
    Online: ip
  }
  var data = new Array();
   var each = require('foreach');
   var id;
    
  db.query('SELECT * FROM membet WHERE ?',sql,function(error, rows){
    console.log(sql)
    //檢查是否有錯誤
    if(error){
        throw error;
    }
    else if(rows.length === 0){
          res.redirect('/Sign-in');
         }
         else {
          each(rows, function (value, key, array) {
            console.log(value.id);
                id = value.id;
             });
                var sql = {
                   id:id
                }
            db.query('SELECT * FROM registration WHERE ?',sql,function(error, rows2){
                //檢查是否有錯誤
                if(error){
                    throw error;
                }

                else{ 
                          
                      data[0]= rows;
                      data[1]= rows2;
                     // console.log(req.session.data1);
                      res.render('index2', {data: data}); }

           
         
        });
     }
    });
            
});

router.get('/Sign-in', function(req, res, next) {

            res.render('Sign-in'); 
});

router.post('/Sign-in', function(req, res, next) {
    var db = req.connection;
      var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
      if(ip.split(',').length>0){
          ip = ip.split(',')[0];
      }

    var sql = {
        id: req.body.Id
    };
    var sql2 = {
        pwd: req.body.pwd
    };
    var sql3 = {
        Online: ip
    };

    db.query('SELECT id FROM membet WHERE binary ?',sql,function(err, rows){
      console.log(rows[0]);
    //檢查是否有錯誤
    if(err){
         console.log(err);
        
    }
    else if(rows.length === 0){
        res.send('<script>alert("帳號或密碼錯誤!"); window.location = "/Sign-in"; </script>');
        }
    else {
       db.query('SELECT pwd FROM membet WHERE binary ?',sql2,function(err, rows){
          console.log(rows[0]);
        if(err){
             console.log(err);
        }
        else if(rows.length === 0){
          res.send('<script>alert("帳號或密碼錯誤!"); window.location = "/Sign-in"; </script>');
         }
        else {
            var cmd = 'UPDATE membet SET ?  WHERE id = \'' + req.body.Id + '\'';
            console.log(cmd)
            db.query(cmd, sql3, function(err, rows) {
                if (err) {
                    console.log(err);
                    res.redirect('/Sign-in');
                }
                else{
                      console.log(rows);
                      res.redirect('/');
                          
                }
            });
         
        }
       });
    }
});
});
router.get('/Sign-up', function(req, res, next) {
  var db = req.connection;

  var data = "";
  db.query('SELECT * FROM membet',function(error, rows){
    //檢查是否有錯誤
    if(error){
        throw error;
    }
     console.log(rows);
        var data = rows;
        res.render('Sign-up', { data: data});
    });
          
});
// add post
router.post('/Sign-up', function(req, res, next) {

    var db = req.connection;

    var sql = {
        name: req.body.name,
        id: req.body.Id,
        sex: req.body.sex,
        phone: req.body.phone,
        pwd: req.body.password,
        age: req.body.age
    };

    console.log(sql);
    db.query('INSERT INTO membet SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
            res.redirect('/Sign-up');
        }
        else{
          res.send('<script>alert("註冊成功!"); window.location = "/"; </script>');
        }
    });

});


router.get('/api', function(req, res, next) {
  
              var getJSON = require('get-json')
              getJSON('https://data.ntpc.gov.tw/od/data/api/DE4CFD62-E977-4C4F-822F-7D2AA65F6E4A?$format=json',function(error, response){
                  var str = JSON.stringify(response);
                  var data =JSON.parse(str);
                  res.render('api', { data: data});      
     
    });
});
router.post('/api', function(req, res, next) {
  var getJSON = require('get-json')
    getJSON('https://data.ntpc.gov.tw/od/data/api/DE4CFD62-E977-4C4F-822F-7D2AA65F6E4A?$format=json',function(error, response){
        var str = JSON.stringify(response);
        var data =JSON.parse(str);
        var T = new Array() ;
        var A = new Array();
        var N = new Array();
        var Tr = new Array() ;
        var Ar = new Array();
        var Nr = new Array();
        var data = new Array();
        var c = 0;
          // 
          
             response.forEach(function(e,i){
              T[i] = e.Tel;
              A[i] = e.address;
              N[i] = e.name;
             });
            // A[0] = e.address[0]+e.address[1]+e.address[2];
            // A[1] = e.address[0]+e.address[1]+e.address[2];
        for (var i = 0 ; i < response.length; i++) {
          var A1= A[i][0]+A[i][1]+A[i][2]
          if (req.body.class == A1) {
                Tr[c]=T[i];
                Nr[c]=N[i];
                Ar[c]=A[i];
                c++;
              
              }
        }
        console.log(c);
         for (var i = 0 ; i < c; i++) {
          data[i] = {
            name: Nr[i],
            Tel: Tr[i],
            address: Ar[i]
          }
        }

        console.log(data);
        res.render('apiAns', { data: data});  

        });
 
});
router.get('/apiAns2', function(req, res, next) {
  var db = req.connection;
  var session = req.session;
  
  var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
      if(ip.split(',').length>0){
          ip = ip.split(',')[0];
      }
  var sql = {
    Online: ip
  }
  console.log(sql);
  var data = "";
  db.query('SELECT * FROM membet WHERE ?',sql,function(error, rows){
    //檢查是否有錯誤
    if(error){
        throw error;
    }
    else if(rows.length === 0){
          res.redirect('/Sign-in');
         }
        else {
            db.query('SELECT * FROM registration',function(error, rows2){
                //檢查是否有錯誤
                if(error){
                    throw error;
                }
                else if(rows.length === 0){
                      res.redirect('/Sign-in');
                     }

                else{ 
                      session.login=rows;
                      session.data1=rows2;
            
                     // console.log(req.session.data1);
                      res.render('apiAns2', {data: session.obj}); }

           
         
        });
     }
    });
  
});
router.post('/apiAns2', function(req, res, next) {

  
 
   var db = req.connection;
    var id ;
    var number = 0;
    var each = require('foreach');
    each(req.session.login, function (value, key, array) {
        id = value.id;
        //number = array.length;
   
    });

     each(req.session.data1, function (value, key, array) {
      if (array.length===0) {
        number = 1;
      }
      else{
         number = array.length;
      }
   
    });
      console.log(number);
      number+=1;
     //   console.log(id);
    var sql = {
        Rname: req.body.hname,
        Rtime: req.body.time,
        Rnumber: number,
        RDate: req.body.Date1,
        id: id
    };

    console.log(sql);
    db.query('INSERT INTO registration SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
             res.send('<script>alert("掛號失敗!"); window.location = "/apiAns2"; </script>');
        }
        else{
            res.send('<script>alert("掛號成功!"); window.location = "/"; </script>');
        }
    });
});
router.get('/api2', function(req, res, next) {
var db = req.connection;
  
  var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
      if(ip.split(',').length>0){
          ip = ip.split(',')[0];
      }
  var sql = {
    Online: ip
  }
  var data = "";
  db.query('SELECT * FROM membet WHERE ?',sql,function(error, rows){
    //檢查是否有錯誤
    if(error){
        throw error;
    }
    else if(rows.length === 0){
          res.redirect('/Sign-in');
         }
        else {
            console.log(rows);
            var data = rows;
            session.login=rows;
            res.render('api2');
         
        }
     
    });
 
});
router.post('/api2', function(req, res, next) {
  var getJSON = require('get-json')
    getJSON('https://data.ntpc.gov.tw/od/data/api/DE4CFD62-E977-4C4F-822F-7D2AA65F6E4A?$format=json',function(error, response){

        var T = new Array() ;
        var A = new Array();
        var N = new Array();
        var Tr = new Array() ;
        var Ar = new Array();
        var Nr = new Array();
        var data = new Array();
        var session = req.session;
        var c = 0;
          // 
          console.log(response);
          
             response.forEach(function(e,i){
              T[i] = e.Tel;
              A[i] = e.address;
              N[i] = e.name;
             });
            // A[0] = e.address[0]+e.address[1]+e.address[2];
            // A[1] = e.address[0]+e.address[1]+e.address[2];
        for (var i = 0 ; i < response.length; i++) {
          var A1= A[i][0]+A[i][1]+A[i][2]
          if (req.body.class == A1) {
                Tr[c]=T[i];
                Nr[c]=N[i];
                Ar[c]=A[i];
                c++;
              
              }
        }
        console.log(c);
        if(c == 0){
             res.send('<script>alert("此地區查無動物醫院!"); window.location = "/api2"; </script>');
          }
        else{
          for (var i = 0 ; i < c; i++) {
          data[i] = {
            name: Nr[i],
            Tel: Tr[i],
            address: Ar[i]
          }
        }
        session.obj = data;
       // console.log(data);
        console.log(session);
        
          res.redirect('/apiAns2');
        }
           
         });
 
});


router.get('/', function(req, res, next) {

  var db = req.connection;
  
  var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
      if(ip.split(',').length>0){
          ip = ip.split(',')[0];
      }
  var sql = {
    Online: ip
  }
  var data = "";
  db.query('SELECT * FROM membet WHERE ?',sql,function(error, rows){
    //檢查是否有錯誤
    if(error){
        throw error;
    }
    else {
          console.log(rows);
          var data = rows;
          session.login=rows;
          res.render('index', { data: data});
         
        }
     
    });
});

router.get('/Client', function(req, res, next) {


  var db = req.connection;
  
  var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
      if(ip.split(',').length>0){
          ip = ip.split(',')[0];
      }
  var sql = {
    Online: ip
  }
  var data = new Array();
   var each = require('foreach');
   var id;
   console.log( sql);
    
  db.query('SELECT * FROM membet WHERE ?',sql,function(error, rows){

    //檢查是否有錯誤
    if(error){
        throw error;
    }
    else if(rows.length === 0){
          res.redirect('/Sign-in');
         }
         else {
          each(rows, function (value, key, array) {
            console.log(value.id);
                id = value.id;
             });
                var sql = {
                   id:id
                }
            db.query('SELECT * FROM registration WHERE ?',sql,function(error, rows2){
                //檢查是否有錯誤
                if(error){
                    throw error;
                }
                else{ 
                      session.login=rows;
                      session.data1=rows2;
                      data[0]=session.login;
                      data[1]=session.data1
                     // console.log(req.session.data1);
                      res.render('Client', {data: data}); }

           
         
        });
     }
     
    });
});

router.post('/Client', function(req, res, next) {
           var db = req.connection;
  
            var ip = req.headers['x-real-ip'] ||
                  req.headers['x-forwarded-for'] ||
                  req.socket.remoteAddress || '';
                if(ip.split(',').length>0){
                    ip = ip.split(',')[0];
                }
            var sql = {
              Online: ip
            }
            console.log(sql);
            var data = "";
            db.query('SELECT id FROM membet WHERE ?',sql,function(error, rows){
              //檢查是否有錯誤
              if(error){
                  throw error;
              }
              else if(rows.length === 0){
                 res.redirect('/Sign-in');
               }
                else{
                    console.log(rows);
                    var data = rows;
                    var sql2 = {
                       id: data[0].id
                    }
                    console.log(sql2);
                    db.query('UPDATE membet SET Online = \'1\'  WHERE ?', sql2, function(err, rows) {
                        if (err) {
                            console.log(err);
                            res.redirect('/Sign-in');
                        }
                        else{
                              console.log(rows);
                              res.redirect('/');
                                  
                        }
                    });
                }
              });
            
        });


module.exports = router;
