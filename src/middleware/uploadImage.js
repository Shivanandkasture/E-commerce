const multer = require('multer')
const path= require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueName = `${Date.now()}-${(file.originalname)}`
      cb(null,uniqueName)
    }
  })
  
   const upload = multer({ storage: storage }).array('imageUrl',6)

   module.exports.upload = upload