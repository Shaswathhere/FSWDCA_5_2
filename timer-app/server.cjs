const bodyParser = require('body-parser')
const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const {Connect, isConnected} = require('./db.cjs')
const User = require('./user.model.cjs')
const cors = require('cors')

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

Connect()
app.get('/', (req, res)=>{
    const status = `${isConnected ? 'Connected' : 'Disconnnected'}`
    res.send(status)
})

app.get('/get',async(req, res)=>{
    try{
        const user = await User.find()
        res.send(user)
    } catch(err){
        console.log(err)
        res.status(500).json({Error: 'Something went wrong'})
    }
})

app.post('/add', async(req, res)=>{
    try{
        const newUser = await User.create(req.body)
        res.send(newUser)
    } catch(err){
        console.log(err)
        res.status(500).json({Error: 'Something went wrong'})
    }
})

mongoose.connection.once('open', ()=>{
    console.log("Connected to mongoDB")
    if (require.main === module) {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    } else {
        console.log("error");
    }
})