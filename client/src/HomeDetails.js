import  React from "react";
import axios from "axios";
//import Home from "./Home"
import Loading from "./Loading";
import Error from "./Error";

class HomeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HomeDetails: [],
            loading: false,
            error: false
        };
    
    }

    componentDidMount() {
        this.fetchHomeDetails();
    }

    fetchHomeDetails(){
     // this.state({ home: true, loading: true, error: false });

        const { recipe_id } =this.props;
        const HomeDetails = axios.get(`/api/recipe/home:1${recipe_id}`);

        axios
            .all([HomeDetails])
            .then(
                axios.spread((HomeDetailsResponce) => {
                    this.setState({
                        HomeDetails: HomeDetailsResponce.data,
                        loading: false,
                        error: false
                    });
                })
            )
            .catch(error =>{
                this.setState({
                    HomeDetails: [],
                    loading: false,
                    error: true

                });
            });
        
    }
    render(){
        const { HomeDetails, loading, error } = this.state;

        if (loading){
            return <Loading />;

        }

        if (error){
            return <Error />;


        }

        if (HomeDetails.length !== 1) {
            return (
                <Error message="Sorry, the homepage does not exist. Please retry. " />

            );
        }
        const { 
            recipe_id,
            recipe_name,
            ingredients,
            method,
            image,
            

         } = HomeDetails[0];

         return(
             <div className="rcls-container">
                 <div className="rcls-home-details-wrapper">
                     <div className="rcls-home-details">
                         <img
                            className="rcls-home-details-info"
                            src={image}
                            alt={recipe_name} 
                          />
                          <div className="rcls-home-details-info">
                              <h1>{recipe_id}</h1>
                              <h2>{recipe_name}</h2>
                              <p>{ingredients}</p>
                              <p>
                                  <span>{method}</span>: {method}
                               </p>
                            </div>
                        </div>
                    </div>
                </div>
         );
        
        
    }
}



export default HomeDetails;
