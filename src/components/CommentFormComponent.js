import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'

// const minLength = (val) => val && (val.length >= 2)
// const maxLength = (val) => !val || (val.length <= 15)

export class CommentFormComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            modal: false
        }
        this.showModal = this.showModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    showModal() {
       this.setState({ modal: !this.state.modal })
    }

    handleSubmit(values) {
        this.showModal()
        this.props.postComment( this.props.dishId, values.ratings, values.comment )
        // event.preventDefault();
    }

    render() {
    const { text, postComment, dishId } = this.props
        return (
            <>
                <Button outline color='secondary' onClick={ this.showModal}>
                    <i className='fa fa-pencil fa-lg'>  {text} </i>
                </Button>
                <Modal isOpen={this.state.modal} toggle={ this.showModal }>
                    <ModalHeader toggle={ this.showModal }>
                        Submit Your Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
                            <Row className='form-group'>
                                <Label md={12} htmlFor='ratings'> Ratings: </Label> 
                                <Col md={12}>
                                    <Control.select model='.ratings' id='ratings' defaultValue='5'
                                        className='form-control'>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>        
                                    
                                </Col>
                            </Row>
                            {/* <Row className='form-group'>
                                <Label md={12} htmlFor='name'> Your Name: </Label> 
                                <Col md={12}>
                                    <Control.text model='.name' id='name' name='name'
                                        className='form-control'
                                        placeholder='Enter Name'
                                        validators={{
                                            minLength, maxLength
                                        }} />
                                    <Errors className='text-danger' model='.name'
                                        show='touched'
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row> */}
                            <Row className='form-group'>
                                <Label md={12} htmlFor='comment'> Comment: </Label> 
                                <Col md={12}>
                                    <Control.textarea rows='6' model='.comment' id='comment' name='comment'
                                        placeholder='Enter your Comment here...'
                                        className='form-control' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>

                </Modal>
            </>
        )
    }
}

CommentFormComponent.defaultProps = {
    text: 'Submit Comment'
}

export default CommentFormComponent
