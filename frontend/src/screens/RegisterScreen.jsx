import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { TextField } from '@mui/material'

const RegisterScreen = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)

   const location = useLocation()
   const navigate = useNavigate()

   const dispatch = useDispatch()
   const userRegister = useSelector((state) => state.userRegister)
   const { loading, error, userInfo } = userRegister

   const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() => {
      if (userInfo) {
         navigate(redirect)
      }
   }, [navigate, userInfo, redirect])

   const submitHandler = (event) => {
      event.preventDefault()
      if (password !== confirmPassword) {
         setMessage('Passwords do not match')
      } else {
         dispatch(register(name, email, password))
      }
   }

   return (
      <FormContainer>
         <h1>Sign Up</h1>
         {message && <Message variant='danger'>{message}</Message>}
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}
         <form onSubmit={submitHandler}>
            {/* <h5>Name:</h5> */}
            <TextField
               id='outlined-basic'
               label='Name'
               variant='outlined'
               style={{ 'margin-bottom': '20px' }}
               value={name}
               onChange={(e) => setName(e.target.value)}
               fullWidth
               required
               helperText='Your full name.'
            />
            {/* <h5>Email:</h5> */}
            <TextField
               id='outlined-basic'
               label='Email'
               variant='outlined'
               style={{ 'margin-bottom': '20px' }}
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               fullWidth
               required
               helperText='Well never share your email.'
               type='email'
            />
            {/* <h5>Password:</h5> */}
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
               helperText=' '
            />
            {/* <h5>Confirm Password:</h5> */}
            <TextField
               id='outlined-basic'
               label='Confirm Password'
               variant='outlined'
               style={{ 'margin-bottom': '20px' }}
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               type='password'
               fullWidth
               required
               helperText=' '
            />

            <Button type='submit' variant='primary'>
               Register
            </Button>
         </form>

         <Row className='py-3'>
            <Col>
               Have an Account?{' '}
               <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                  Login
               </Link>
            </Col>
         </Row>
      </FormContainer>
   )
}

export default RegisterScreen
