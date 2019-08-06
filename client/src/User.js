import React from "react";
//import axios from "axios";
//import RecipeForm from "./RecipeForm";
import RecipeAdmin from "./RecipeAdmin"
import Axios from "axios";

class User extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            recipe: [],
            recipeLoading: false,
            recipeError: false
        };

        this.updateRecipe = this.updateRecipe.bind(this);
    }
    componentDidMount() {
        this.fetchRecipe();
    }

    fetchRecipe(){
        this.setState({ recipeLoading: true, recipeError: false });

        Axios
        .get("/api/recipe")
        .then(response => {
            this.setState({
               // recipe: responce.data.map(data => ({
                   // ...data,


                //})
                //),
                recipe: response.data
            })})
            .catch(error => {
                this.setState({
                    recipe: [],
                    recipeLoading: false,
                    recipeError: true
                });

            });
        
    }
    updateRecipe(recipe) {
        this.setState({ recipe });
    }

    render() {
        const {
            recipe,
            recipeLoading,
            recipeError

        } = this.state;

        return(
            <div className="rcls-container">
                <RecipeAdmin
                    recipe={recipe}
                    recipeLoading={recipeLoading}
                    recipeError={recipeError}
                    updateRecipe={this.updateRecipe}
                />
            </div>
        );
    }
}
export default User;