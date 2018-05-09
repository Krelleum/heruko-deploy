const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const resize = require('../resizer/resizer');

// CHECKAUTH IMPORT
const checkAuth = require('../auth/check-auth');

// MODEL IMPORT
const Image = require('../models/images');

// Cloudinary
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_key,
    api_secret: process.env.cloud_secret,
})

// MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '/tmp/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage});


// **************************************************************************
//     HANDLE INCOMING IMAGE POST REQUEST     *************************************
// **************************************************************************


router.post('/', checkAuth, upload.single('file'),(req, res, next) =>{
    
    let url;

    cloudinary.v2.uploader.upload(req.file.path, function (error, result) { 
            if(error){
                res.status(500).json({ error: error });
            }
            else{
                res.status(201).json({result});
                console.log(result);
                url = result.url
            }
            
        });




    const createImage = new Image({
        _id: new mongoose.Types.ObjectId(),
        image: url,

    });


createImage.save()



    .then(result => {
        res.status(201).json({
            result: result,
            message: 'Image Created'
        })

    })
    .catch(err => {
        res.status(500).json({error: err});
    })
})

// **************************************************************************
//     HANDLE DELETE IMAGE POST REQUEST     *************************************
// **************************************************************************

// Handles Delete from Database
router.delete('/delete', checkAuth, (req, res, next) => {
    console.log(req.body.imagePath);
    console.log(req.body.imageId);
    Image.findOneAndRemove({_id: req.body.imageId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'imageID was removed from DB'
        })
    }).catch(err => {
        res.status(500).json({
            message: 'unable to delete Image'
        })
    });

// Handles Delete from Disk via FileSystem(FS)
    fs.unlink(req.body.imagePath, () => {
        return null
    })

});







module.exports = router;
