import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

// other parts of the codebase can import and use this router to define HTTP endpoints for handling user-related requests.
const router = express.Router()


/*When a POST request is made to this endpoint, the request object (req) will contain data sent from the client-side as the request body.
 This data contains the username and password fields which are being destructured from the request body using the
syntax const { username, password } = req.body.

The code then uses the UserModel imported from the "../models/Users.js" file to search for a 
user with the same username as the one sent in the request body using the findOne() method. findOne() 
is an asynchronous method that returns a promise and accepts a query object as an argument.
*/

router.post("/register", async(req, res) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({username : username}) // should use async, await notation, check if there's already this user in the db

    if (user) { // if it is already inside the database
        return res.json({message: "User already exists!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10) // create a hashed version of the password 
    const newUser = new UserModel({ username, password: hashedPassword}) // adding user to data base
    await newUser.save()

    res.json({ message: "User Registered Successfully!" }); // if user is added to the db successfully (passed in message object)
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({username})

    if (!user){
        return res.json ({ message: "User doesn't exist!" })
    }

    // check that the user's pw matches with the pw in the db

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {//not true
        return res.json({message: "Username or Password is incorrect!"})
    }

    const token = jwt.sign({id: user._id } , "secret") // create a token using jwt webtool (the _ is a naming conv for private properties)
    res.json({token, userID: user._id}) // The code then sends a response to the client with a JSON object containing the token and the user's _id value.

})

export {router as userRouter}