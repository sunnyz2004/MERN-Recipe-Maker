import { useState, useEffect } from "react"
import axios from 'axios'
import { userGetUserID } from "../hooks/useGetUserID"

export const Home = () => {
    const [recipes, setRecipes] = useState([])
    const userID = userGetUserID()
    const [savedRecipes, setSavedRecipes] = useState([])

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes") // get response from the recipes and store the data to the recipes
                setRecipes(response.data) 
            } catch (err){
                console.error(err )
            }
        }
        fetchRecipe()

    },[])


    const fetchRecipe = async () => {
        try {
            const response = await axios.get("http://localhost:3001/recipes/savedRecipes/ids") // get response  from the recipes and store the data to the recipes
            setSavedRecipes(response.data) 
            console.log(response.data)
        } catch (err){
            console.error(err )
        }
    }
    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID}) // get response from the recipes and store the data to the recipes
            setSavedRecipes(response.data.savedRecipes)
            console.log(response) 
        } catch (err){
            console.error(err )
        }
    } 
    const isRecipeSaved = (id) => 
        savedRecipes.includes(id)

    return <div>
        <h1>Recipes</h1>
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe._id}>
                    <div>
                        <h2>
                            {recipe.name}
                        </h2>
                        <button onClick={() => saveRecipe(recipe._id)}> {isRecipeSaved(recipe._id)? "saved" : "save"}</button> 
                    </div>
                    <div className="instructions">
                        <p> {recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name}/>
                    <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
                </li>
            ))}
        </ul>
    </div>
}