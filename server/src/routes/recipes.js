import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import express from 'express'
import mongoose from "mongoose";

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const response = await RecipesModel.find({}) // retrieve all documents from the "recipes" collection in a MongoDB database using the Mongoose ORM.
        res.json(response); // send it back to frontend
    } catch (err) {
        res.json(err)
    }
})

router.post("/", async (req, res) => {
    const recipe = new RecipesModel({
        _id :new mongoose.Types.ObjectId(), 
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner,
    })

    console.log(recipe) 
    try {
        const result = await recipe.save()
        res.json({
            createdRecipe : {
                name : result.name,
                ingredients : result.ingredients,
                instructions : result.instructions,
                _id : result._id,
            }
        })

    }catch (err) {
        res.json(err)
    }
})

router.put("/", async (req, res) => { // creating a new recipe

     try {
        const recipe = await RecipesModel.findById(req.body.recipeID)//It first retrieves the recipe 
        const user = await UserModel.findById(req.body.userID) // and user by their respective IDs from the request body.
        user.savedRecipes.push(recipe) // adds the recipe to the user's savedRecipes array
        await user.save()        
        res.json({savedRecipes: user.savedRecipes}); // send it back to frontend
    } catch (err) {
        res.json(err)
    }
})
// So, the this router returns an array of IDs, 
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID) // find user
        res.json({savedRecipes: user?.savedRecipes}) // return the saved recipes of the user
    } catch (err){
        res.json(err)
    }
})
// while the last router returns an array of full recipe documents.
router.get("/savedRecipes", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID) // find user
        const savedRecipes = await RecipesModel.find({ // grab the saved recipes where their ids are in their list of saved recipes
            _id: { $in: user.savedRecipes },
        })
        res.json({ savedRecipes }) // return the saved recipes of the user
    } catch (err){
        res.json(err)
    }
})
export { router as recipesRouter}