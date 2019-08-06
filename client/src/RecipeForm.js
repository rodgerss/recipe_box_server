import React from "react";
//import { Link } from "@reach/router";

function  RecipeForm({
    recipe_name,
    ingredients,
    method,
    image,
    formSubmitting,
    ValidationErrors,
    validationErrors,
    formSuccess,
    formError,
    handleChange,
    resetFormState,
    handleSubmit
    
    

})  {
    const disabled =
        !recipe_name ||
        !ingredients ||
        !method ||
        !image 
        

    return (
        <form className="rcls-form" onSubmit={handleSubmit}>
            {formSuccess && (
                <p className="rcls-alert rcls=alert-success">
                    form submitted successfully.
                </p>
            )}

            {formError && (
                <p className="rcls-alert rcls-alert-error">
                    Sorry, error submitting form .Please retry.
                </p>
            )}
            <div className="rcls-form-row">
                <div className="rcls-form-col">
                    <label htmlFor="recipe_name">Recipe name</label>
                    <div className="rcls-form-input-group">
                        <input
                           type="text"
                           name="recipe_name"
                           className={
                               validationErrors.recipe_name ? "has-error" :""
                           }
                           autoComplete="off"
                           value={recipe_name}
                           onChange={handleChange}
                           disabled={formSubmitting}
                        />
                           {validationErrors.recipe_name &&(
                               <span className="rcls-form-input-error">
                                   {ValidationErrors.recipe_name}
                                </span>

                           )}
                    </div>
                </div>
            </div>
            <div className="rcls=form=col">
                <label htmlFor="ingredients">ingredients</label>
                <div className="rcls-form-input-group">
                    <input
                       type="text"
                       name="ingredients"
                       className={
                           validationErrors.ingredients ? "has-error" : ""


                       }
                       autoComplete="off"
                       value={ingredients}
                       onChange={handleChange}
                       disabled={formSubmitting}
                    />
                    {validationErrors.ingredients && (
                        <span className="rcls-form-input-error">
                            {validationErrors.ingredients}
                           </span> 
                    )}
                </div>
            </div>
            <div className="rcls=form=col">
                <label htmlFor="method">method</label>
                <div className="rcls-form-input-group">
                    <input
                       type="text"
                       name="method"
                       className={
                           validationErrors.method ? "has-error" : ""


                       }
                       autoComplete="off"
                       value={method}
                       onChange={handleChange}
                       disabled={formSubmitting}
                    />
                    {validationErrors.method && (
                        <span className="rcls-form-input-error">
                            {validationErrors.method}
                           </span> 
                    )}
                </div>
            </div>
            <div className="rcls=form=col">
                <label htmlFor="image">image</label>
                <div className="rcls-form-input-group">
                    <input
                       type="text"
                       name="image"
                       className={
                           validationErrors.image ? "has-error" : ""


                       }
                       autoComplete="off"
                       value={image}
                       onChange={handleChange}
                       disabled={formSubmitting}
                    />
                    {validationErrors.image && (
                        <span className="rcls-form-input-error">
                            {validationErrors.image}
                           </span> 
                    )}
                </div>
            </div>
            <button
                className="rcls-btn rcls-btn-form"
                type="submit"
                disabled={disabled || formSubmitting}
            >
                Submit
            </button>
            <button
                className="rcls-btn rcls-btn-form"
                type="reset"
                onClick={resetFormState}
                disabled={formSubmitting}
            >
                Reset
            </button>
        </form> 
           

    );


}
    
export default RecipeForm;

