{/*
    This file contains backend part of the application 
    1. Firstly imported necessary modules
    2. Used middlewares to handle the user specific requests to user api
    3. handled cors error
    4. connected to mongodb using mongodb client
    5. Connected to task rabbit database and setted all its collections in order to make it used by userapi    
*/}


//express
const exp=require('express')
const app=exp()
app.listen(4900,()=>console.log("Server is listening at port 4900...."))

//userApi
const userApp=require('./APIs/UserApi')
app.use('/user',userApp)

//handling cors error
const cors=require('cors')
app.use(cors())


//mongodb connection
const mclient=require('mongodb').MongoClient
mclient.connect('mongodb://127.0.0.1:27017/')
.then((dbRef)=>{
    const dbObj=dbRef.db('taskrabbit')
    const userscollection=dbObj.collection('userscollection')
    app.set('userscollection',userscollection)
    console.log("DB connected succesfully...")
})
.catch((err)=>{
    console.log(err)
})
