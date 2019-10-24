const express = require('express');
const router = express.Router();

//Load in the mongoose models 
const { Post } = require('../database/models');


/**
 * GET /posts
 * Purpose: Get alls the posts 
 */
router.get('/', (req,res) => {
    // Returns an aray of all the posts in the database
    Post.find({}).then((posts) =>  {
        res.send(posts);
    }).catch((e) => {
        res.send(e);
    });
});

/**
 * POST /posts
 * Purpose: Create a post
 */
router.post('/', (req,res) => {
    // Create a new post and returns the new post document back to the user
    let title = req.body.title;

    let newPost = new Post({
        title
    });
    newPost.save().then((listDoc) => {
        res.send(listDoc);
    }) 
});

/**
 * PATCH /list/:id
 * Purpose: update a specific post
 */
router.patch('/:id', (req,res) => {
    // Update the specified post (post document with id in the URL) with the new values specified in the JSON body of the request
    Post.findOneAndUpdate({_id:req.params.id}, {
        $set: req.body
    }).then(() => {
    res.sendStatus(200)
    });
});

/**
 * DELETE /posts/:id
 * Purpose: delete a specific post
 */

router.delete('/:id', (req,res) => {
    // Deletes the specified post document with the id in the url)
    Post.findOneAndRemove({_id:req.params.id}).then((removedListDoc)=> {
        res.send(removedListDoc);
    })
});

module.exports = router;