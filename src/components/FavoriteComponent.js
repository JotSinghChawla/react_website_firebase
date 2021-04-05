import React from 'react'
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseURL } from '../shared/baseURL';
import Loading from './LoadingComponent';

function RenderMenuItem({ dish, deleteFavourite }) {
    return (
        <Media tag='li'>
            <Media left middle>
                <Media object src={ baseURL + dish.image } alt={dish.name} />
            </Media>
            <Media body className='ml-5'>
                <Media heading> {dish.name} </Media>
                <p> {dish.description} </p>
                <Button outline color='danger' onClick={ () => deleteFavourite( dish._id ) }>
                    <span className='fa fa-times'></span>
                </Button>
            </Media>
        </Media>
    )
}

const FavoriteComponent = ({ fav, deleteFav }) => {
    if( fav.isLoading ) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if( fav.errorMessage ) {         // Try errMessage
        return (
            <div className="container">
                <div className="row">
                    <h4>{fav.errorMessage}</h4>
                </div>
            </div>
        )
    }
    else if( fav.favorites ) {
        console.log('yes', fav);
        const getFavorites = fav.favorites.dishes.map( dish => {                     // Must add fav.favorites[0]
            return (
                <div key={ dish._id } className='col-12 mt-5'>
                    <RenderMenuItem dish={dish} deleteFavourite={ deleteFav } />
                </div>
            )
        })

        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'> Home </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active> My Favorites </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h2> My Favorite Dishes</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <Media list>
                        { getFavorites }
                    </Media>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <h4>You have no favorites</h4>
                    { console.log( fav )}
                </div>
            </div>
        )
    }
}

export default FavoriteComponent
