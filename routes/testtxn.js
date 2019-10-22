var checksum = require('../model/checksum');
var config = require('../config/config');
module.exports = function (app) {
     app.get('/testtxn', function(req,res){
         res.render('testtxn.ejs',{'config' : config});
     });
     app.post('/testtxn',function(req, res) {
        console.log("POST Order start");
        var paramlist = req.body;
        var paramarray = new Array();
        console.log(paramlist);
        for (name in paramlist)
        {
            if (name == 'PAYTM_MERCHANT_KEY') {
               var PAYTM_MERCHANT_KEY = paramlist[name] ;
            }
            else{
                    paramarray[name] = paramlist[name] ;
            }
        }
        paramarray['CALLBACK_URL'] = 'http://127.0.0.1:3000/response';  // in case if you want to send callback        console.log(PAYTM_MERCHANT_KEY);
        console.log(paramarray);
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result)
        {
            // console.log(result);
            res.render('pgredirect.ejs',{ 'restdata' : result,'params' : paramlist });
        });
        console.log("POST Order end");
     });
};