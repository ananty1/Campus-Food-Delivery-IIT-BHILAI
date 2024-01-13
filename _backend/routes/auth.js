const express = require("express");

const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET='anant'



// Route:1 Create a user using: POST REQUEST ,dosn't require auth/No login requried
router.post('/createuser',[
    body('username','Enter a unique Username').isLength({min: 5}),
    body('name','Enter a Valid Name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password size should at least be 3').isLength({min:3})
], async (req,res)=>{
    const result = validationResult(req);
    let success = true;

    // Handling Bad Request here
    if (!result.isEmpty()) {
        // return res.send(`Hello, ${req.query.person}!`);
        success= false;
        res.status(400).send({ success,errors: result.array() });
    }

    // Check whether it's a unique email or unique username
    try{
    let user = await User.findOne({username:req.body.username})
    if(user){
        success=false;
        return res.status(400).json({success,error:"Sorry the username is already chosen"})
    }
    user = await User.findOne({email:req.body.email})
    if(user){
        success = false;
        return res.status(400).json({success,error:"Sorry there is already any account with this email."})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        username: req.body.username,
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })

    // We planned to send the token to user to authorize
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    // console.log(authToken);
    res.json({success,authtoken});
    }
    catch(error){
        console.log(error);
        success  = false;
        res.status(500).send(success,"Some Error Occurred, Retry after a time");
    }
    
})

// Route2: authenticate user using: POST REQUEST ,dosn't require auth/No login requried
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be blank').notEmpty(),
    // body('username','Enter a unique Username').isLength({min: 5}),
], async (req,res)=>{
    const result = validationResult(req);
    let success =true;
    // Handling Bad Request here
    if (!result.isEmpty()) {
        // return res.send(`Hello, ${req.query.person}!`);
        success=false;
        return res.status(400).send({success, errors: result.array() });
    }

    // Valid email and password
    const {email,password}= req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error: "Sorry no email found"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error: "Sorry !! Wrong Password"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        // console.log(authToken);
        res.json({success,authToken});


    }
    catch(error){
        console.log(error);
        success=false;
        res.status(500).send(success,"Internal Server Error ,Some Error Occurred, Retry after a time");
    }
    
})

// Route3: Getting logged in user details 
router.post('/getuser',fetchuser, async (req,res)=>{
    try {
        const user_id = req.user.id;
        const user = await User.findById(user_id).select("-password");
    
        res.status(200).send(user);
    } catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error ,Some Error Occurred, Retry after a time");
    }
    
    
})


module.exports = router