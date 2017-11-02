var express = require('express');
var fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

router.get('/found', function(req, res, next) {
  res.sendFile('found.html', { root:  'public' });
});

router.get('/notfound', function(req, res, next) {
  res.sendFile('notfound.html', { root:  'public' });
});

router.get('/getpass',function(req,res,next) {
    console.log("In passwords route");
    fs.readFile(__dirname + '/passwords.txt',function(err,data) {
      if(err) throw err;
        var search = req.query.q.toString();
        //console.log(search);
      var passwords = data.toString().split("\n");
        //console.log("Success storing passwords");
        var myRe = new RegExp("\\b" + req.query.q + "\\b");
        //console.log(myRe);
        var jsonresult = [];
        var found = false;
        for(var i = 0; i < passwords.length; i++) {
            var result = passwords[i].search(myRe);
            if(result != -1) {
             // console.log(passwords[i]);
                //console.log("Password Found!");
                jsonresult.push({password:passwords[i]});
                found = true;
            }
          }
        if (found){
            res.redirect('/found');
        } else {
            res.redirect('/notfound');
        }
    });
    //res.sendFile('passwords.txt', { root:  'routes' });
    
  });

module.exports = router;
