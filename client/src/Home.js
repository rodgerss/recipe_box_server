import React from "react";
import axios from "axios";
import Recipe from "./Recipe";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: [],
            loading: false,
            error:  false
    };
}
componentDidMount() {
    this.fetchhome();


}
fetchhome(){
    this.setState({ loading: true,error: false });
    
    axios
    .get("http://localhost:9000/api/recipe")
    .then(response => {
        this.setState({
            home: response.data,
            loading: false,
            error: false
        });
    })
    .catch(error => {
        this.setState({
            home: [],
            loading: false,
            error:false

        });
    });
    
}

render(){
    const { home } = this.state;

    return (
        <div className="rcls-container">
            <div className="rcls-recipe">
            </div>  
        </div> 
    );

}         
}
export default Home;