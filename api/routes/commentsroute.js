// Dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//  CHECKAUTH IMPORT

const checkAuth = require('../auth/check-auth');

// Model Import

const Comment = require('../models/comments.js');



// Requests

// **************************************************************************
//     HANDLE INCOMING POST REQUESTS      *************************************
// **************************************************************************



router.post('/createcomment/:postId', checkAuth, (req, res, next) => {
    
    const reqPostId = req.body.postId;
    const reqUserId = req.body.userId;
    const reqPostAuthor = req.body.postAuthor;
    const reqComment = req.body.comment;
    const reqCommentAuthor = req.body.commentAuthor;

    const createComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        postId: reqPostId,
        userId: reqUserId,
        postAuthor: reqPostAuthor,
        comment: reqComment,
        commentAuthor: reqCommentAuthor,
    });

    createComment.save()
        .then(result => {
            res.status(201).json({
                message: 'Comment Created',
            })
        })
        .catch(err =>{
            res.status(500).json({
                message: 'Error while Creating Comment!'
            })
        })
});


// **************************************************************************
//     HANDLE INCOMING Get REQUESTS      *************************************
// **************************************************************************

router.get('/getcomment/:postId', (req, res, next) => {
    const reqPostId = req.params.postId;
   
    Comment.find({'postId': reqPostId})
    .sort({time: 1})
    .limit(10)
    .exec()
    .then(result => {
        
        res.status(200).json(result);
     })
    .catch(err => {
        res.status(500).json({message: 'error while getting Comments'});
    })
})

// **************************************************************************
//     HANDLE INCOMING DELETE REQUESTS      *************************************
// **************************************************************************

router.delete('/deletecomment/:postId', checkAuth, (req, res, next) => {
    const reqPostId = req.params.postId;

    Comment.remove({'postId': reqPostId})
    .exec()
    .then(response => {
        res.status(200).json({
            message: 'Comments Deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'error while deleting Comments'
        })
    })
})




module.exports = router;