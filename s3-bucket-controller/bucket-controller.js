const AWS = require('aws-sdk');
require('dotenv').config()

//==================================================================



const s3 =  new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
});


module.exports = (buffer,name)=>{
    
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: name,
        Body: buffer
    }

    s3.upload(params,(err,data)=>{
        
        if(err)
            return Promise.reject({error:err});
        else
            return  Promise.resolve({path:data.Location, name:data.Key});
        
        
    })
};

