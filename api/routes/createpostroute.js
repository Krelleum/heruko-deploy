// DEPENDENCIES
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// CHECK-AUTH IMPORT
const checkAuth = require('../auth/check-auth');

// MODEL IMPORT
const PostObj = require('../models/postobj');








// Handle incoming Post requests


router.post('/', checkAuth, (req, res, next) => {


    const createPost = new PostObj({
        _id: new mongoose.Types.ObjectId(),
        post: req.body.post,
        author: req.body.author,
        authorusername: req.body.authorusername,
        imagePath: req.body.imagePath,
        imageId: req.body.imageId,
        
    });

    createPost.save()
        .then(result => {
                       
            res.status(201).json({
                message: 'Post Succesful - Product Created!',
                createdProduct: {
                    post: result.post,
                    _id: result._id,
                    
                }
                
            });
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});









// **************************************************************************
//     HANDLE INCOMING GET REQUEST ALL     *************************************
// **************************************************************************
router.get('/', (req, res, next) => {
    PostObj.find()
        .select('-__v')
        .sort({time: -1})
        .limit(6)
        .exec()
        .then(result => {
           
            const partresponse = result;
            
            const response =
                partresponse.map(resultdata => {
                    
                    return {
                        post: resultdata.post,
                        _id: resultdata._id,
                        votedBy: resultdata.votedBy,
                        time: resultdata.time,
                        author: resultdata.author,
                        authorusername: resultdata.authorusername,
                        imagePath: resultdata.imagePath,
                        imageId: resultdata.imageId,
                    }
                })
            

            res.status(200).json(response);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});

// **************************************************************************
//     HANDLE INCOMING GET REQUEST WITH OFFSET    *************************************
// **************************************************************************

router.get('/offset/:offset', (req, res, next) => {
    
    const offset = req.params.offset

    PostObj.find()
        .select('-__v') 
        .sort({ time: -1 })
        .limit(Number(offset))
        .exec()
        .then(result => {

            const partresponse = result;

            const response =
                partresponse.map(resultdata => {
                    
                    return {
                        post: resultdata.post,
                        _id: resultdata._id,
                        votedBy: resultdata.votedBy,
                        time: resultdata.time,
                        author: resultdata.author,
                        authorusername: resultdata.authorusername,
                        imagePath: resultdata.imagePath,
                        imageId: resultdata.imageId,

                    }
                })


            res.status(200).json(response);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});






// **************************************************************************
//     SEARCH FOR POST  *************************************
// **************************************************************************

router.get('/search/:searchquery', (req, res, next) => {
    
    const searchQuery= decodeURI(req.params.searchquery);
    console.log(searchQuery);
    PostObj.find({$text: {$search: searchQuery}})
    .sort({time: -1})
    .exec()
    
    .then(result => {
        
        res.status(200).json(result);

    
    })
    .catch(err => {
        res.status(500).json(err);
    })
})





// **************************************************************************
//     DELETE POST BY ID  *************************************
// **************************************************************************

router.delete('/deletepost/:postId', checkAuth, (req, res, next) => {
    const postId = req.params.postId;
    
    PostObj.findOneAndRemove({_id: postId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'POST DELETED'
        })
    })
        .catch(err => {
            res.status(500).json(err)
        })
})




// **************************************************************************
//     HANDLE INCOMING GET REQUEST BY ID     *************************************
// **************************************************************************


router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;
    
    PostObj.findById(id)
        .select('-__v')
        .exec()
        .then(result => {
            
            res.status(200).json({post:result});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        })
});









// **************************************************************************
//     INCREMENT YES BUTTON PER ID      *************************************
// **************************************************************************

router.patch('/:postId/yes', checkAuth, (req, res, next) => {
    const id = req.params.postId;
    const userId = req.body.userId;
    

   

    PostObj.update({ _id: id }, { $inc: { "posResponses": 1, "allResponses": 1 }})
        .exec()
    
    PostObj.update({ _id: id }, {$push: { "votedYes": userId }})
    .exec()    

    PostObj.update({ _id: id }, {$push: { "votedBy": userId }})
        .exec()
        .then(result => {
            
            res.status(200).json({
                message: 'Product succesfully updated!',
               
            });
        })
        .catch(err => {
            
            res.status(500).json({
                error: err
            })
        })     
    
});






// **************************************************************************
//     INCREMENT NO BUTTON PER ID    and Add VotedBy  *************************************
// **************************************************************************

router.patch('/:postId/no', checkAuth, (req, res, next) => {
    const id = req.params.postId;
    const userId = req.body.userId;



    PostObj.update({ _id: id }, { $inc: { "negResponses": 1, "allResponses": 1 } })
        .exec()

    PostObj.update({ _id: id }, {$push: { "votedNo": userId }})
        .exec()

    PostObj.update({ _id: id }, {$push: { "votedBy": userId }})
        .exec()
        .then(result => {
            
            res.status(200).json({
                message: 'Product succesfully updated!',
               
            });
        })
        .catch(err => {
            
            res.status(500).json({
                error: err
            })
        })     
        
        


});















module.exports = router;