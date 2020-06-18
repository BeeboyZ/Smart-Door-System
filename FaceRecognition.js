var AWS = require('aws-sdk');
var awsIot = require('aws-iot-device-sdk');
var imgidx;
var auth;


AWS.config.region = '';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};

var faceRecogSys = awsIot.device({
    keyPath: "",
    certPath: "",
    caPath: "",
    clientId: "FaceRecognition",
    host: ""
});

 var s3 = new AWS.S3({ 
    "accessKeyId": "",
    "secretAccessKey": ""
 });

 
AWS.config.update({
    "accessKeyId": "",
    "secretAccessKey": ""
})
var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});

function check(){
    // Object Retrieval Request Parameters

    const db_params1 = {
        SimilarityThreshold:90,
        SourceImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'visitor.png',
            }
        },
        TargetImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'chapman.png',
            }
        }
        
    };
    const db_params2 = {
        SimilarityThreshold:90,
        SourceImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'visitor.png',
            }
        },
        TargetImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'cole.png',
            }
        }
        
    };
    const db_params3 = {
        SimilarityThreshold:90,
        SourceImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'visitor.png',
            }
        },
        TargetImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'judge.png',
            }
        }
        
    };
    const db_params4 = {
        SimilarityThreshold:90,
        SourceImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'visitor.png',
            }
        },
        TargetImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'stanton.png',
            }
        }
        
    };
    const db_params5 = {
        SimilarityThreshold:90,
        SourceImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'visitor.png',
            }
        },
        TargetImage:{
            S3Object:{
                Bucket: "2020-cit-sda-db",
                Name: 'torres.png',
            }
        }
        
    }
    
    auth = 0;
    
    rekognition.compareFaces(db_params1,function(err,data){
        if (err) console.log(err, err.stack);
        else{
            try{
                if(data.FaceMatches[0].Similarity>90){
                    //console.log("Welcome back Mr.Chapman");
                    //console.log("Door Opened");
                    auth = 1;
                    imgidx=0;
                }
            }
            catch (e){
            }
        }
    });

    rekognition.compareFaces(db_params2,function(err,data){
        if (err) console.log(err, err.stack);
        else{
            try{
                if(data.FaceMatches[0].Similarity>90){
                    //console.log("Welcome back Mr.Cole");
                    //console.log("Door Opened");
                    auth = 1;
                    imgidx=1;
                }
            }
            catch (e){
            }
        }
    });
    

    rekognition.compareFaces(db_params3,function(err,data){
        if (err) console.log(err, err.stack);
        else{
            try{
                if(data.FaceMatches[0].Similarity>90){
                    //console.log("Welcome back Mr.Judge");
                    //console.log("Door Opened");
                    auth = 1;
                    imgidx=2;
                }
            }
            catch (e){
            }
        }
    });

    rekognition.compareFaces(db_params4,function(err,data){
        if (err) console.log(err, err.stack);
        else{
            try{
                if(data.FaceMatches[0].Similarity>90){
                    //console.log("Welcome back Mr.Stanton");
                    //console.log("Door Opened");
                    auth = 1;
                    imgidx=3;
                }
            }
            catch (e){
            }
        }
    });

    rekognition.compareFaces(db_params5,function(err,data){
        if (err) console.log(err, err.stack);
        else{
            try{
                if(data.FaceMatches[0].Similarity>90){
                    //console.log("Welcome back Mr.Torres");
                    //console.log("Door Opened");
                    auth = 1;
                    imgidx=4;
                }
            }
            catch (e){
            }
        }
    });
}
    
    /*
    if (auth==false){
        console.log("Unauthorized Visitor");
    }
    */

    faceRecogSys.on('connect', function () {
        console.log('Face Recognition System connected');
        faceRecogSys.subscribe('faceRecog/request', function () {
            console.log('subscribing to the topic faceRecog/request !');
        });


        var registeredImage = ['Mr.Chapman', 'Mr.Cole', 'Mr.Judge', 'Mr.Stanton', 'Mr.Torres'];
        faceRecogSys.on('message', function (topic, message) {
            console.log('Request:', message.toString());
            if (topic != 'faceRecog/request') return;
            check();
            var req = JSON.parse(message.toString());
            var id = registeredImage[imgidx];
            console.log(auth);
            if (auth==1) {
                faceRecogSys.publish(req.notify, JSON.stringify({'image': req.image,'command': 'unlock' }));
            } else {
                faceRecogSys.publish(req.notify, JSON.stringify({'image': req.image,'command': 'reject' }));
            }
        })
    });
    
