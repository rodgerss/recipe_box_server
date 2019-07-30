import React from "react";

function Recipe({home}){
    const { recipe_id, recipe_name, image, name } = home;
    
    return (
        <div className="rcls-recipe">
            <img className="rcls-image" src={image} alt={recipe_name}/>
            <div className="rcls-recipe-body">
                <div className="rcls-recipe-name">{recipe_name}</div>
                <p className="rcls-name">{name}</p>
            </div> 
            <div className="rcls-recipe-footer">
                <a href={`/recipe/&{id}`} className="rcls-btn rcls-btn-name">
                    See recipes
                </a>
            </div>
        </div>   
    );
}
export default Recipe;