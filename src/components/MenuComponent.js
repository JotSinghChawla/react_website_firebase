import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'; 
import { Link } from "react-router-dom";
import Loading from './LoadingComponent'
import { baseURL } from '../shared/baseURL'

class Menu extends Component {

    constructor(props) {
        super(props);

        console.log("1. constructor is called")
    }
    componentWillMount() {
        console.log('2. componentWillMount is called')
    }
    componentDidMount() {
        console.log("4. componentDidMount is called")
    }
    componentDidUpdate() {
        console.log('5. componentDidUpdate is called')
    }

    // renderDish(dish) {
    //     if(dish!==null){
    //         return(
    //             <Card>
    //                 <CardImg width="100%" src={dish.image} alt={dish.name} />
    //                 <CardBody>
    //                     <CardTitle> {dish.name} </CardTitle>
    //                     <CardText> {dish.description} </CardText>
    //                 </CardBody>
    //             </Card>
    //         )
    //     }
    //     else{
    //         return (
    //             <div></div>
    //         )
    //     }
    // }

    // showComments(dish) {
    //     return dish !== null ? <div>
    //         <h3>Comments</h3>
            
    //     </div> : <div></div>
    // }

    render() {

        console.log("3. render is called")

        const menu = this.props.sentDishes.dishes.map((dish) => {
            return (
                <div key={dish._id} className="col-12 col-md-5 m-2">
                    <Card>
                        <Link to={ `/menu/${dish._id}` } >
                            <CardImg width="100%" src={baseURL + dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle> {dish.name} </CardTitle>
                            </CardImgOverlay>
                        </Link>
                    </Card>
                </div> 
            );
        });

        if( this.props.sentDishes.isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (this.props.sentDishes.errorMessage) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{this.props.sentDishes.errorMessage}</h4>
                    </div>
                </div>
            )
        }

        else 
        {
            return (  
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem> 
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active> 
                                Menu
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>Menu </h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
        }
    } 
}

export default Menu;