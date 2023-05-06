// tell mongo how this user's collection will look like
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ // schema is an object that defines the structure of data

    username: {type: String, requried: true, unique: true},
    password: {type: String, requried: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}]
});

export const UserModel = mongoose.model("users", UserSchema ) // the name of the collection in the database (in this case, "users")

// In the context of the Mongoose library for MongoDB, a schema defines the structure of a collection of documents in the database, 
// while a model is a wrapper around that schema that allows for querying and manipulating the documents in the database. 
// So, a schema is a blueprint that defines the structure of data and a model is a programming interface used to interact with the data 
// that adheres to the schema.




