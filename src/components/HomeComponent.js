import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Loading from './LoadingComponent'
import { baseURL } from '../shared/baseURL'
import { FadeTransform } from 'react-animation-components'

const HomeComponent = ({ dish, promotion, leader, dishesErrMess, dishesLoading, promosLoading, promosErrMess, leadersLoading, leadersErrMess }) => {

    const RenderCard = ({ item, isLoading, errMess }) => {
        if (isLoading) {
            return(
              <Loading />
            )
        }
        else if(errMess) {
            return (
                <h3>{errMess}</h3>
            )
        }
        else {
            return (
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%) '}} >
                    <Card >
                        <CardImg src={baseURL + item.image} alt={item.name} />
                        <CardBody>
                            <CardTitle> {item.name} </CardTitle>
                            { item.designation ? <CardSubtitle> {item.designation} </CardSubtitle> : null }
                            <CardText> {item.description} </CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            )
        }
    }

    return (
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-2'>
                    <RenderCard item = {dish} isLoading={ dishesLoading } errMess={ dishesErrMess } /> 
                </div>
                <div className='col-12 col-md m-2'>
                    <RenderCard item = {promotion} isLoading={ promosLoading } errMess={ promosErrMess }  /> 
                </div>
                <div className='col-12 col-md m-2'>
                    <RenderCard item = {leader} isLoading={ leadersLoading } errMess={ leadersErrMess} /> 
                </div>
            </div>
        </div>
    )
}

export default HomeComponent
