import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { TextField } from '@mui/material'
// import {
//    FacebookLoginButton,
//    GoogleLoginButton,
//    GithubLoginButton
// } from 'react-social-login-buttons'
import axios from 'axios'

const LoginScreen = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const location = useLocation()
   const navigate = useNavigate()

   const dispatch = useDispatch()
   const userLogin = useSelector((state) => state.userLogin)
   const { loading, error, userInfo } = userLogin

   // after sign in the user is moving to home page,
   // what after the : is where user go
   const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() => {
      if (userInfo) {
         navigate(redirect)
      }
   }, [navigate, userInfo, redirect])

   const submitHandler = (event) => {
      event.preventDefault()
      dispatch(login(email, password))
   }

   return (
      <FormContainer>
         <form onSubmit={submitHandler}>
            <h1>Login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {/* <h5>Email :</h5> */}
            <TextField
               id='outlined-basic'
               label='Email'
               variant='outlined'
               style={{ 'margin-bottom': '20px' }}
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               type='email'
               fullWidth
               required
               helperText='Well never share your email.'
            />
            {/* <h5>Password :</h5> */}
            <TextField
               id='outlined-basic'
               label='Password'
               variant='outlined'
               style={{ 'margin-bottom': '20px' }}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               type='password'
               fullWidth
               required
               helperText='Well never share your password.'
            />
            <Form.Group controlId='signIn'>
               <Button type='submit' variant='primary'>
                  Sign In
               </Button>
            </Form.Group>
            <Row className='py-3'>
               <Col>
                  New Customer?{' '}
                  <Link
                     to={
                        redirect
                           ? `/register?redirect=${redirect}`
                           : `/register`
                     }
                  >
                     Register
                  </Link>
               </Col>
            </Row>
         </form>
      </FormContainer>
   )
}

export default LoginScreen
