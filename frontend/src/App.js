import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/orderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/orderListScreen'
import { useDispatch } from 'react-redux'
import { loginGoogle } from './actions/userActions'

const App = () => {
   // const [user, setUser] = useState(null)
   // const dispatch = useDispatch()
   // useEffect(() => {
   //    const getUser = () => {
   //       fetch('http://localhost:5000/auth/login/success', {
   //          method: 'GET',
   //          credentials: 'include',
   //          headers: {
   //             Accept: 'application/json',
   //             'Content-Type': 'application/json',
   //             'Access-Control-Allow-Credentials': true,
   //             'Access-Control-Allow-Origin':
   //                'http://localhost:5000/auth/login/success'
   //          }
   //       })
   //          .then((response) => {
   //             if (response.status === 200) return response.json()
   //             throw new Error('Authentication Failed!')
   //          })
   //          .then((resObject) => {
   //             setUser(resObject.user)
   //             console.log(resObject.user)
   //             //dispatch(loginGoogle(resObject.user.googleId))
   //          })
   //          .catch((err) => {
   //             console.log(err)
   //          })
   //    }
   //    getUser()
   // }, [])

   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Routes>
                  <Route path='/' element={<HomeScreen />} />
                  <Route path='/product/:id' element={<ProductScreen />} />
                  <Route path='/cart/' element={<CartScreen />} />
                  <Route path='/cart/:id' element={<CartScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/profile' element={<ProfileScreen />} />
                  <Route path='/login/shipping' element={<ShippingScreen />} />
                  {/* <Route path='/register/shipping' element={<ShippingScreen />} /> */}
                  <Route path='/payment' element={<PaymentScreen />} />
                  <Route path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route path='/order/:id' element={<OrderScreen />} />
                  <Route path='/admin/userlist' element={<UserListScreen />} />
                  <Route
                     path='/admin/user/:id/edit'
                     element={<UserEditScreen />}
                  />
                  <Route
                     path='/admin/productlist'
                     element={<ProductListScreen />}
                  />
                  <Route
                     path='/admin/productlist/:pageNumber'
                     element={<ProductListScreen />}
                  />
                  <Route
                     path='/admin/product/:id/edit'
                     element={<ProductEditScreen />}
                  />
                  <Route
                     path='/admin/orderlist'
                     element={<OrderListScreen />}
                  />
                  <Route path='/search/:keyword' element={<HomeScreen />} />
                  <Route path='/page/:pageNumber' element={<HomeScreen />} />
                  <Route
                     path='/search/:keyword/page/:pageNumber'
                     element={<HomeScreen />}
                  />
               </Routes>
            </Container>
         </main>
         <Footer />
      </Router>
   )
}

export default App
