var express = require('express');
var router = express.Router();
var admin  = require("firebase-admin");
var serviceAccount = require("./firstcloudmessaging-firebase-adminsdk-410h2-0189f80b03.json");

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
    databaseURL:"https://firstcloudmessaging.firebaseio.com/"
});

var registrationtoken = "c1CTwn9JKOc:APA91bHH2Uk5e-I8nFQfYQFUjVEwD7HMzef6gfePMq9CAZtC9kbo429AS3Wfy1Y0JlVlwA5uvDcJJzECJqZrqYvm0HnwMKgUoQjffcHu1P2nDvrODXh61dT5zH0smaERFfkkfvN1evld";

/*post*/

router.post('/',function(req,res,next){
    var payload = {
        notification:{
            title:req.body.title,
            content:req.body.content
        },
        data:{
            mkey:"hello"
        }
    };
    
    var option = {
        priority:"high",
        timeToLive:60*60*24
    };

    var status;
    
    admin.messaging().sendToTopic(req.body.topic,payload,option)
        .then(function(response){
            if(response.messageId>0){
                status = "berhasil";
            }else{
                status = "gagal";
            }
        res.render('index', { title: 'Realtime kirim notif ke android',pesan:status });
        }).catch(function(error){
            console.log(error);
        });

});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Realtime kirim notif ke android' });
});

module.exports = router;
