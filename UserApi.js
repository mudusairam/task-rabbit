{/* 
    This file is to handle the user registration and updation
*/}

//imported necessary modules
let exp=require('express')
let userApp=exp.Router()
let expressAsyncHandler=require('express-async-handler')
let bcryptjs=require('bcryptjs')

//handling cors error
let cors=require('cors')
userApp.use(cors())

{/*
    In the registration process following steps are performed
    1. Used middleware to parse the json data
    2. Got the collection from request object
    3. Firstly checked if the user already exists or not
    4. If already registered then sending a message that already registered
    5. If not then I hashed the password using bcryptjs module
    6. Updated the hashed password in the ouser object
    7. Upon sucessfull registration sending acknowledgement to user
*/}
userApp.use(exp.json())
userApp.post('/register',expressAsyncHandler(async(request,response)=>{
    const userscollection=request.app.get('userscollection')
    const userObj=request.body
    const userOfDb=await userscollection.findOne({username:userObj.username})
    if(userOfDb!=null)
    {
        response.send({message:"User already exists"})
    }
    else{
        //hashing the password
        const hashedPassword=await bcryptjs.hash(userObj.password,5)
        userObj.password=hashedPassword
        await userscollection.insertOne(userObj)
        response.status(201).send({message:"Registered successfully"})
    }
}))


{/*
    Update api check for if user exists or not then update the details accordingly
*/}
//api update profile
userApp.use(exp.json())
userApp.post('/update',expressAsyncHandler(async(request,response)=>{
    const userscollection=request.app.get('userscollection')
    const userObj=request.body
    const userOfDb=await userscollection.findOne({username:userObj.username})
    if(userOfDb!=null)
    {
        await userscollection.updateOne({username:userObj.username},{$set:{email:userObj.email}})
        response.status(201).send({message:"Updated successfully"})
    }
    else{
        response.send({message:"User not found"})
    }
}))

module.exports=userApp