import { useState } from "react"
import axios from 'axios'
import { userGetUserID } from "../hooks/useGetUserID"
import '/Users/Mrez/mern-recipe-app/client/src/pages/create-recipe.css'
import { useNavigate } from "react-router-dom"


export const CreateRecipe = () => {
    const userID = userGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,

    })

    const navigate = useNavigate()

    
    const handleChange = (event) => {
        const {name, value} = event.target
        setRecipe({...recipe, [name]: value})// set to recipe was, but there will be a new value for the name
    }
    const handleIngredientChange = (event, idx) => {
        const {value} = event.target
        const ingredients = [...recipe.ingredients] // making a copy of the list
        ingredients[idx] = value
        setRecipe({...recipe, ingredients: ingredients})// set recipe with the new ingredient
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]}) // anything after the comma is what changes in the object
        // whatever the ingred list before plus the new ""
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", {...recipe})
            alert("Recipe Created!")
            navigate("/")
        } catch (err){
            console.error(err)
        }
    }

    return (
        <div className="create-recipe">
            <h2 id="create-recipe"> Create Recipe:</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name </label>  
                <input type="text" id="name" name = "name" onChange={handleChange} /> 

                <label htmlFor="ingredients">Ingredients </label>  
                {recipe.ingredients.map((ingredient, idx) => ( // mapping out the new ingred. to the list
                    <input 
                    id="new-ingred"
                    key={idx} 
                    type = "text" 
                    name="ingredients" 
                    value={ingredient} 
                    onChange={(event) => handleIngredientChange (event, idx)}
                    />
                ))}
                <button onClick={addIngredient} type="button" id="add-ingred-button"> Add Ingredient</button>
                <label htmlFor="instructions">Instructions </label>  


                <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

                <label htmlFor="imageUrl">Image URL </label>  
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
                <label htmlFor="cookingTime">Cooking Time </label>  
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>

                <button type="submit" id="add-recipe"> Add Recipe</button>

            </form>
        </div>
    )
}
