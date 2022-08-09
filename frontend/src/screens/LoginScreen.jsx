import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, loginGoogle, loginGithub } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {
   FacebookLoginButton,
   GoogleLoginButton,
   GithubLoginButton
} from 'react-social-login-buttons'
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

   const googleFunction = async (event) => {
      event.preventDefault()
      window.open('http://localhost:5000/auth/google', '_self')
      dispatch(loginGoogle())
   }

   const githubFunction = async (event) => {
      // event.preventDefault()
      // window.open('http://localhost:5000/auth/github', '_self')
      // dispatch(loginGithub())
   }

   return (
      <FormContainer>
         <h1>Sign In</h1>
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
               <Form.Label>Email Address:</Form.Label>
               <Form.Control
                  className='text-center'
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
               <Form.Label>Password:</Form.Label>
               <Form.Control
                  className='text-center'
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId='socialButtons'>
               <GoogleLoginButton onClick={googleFunction} />
               <GithubLoginButton onClick={githubFunction} />
            </Form.Group>

            <Form.Group controlId='signIn'>
               <Button type='submit' variant='primary'>
                  Sign In
               </Button>
            </Form.Group>
         </Form>

         <Row className='py-3'>
            <Col>
               New Customer?{' '}
               <Link
                  to={redirect ? `/register?redirect=${redirect}` : `/register`}
               >
                  Register
               </Link>
            </Col>
         </Row>
      </FormContainer>
   )
}

export default LoginScreen
