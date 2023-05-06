import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { Auth } from "./pages/auth"
import { CreateRecipe } from "./pages/create-recipe"
import { SavedRecipes } from "./pages/saved-recipes"
import { Navbar } from "./components/navbar"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/auth" element={<Auth />} />
          <Route path = "/create-recipe" element={<CreateRecipe />} />
          <Route path = "/saved-recipes" element={<SavedRecipes />} />

        </Routes>
      </Router>
    </div>
  );
}


/*Each Route component specifies its own path prop and an element prop that specifies the component that
should be rendered when the route matches. In this case, the element prop is set to the respective component
that should be rendered.

In the example code you provided, each Route component has a path prop that defines the URL path for the route
 and an element prop that specifies the component that should be rendered when the URL path matches the path prop.
*/ 

export default App;
