import React from "react";

function RecipeTable({
    recipes,
    tableLoading,
    tableError,
    deleteSuccess,
    onEditRecipe,
    onDeleteRecipe

}) {
    if (tableLoading) {
        return <p className="rcls-table-loading">Loading recipes...</p>;

    }

    return (
        <div className="rcls-table">
            {deleteSuccess && (
                <p className="rcls-alert rcls-alert-success">
                    Record deleted successfully.
                </p>    
            )}
            {tableError && (
                <p className="rcls-alert rcls-alert-error">
                    Sorry, a server error occured. Please retry.
                </p>    
            )}
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Recipe_name</th>
                        <th>Ingredients</th>
                        <th>Method</th>
                        <th>Image</th>
                    </tr>
                </thead>

                {recipes.length === 0 && (
                    <tbody>
                        <td colSpan="3" className="rcls-no-data">
                            No data
                        </td>
                    </tbody>

                )}
                {recipes.length > 0 && (
                    <tbody>
                        {recipes.map ((recipe, index) =>{
                            const {
                                recipe_id,
                                recipe_name,
                                ingredients,
                                method,
                                image


                            } = recipe;
                            return (
                                <tr key={recipe_id}>
                                    <td>{index + 1}</td>
                                    <td>{recipe_name}</td>
                                    <td>{ingredients}</td>
                                    <td>{method}</td>
                                    <td>{image}</td>
                                    <td>
                                        <span
                                            className="rcls-table-link"
                                            onClick={onEditRecipe(recipe)}
                                        >
                                            Edit
                                        </span>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <span
                                            className="rcls-table-link"
                                            onClick={onDeleteRecipe(
                                                recipe,
                                                recipes
                                            )} 
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>                 
                            );

                        })}
                    </tbody>  

                )}
            </table>  

        </div>      

    );
}

export default RecipeTable;