import React from "react";
import axios from "axios";
import Recipe from "./Recipe";
import Loading from "./Loading";
import Error from "./Error"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loading: false,
            error:  false
    };
}
componentDidMount() {
    this.fetchRecipes();


}
fetchRecipes(){
    this.setState({ loading: true,error: false });
    
    axios
    .get("/api/recipe/home")
    .then(response => {
        this.setState({
            recipes: response.data,
            loading: false,
            error: false
        });
    })
    .catch(error => {
        this.setState({
            recipes: [],
            loading: false,
            error:false

        });
    });
    
}

render(){
    const { recipes, loading, error } = this.state;

    if (loading) {
        return <Loading />

    }

    if (error){
        return <Error />
    }

    return (
        <div className="rcls-container">
            <div className="rcls-recipe">
                {recipes.map((r, index) => (
                    <Recipe key={index} recipe={r} />
                ))}
            </div>  
        </div> 
    );

}         
}
export default Home;