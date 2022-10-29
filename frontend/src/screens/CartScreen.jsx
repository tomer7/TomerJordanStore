import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { FiTrash2 } from 'react-icons/fi'

const CartScreen = () => {
   const params = useParams()
   const location = useLocation()
   const navigate = useNavigate()
   const productId = params.id
   // splitting the number from the "qty="
   //the number will be inside index 1 in the array
   const qty = location.search ? Number(location.search.split('=')[1]) : 1
   const dispatch = useDispatch()
   const cart = useSelector((state) => state.cart)
   const { cartItems } = cart

   useEffect(() => {
      if (productId) {
         dispatch(addToCart(productId, qty))
      }
   }, [dispatch, productId, qty])

   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
   }

   const checkoutHandler = () => {
      navigate('/login?redirect=shipping')
   }

   return (
      <Row>
         <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
               <Message>
                  Your cart is empty <Link to='/'> Go Back</Link>
               </Message>
            ) : (
               <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                     <ListGroup.Item key={item.product}>
                        <Row>
                           <Col md={2}>
                              <Image
                                 src={item.image}
                                 alt={item.name}
                                 fluid
                                 rounded
                              />
                           </Col>
                           <Col md={3}>
                              <Link to={`/product/${item.product}`}>
                                 {item.name}
                              </Link>
                           </Col>
                           <Col md={2}>${item.price}</Col>
                           <Col md={2}>
                              <Form.Select
                                 style={{ border: '1px black solid' }}
                                 value={item.qty}
                                 onChange={(e) =>
                                    dispatch(
                                       addToCart(
                                          item.product,
                                          Number(e.target.value)
                                       )
                                    )
                                 }
                              >
                                 {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                       <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                       </option>
                                    )
                                 )}
                              </Form.Select>
                           </Col>
                           <Col md={2}>
                              <Button
                                 type='button'
                                 variant='light'
                                 onClick={() => {
                                    removeFromCartHandler(item.product)
                                 }}
                              >
                                 <FiTrash2
                                    color='red'
                                    style={{ fontSize: '21px' }}
                                 />
                              </Button>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            )}
         </Col>
         <Col md={4}>
            <Card>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2>
                        Subtotal (
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        items
                     </h2>
                     $
                     {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                     >
                        Proceed To Checkout
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </Col>
      </Row>
   )
}

export default CartScreen
