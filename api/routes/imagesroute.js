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



// MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
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


    sharp(req.file.path)
        .resize(300)
        .max()
        .jpeg({quality: 90})
        .toBuffer(function (err, buffer) {
            fs.writeFile('./tmp/' + req.file.originalname, buffer, function(err){})
            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg
        })




    const createImage = new Image({
        _id: new mongoose.Types.ObjectId(),
        image: req.file.path,

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
