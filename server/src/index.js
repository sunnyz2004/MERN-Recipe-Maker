import express from 'express'; // framework to create our api
import cors from 'cors'; // library to establish rules b/w frontend and backend
import mongoose from 'mongoose'; // allow us to write queries in the database

import { userRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'


const app = express() // create a version of our api (variable is initialized as an instance of the Express object)

app.use(express.json()) // when you send data from the frontend, it converts it into a json
app.use(cors()) // solves issues when making api requests from the frontend
app.use("/auth", userRouter) // means that the application should use the userRouter middleware for any incoming requests that start with the path /auth.
app.use("/recipes", recipesRouter)
mongoose.connect("mongodb+srv://sunnyz:MERNpassword123@recipes.v8b06rn.mongodb.net/?retryWrites=true&w=majority") // connects to the mongodb

app.listen(3001, () => console.log("server started!")) // call back function called when the api is running