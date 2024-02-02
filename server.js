const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

// app.get('/', (req,res) => {
//     res.json({message: 'default'})
// })

app.listen(port, () => console.log(`Server started on port ${port}`))
