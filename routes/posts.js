const router = require('express').Router();
const Post = require('../model/post');
const Joi = require('joi');


    router.get('/posts',async (req,res)=>{

        try{

        let posts=  await Post.find();

             res.json({
                response : posts
            });
        }
        catch(e){
            console.log("Error",e);
            res.json({
               response : "Error Occurred"     
            });
        }

    });

    router.post('/post',async(req,res) => {
        console.log("req body",req.body);
        const validationSchema = Joi.object().keys({
            name : Joi.string().required(),
            avatar : Joi.string().required(),
            description : Joi.string().required()   
        })

        const { error } = Joi.validate(req.body,validationSchema);

        if(error){

            res.status(400).send({
                response : error
            })

        }
        else{

            try{

                let post = new Post();

                post.name = req.body.name;
                post.avatar = req.body.avatar;
                post.description = req.body.description;
                post.upvotes = 0;

                await post.save(post);

                
                res.status(200).send({
                    response : "Saved Successfully"
                });

            }
            catch(e){
                console.log("Error",e);
                res.status(500).send({
                    response : "Error Occurred"     
                 })

            }

        }
    });

    router.post('/post/upvote',async (req,res) => {

        const validationSchema = Joi.object().keys({
            post_id : Joi.string().required()
        })

        const { error } = Joi.validate(req.body,validationSchema);

        if(error){

            res.status(400).send({
                response : error
            });

        }
        else{

            try{

                let posts = await Post.update({ _id : req.body.post_id },{ 
                 $inc : { upvotes :1 }
                 });

                
                res.status(200).send({
                    response : posts
                })

            }
            catch(e){
                console.log("Error",e);
                res.status(500).send({
                    response : "Error Occurred"     
                 })

            }
        }
    });


module.exports = router;

