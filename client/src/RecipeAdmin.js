import React from "react";
import axios from  "axios";
import RecipeForm from "./RecipeForm";

class RecipeAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe_name:"",
            ingredients:"",
            method:"",
            image:"",
            editing:"",
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            movies: [],
            tableLoading: false,
            tableError: false,
            deleteSuccess: false
        };
        this.resetFormState = this.resetFormState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditRecipe = this.handleEditRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }
    componentDidMount( ){
        this.fetchRecipes();

    }
     
    resetFormState() {
        this.setState({
            recipe_name:"",
            ingredients:"",
            method:"",
            image:"",
            editing:"",
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            recipe: [],
            tableLoading: false,
            tableError: false,
            deleteSuccess: false

        });

    }
    isValid() {
        const { validationErrors, isValid } = this.validateFormInput(
            this.state
        );

        if (!isValid) {
            this.setState({ validationErrors });
        }

        return isValid;
    }

    validateFormInput(data) {
        const validationErrors = {};
        const {
            recipe_name,
            ingredients,
            method,
            image
        } = data;

        if (!recipe_name) {
            validationErrors.recipe_name = "This field is required";
        }

        if (!ingredients) {
            validationErrors.ingredients = "This field is required";
        }

        if (!method) {
            validationErrors.method = "This field is required";
        }

        if (!image) {
            validationErrors.image = "This field is required";
        }

        return {
            validationErrors,
            isValid: Object.keys(validationErrors).length === 0
        };
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const {
            editing,
            recipes,
            recipe_id,
            recipe_name,
            ingredients,
            method,
            image
        } =this.state;

        if (this.isValid()) {
            this.setState({
                validationErrors: {},
                formSubmitting: true,
                formSuccess: false,
                formError: false
            });

            if (editing)
               
               axios

               .put(`/api/recipe/${recipe_id}`,{
                   recipe_name,
                   ingredients,
                   method,
                   image
               })
               .then(response => {
                this.resetFormState();

                const index = recipes.findIndex(c => c.recipe_id === recipe_id);

                this.setState({
                    formSuccess: true,
                    recipes: [
                        ...recipes.slice(0, index),
                        {
                            recipe_id,
                            recipe_name,
                            ingredients,
                            method,
                            image
                        },
                        ...recipes.slice(index + 1)

                    ]
                });
            })

            .catch(error => {
                this.setState({
                    validationErrors: {},
                    formSubmitting: false,
                    formSuccess: false,
                    formError: true
                });
            });

        } else {

            axios
               
               .post("/api/recipe",{
                   recipe_name,
                   ingredients,
                   method,
                   image
               })
               .then(response =>{
                   this.resetFormState();
                   this.setState({
                       formSuccess: true,
                       recipes: [
                           ...recipes,
                           {
                               recipe_id: response.data,
                               recipe_name,
                               ingredients,
                               method,
                               image
                            }
                       ]
                   });
               })
               .catch(error => {
                this.setState({
                    validationErrors: {},
                    formSubmitting: false,
                    formSuccess: false,
                    formError: true
                });
            });
        }

    }


handleEditRecipe(recipe){
    return () => {
        this.setState({
            ...recipe,
            editing: true

        });
    }}


render () {
    const {
        recipe_name,
        ingredients,
        method,
        image,
        editing,
        formSubmitting,
        validationErrors,
        formSuccess,
        formError,
        


    }= this.state;
    return (
        <div className="rcls-recipe-admin">
            <h1>Recipes</h1>
            <h3>{editing ? "Edit Recipe" : "Add Recipe"}</h3>
            <RecipeForm
                recipe_name={recipe_name}
                ingredients={ingredients}
                method={method}
                image={image}
                formSubmitting={formSubmitting}
                validationErrors={validationErrors}
                formSuccess={formSuccess}
                formError={formError}
                handleChange={this.handleChange}
                resetFormState={this.resetFormState}
                handleSubmit={this.handleSubmit}
            />
            
        </div>
    );

    }

}

export default RecipeAdmin;

