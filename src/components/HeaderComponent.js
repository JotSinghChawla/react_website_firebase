import React, { useState } from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { baseURL } from '../shared/baseURL'
import { loginUser } from '../redux/ActionCreators'

const HeaderComponent = ({ loginUser, logoutUser, auth }) => {

    const [navOpen, setNavOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    function toggleNav() {
        setNavOpen(!navOpen)
    }

    function toggleModal() {
        setModalOpen(!modalOpen)
    }

    function handleLogin(event) {
        event.preventDefault();
        loginUser({ username: username, password: password })
        toggleModal()
    }

    function handleLogout() {
       logoutUser(); 
    }
    
    return (
        <>
            <Navbar dark expand='md'>
                <div className="container-fluid">
                    <NavbarToggler onClick={toggleNav} />
                    <NavbarBrand className='mr-auto'>
                            <img src={ baseURL+'images/logo.png'} alt='Ristorante Con Fusion' height='50' width='70' />
                    </NavbarBrand>
                    <Collapse isOpen={navOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/home'>
                                    <span className='fa fa-home fa-lg'></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/aboutus'>
                                    <span className='fa fa-info fa-lg'></span> About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/menu'>
                                    <span className='fa fa-list fa-lg'></span> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                    <NavLink className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"></span> My Favorites
                                    </NavLink>
                                </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/contactus'>
                                    <span className='fa fa-address-card fa-lg'></span> Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className='ml-auto'>
                            <NavItem>
                                { !auth.isAuthenticated ? 
                                    <Button outline color='warning' onClick={toggleModal}>
                                        <span className='fa fa-sign-in fa-lg'></span> Login
                                        { auth.isFetching ? <span className="fa fa-spinner fa-pulse fa-fw"></span> : null }
                                    </Button>
                                    :
                                    <div>
                                        <p className='navbar-text mr-3 '> Hello { auth.user } </p>
                                        <Button outline color='warning' onClick={ handleLogout }>
                                            <span className='fa fa-sign-out fa-lg'></span> Logout
                                            { auth.isFetching ? <span className="fa fa-spinner fa-pulse fa-fw"></span> : null }
                                        </Button>
                                    </div>
                            }

                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>  
            <Jumbotron>
                <div className='container'>
                    <div className='row row-header'>
                        <div className='col-12 col-sm-6'>
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create
                               a unique fusion experience. Our lipsmacking creations will tickle 
                               your culinary senses! </p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={modalOpen} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal} >Login</ModalHeader>
                <ModalBody>
                    <p>hello</p>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor='username'>Username:</Label>
                            <Input type='text' id='username' name='username' 
                                    onChange={ (event) => setUsername(event.target.value) } />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='password'>Password:</Label>
                            <Input type='password' id='password' name='password' 
                                    onChange={ (event) => setPassword(event.target.value) } />
                        </FormGroup>
                        <FormGroup>
                            <Label check>
                                <Input type='checkbox' name='remember'  
                                    onChange={ (event) => setRemember(!remember) }  />
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type='submit' value='submit' color='primary'> Login </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default HeaderComponent
