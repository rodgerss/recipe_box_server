import React from "react";
//import { Link } from "@reach/router";

function  RecipeForm({
    recipe_name,
    ingredients,
    method,
    image,
    formSubmitting,
    ValidationErrors,
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
                               ValidationErrors.recipe_name ? "has-error" :""
                           }
                           autoComplete="off"
                           value={recipe_name}
                           onChange={handleChange}
                           disabled={formSubmitting}
                        />
                           {ValidationErrors.recipe_name &&(
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
                           ValidationErrors.ingredients ? "has-error" : ""


                       }
                       autoComplete="off"
                       value={ingredients}
                       onChange={handleChange}
                       disabled={formSubmitting}
                    />
                    {ValidationErrors.ingredients && (
                        <span className="rcls-form-input-error">
                            {ValidationErrors.ingredients}
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
                           ValidationErrors.method ? "has-error" : ""


                       }
                       autoComplete="off"
                       value={method}
                       onChange={handleChange}
                       disabled={formSubmitting}
                    />
                    {ValidationErrors.method && (
                        <span className="rcls-form-input-error">
                            {ValidationErrors.method}
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
                           ValidationErrors.image ? "has-error" : ""


                       }
                       autoComplete="off"
                       value={image}
                       onChange={handleChange}
                       disabled={formSubmitting}
                    />
                    {ValidationErrors.image && (
                        <span className="rcls-form-input-error">
                            {ValidationErrors.image}
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

