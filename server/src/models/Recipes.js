// tell mongo how this user's collection will look like
import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({ // schema is an object that defines the structure of data

    name: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true}],// array of ingredients (multiple)
    
    instructions: { type: String, required: true},
    imageUrl: { type: String, required: true},
    cookingTime: { type: Number, required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true} // reference to the users collection
    }
);
 
export const RecipesModel = mongoose.model("recipes", RecipeSchema ) // the name of the collection in the database (in this case, "recipes")
