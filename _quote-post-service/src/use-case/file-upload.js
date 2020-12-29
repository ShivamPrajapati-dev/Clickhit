module.exports = function makeFileUpload(){
    return function fileUpload({multer,multerS3,uuidv4,s3,path}){
        
        var upload = multer({
            storage: multerS3({
              s3: s3,
              bucket: process.env.BUCKET_NAME,
              acl: 'public-read',
              metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
              },
              key: function (req, file, cb) {
                  req.filename = uuidv4() + path.extname(file.originalname);
                cb(null, req.filename);
              }
            })
          });
          return upload;
    }
}