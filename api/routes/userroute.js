// DEPENDENCIES


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// CHECKAUTH IMPORT
const checkAuth = require('../auth/check-auth');
// MODEL IMPORT

const User = require('../models/user');

//BCRYPT 
const bcrypt = require('bcrypt');
// JSONWEBTOKEN
const jwt = require('jsonwebtoken');







// **************************************************************************
//     HANDLE INCOMING GET REQUEST BY ID      *************************************
// **************************************************************************




router.get('/:userId', checkAuth, (req, res, next) => {
    let userId = req.params.userId;
    let token = req.body.token;


    User.findById(userId)
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json(
                    {
                        message: 'User found!',
                        createdPosts: user.createdPosts,
                        votedPosts: user.votedPosts,
                        userId: user._id,
                        email: user.email,
                        userName: user.userName,
                    }
                );

            }
            else {
                res.status(404).json({ message: 'User not found!' })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error while finding User by ID'
            })
        })
})
// **************************************************************************
//     HANDLE INCOMING PATCH REQUESTS  Created Posts   *************************************
// **************************************************************************

router.patch('/patchusercreated/:userId', checkAuth, (req, res, next) => {
    const userId = req.params.userId;
    const createdPost = req.body.createdPost;

    User.update({ _id: userId }, { $push: { 'createdPosts': createdPost } })
        .exec()
        .then(user => {
            console.log('CreatedPosts succesfully updated!');
            res.status(200).json({
                message: 'CreatedPosts succesfully updated!',

            })
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to update!' })
        })

})




// **************************************************************************
//     HANDLE INCOMING PATCH REQUESTS  Voted Posts    *************************************
// **************************************************************************

router.patch('/patchuservoted/:userId', checkAuth, (req, res, next) => {
    const userId = req.params.userId;
    const votedPost = req.body.votedPost;

    User.update({ _id: userId }, { $push: { 'votedPosts': votedPost } })
        .exec()
        .then(user => {
            console.log('VotedPost succesfully updated!');
            res.status(200).json({
                message: 'VotedPost succesfully updated!',

            })
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to update Voted Posts!' })
        })

})


// **************************************************************************
//     HANDLE INCOMING PATCH REQUESTS DELETE      *************************************
// **************************************************************************

router.patch('/deletepostid/:userId', checkAuth, (req, res, next) => {
    const userId = req.params.userId;
    const postToDelete = req.body.postToDelete;

    User.update({ _id: userId }, { $pull: { 'createdPosts': postToDelete } })
        .exec()
        .then(result => {
            res.status(200).json(result);
            console.log(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})












// **************************************************************************
//     HANDLE INCOMING SIGNUP POST REQUEST      *************************************
// **************************************************************************


router.post('/signup', (req, res, next) => {


    // Check is user Exists with User.findOne() Method

    User.findOne({ email: req.body.email, userName: req.body.userName })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: 'user already exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }

                    else {

                        const NewUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            userName: req.body.userName
                        });

                        NewUser.save()
                            .then(result => {
                                res.status(201).json(result);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                });




            }
        })


});




// **************************************************************************
//     HANDLE INCOMING SIGNIN  REQUEST      *************************************
// **************************************************************************

router.post('/signin', (req, res, next) => {
    // Searches for a User with matching email and password values in the DB
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {

            bcrypt.compare(req.body.password, user.password, (err, response) => {
                if(err){
                    res.status(401).json({
                        message: 'Auth failed!'
                    })
                }
                
                
                if (response) {

                    res.status(200).json({
                        message: 'Valid SignIn !',
                        token: jwt.sign({ email: user.email, userId: user._id }, process.env.Tokenkey, { expiresIn: "1h" }),
                        userId: user._id,
                        email: user.email,
                        userName: user.userName,
                    })

                }

                else {

                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
            });

            //Checks if a user is found and signs a token to constant token 
            

     

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

// **************************************************************************
//     INCOMING DELETE REQUESTS      *************************************
// **************************************************************************

router.delete('/delete/:userId', checkAuth, (req, res, next) => {
    var userId = req.params.userId;

    User.findByIdAndRemove({ _id: userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Account Deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error while deleting User Account'
            })
        })
})









// **************************************************************************
//     Token Verify     *************************************
// **************************************************************************

router.post('/verify', (req, res, next) => {

    var token = req.body.token;

    jwt.verify(token, process.env.Tokenkey, function (err, token) {

        if (err) {
            res.status(401).json({ error: err })
        } else {
            res.status(200).json({ token: token });

        }
    })
})


module.exports = router;



