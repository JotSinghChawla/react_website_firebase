import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Button, Label, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, Form, Errors, actions } from 'react-redux-form'
// import { latest } from 'immer/dist/internal'

const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => !(val) || (val.length >= len)
const isNumber = (val) => !isNaN(Number(val))
const validEmail = (val) => /^[a-zA-Z0-9_.-]{1,}@[^.][a-zA-Z]{1,}[.][a-zA-Z.]{1,}$/i.test(val)

class ContactComponent extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.resetFeedbackForm()
        this.props.postFeedback( 
            values.firstname, 
            values.lastname, 
            values.email, 
            values.telnum, 
            values.agree, 
            values.contactType, 
            values.message )
        // event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem> 
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active> 
                            Contact Us
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us </h3>
                        <hr />
                    </div>
                </div>    
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Random Road<br />
                            Hansi, Haryana<br />
                            INDIA<br />
                            <i className="fa fa-phone"></i>: +91 70153520xx<br />
                            <i className="fa fa-fax"></i>: +91 12345678xx<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:jot.chawla.54.js@gmail.com">jot.chawla.54.js@gmail.com</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map to find us</h5>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2153.097558656621!2d75.96414026604138!3d29.095196591207465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5b88bf9b9e5f5494!2sHansi%20Bus%20stand!5e0!3m2!1sen!2sin!4v1617823531989!5m2!1sen!2sin" width="315" height="300" style={{ border:0 }} allowfullscreen="" loading="lazy"></iframe>
                        <br />
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+917015352090)"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="https://www.skype.com/en/"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:jot.chawla.54.js@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model='feedback' onSubmit={ (values) => this.handleSubmit(values) }>
                            <Row className='form-group'>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors className='text-danger' model='.firstname' 
                                        show='touched'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors className='text-danger' model='.lastname' 
                                        show='touched'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                                
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.input type='number' model=".telnum" id="telnum" name="telnum" maxLength='10'
                                        placeholder="Tel. Number"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(10), isNumber
                                        }} />
                                    <Errors className='text-danger' model='.telnum' 
                                        show='touched'
                                        messages={{
                                            required: 'Required! ',
                                            minLength: 'Must be a 10 digits number',
                                            isNumber: 'Must be a Number'
                                        }} />
                                </Col> 
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" type="email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }} />
                                    <Errors className='text-danger' model='.email' 
                                            show='touched'
                                            messages={{
                                                required: 'Required! ',
                                                validEmail: 'Must be a valid Email. For example: abc@gmail.com '
                                            }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 6, offset: 2}}>
                                    <div className='form-check'>
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className='form-check-input' /> 
                                            {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className='form-control' >
                                            <option>Tel.</option>
                                            <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className='form-control' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactComponent
