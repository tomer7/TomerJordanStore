import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Image, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { useLocation, useNavigate, Route } from 'react-router-dom'
import SearchBox from './SearchBox'
import logoPhoto from './logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
   const [mobile, setMobile] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin
   const [user, setUser] = useState()

   const logoutHandler = () => {
      dispatch(logout())
      navigate('/')
   }

   useEffect(() => {
      // checking if user from desktop or mobile
      let userScreenWidth = window.innerWidth
      userScreenWidth = Number(userScreenWidth)
      if (userScreenWidth > Number(991)) {
         setMobile(false)
      } else {
         setMobile(true)
      }
   }, [])

   return (
      <header>
         <Navbar
            bg='light'
            variant='light'
            expand='lg'
            className='headerClass'
            style={
               mobile
                  ? {
                       'border-bottom': '2px solid black',
                       'box-shadow':
                          '0 4px 7px 0 rgba(0, 0, 0, 0.3), 0 0 20px 0 rgba(0, 0, 0, 0.19)',
                       height: 'auto'
                    }
                  : {
                       'border-bottom': '2px solid black',
                       'box-shadow':
                          '0 4px 7px 0 rgba(0, 0, 0, 0.3), 0 0 20px 0 rgba(0, 0, 0, 0.19)',
                       height: '5rem'
                    }
            }
            collapseOnSelect
         >
            <Container>
               <LinkContainer to='/'>
                  <Navbar.Brand>
                     <img height='80px' width='80px' src={logoPhoto} />
                  </Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <SearchBox />
                  <Nav className='ms-auto'>
                     <LinkContainer to='/cart'>
                        <Nav.Link>
                           <FontAwesomeIcon
                              icon={faBagShopping}
                              size='2x'
                              style={{ color: 'black', paddingRight: '15px' }}
                           />
                        </Nav.Link>
                     </LinkContainer>
                     {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                           <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>
                           <NavDropdown.Item onClick={logoutHandler}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to='/login'>
                           <Nav.Link>
                              <FontAwesomeIcon
                                 icon={faUser}
                                 size='2x'
                                 style={{ color: 'black' }}
                              />
                           </Nav.Link>
                        </LinkContainer>
                     )}
                     {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                           <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item>Users</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item>Products</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to='/admin/orderlist'>
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
