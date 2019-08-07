const express = require('express');

const router = express.Router();

const Post = require('../models/Post');


//Gets back the posts
router.get('/', async (req,res)=> {
  try{
      const posts = await Post.find();
  } catch(err){
    res.json({message:err});
  }
});


//Submits a post
router.post('/', async (req,res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

try {
    const savedPost = await post.save();
    res.json(savedPost);
}
catch(err) {
  res.json({message:err});
}
});

//Specific posts
router.get('/:postId', async (req,res) => {
  try {
      const post =  await Post.findById(res.params.postId);
      res.json(post);
}
  catch(err) {
  res.json({message: err});
}
});

//Deleting a posts
router.delete('/:postId', async (req,res) => {
try {
  const removedPost = await Post.remove({_id: req.params.postId})
  res.json(removedPost);
} catch(err)
{
  res.json({message: err});
}
});

//Updating a post
router.patch('/:postId', async(req,res) =>{
try{
  const updatedPost = await Post.updateOne(
    {_id:req.params.postId},
    {$set: {title: req.body.title}}
  );
  res.json(updatedPost);
}  catch(err) {
  res.json({ message: err});
}
});
module.exports = router;
