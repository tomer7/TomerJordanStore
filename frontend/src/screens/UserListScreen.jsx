import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { FiTrash2 } from 'react-icons/fi'
import { FiSettings } from 'react-icons/fi'
import { FaTimesCircle } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'

const UserListScreen = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const userList = useSelector((state) => state.userList)
   const { loading, error, users } = userList

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userDelete = useSelector((state) => state.userDelete)
   const { success: successDelete } = userDelete

   useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
         dispatch(listUsers())
      } else {
         navigate('/login')
      }
   }, [dispatch, navigate, userInfo, successDelete])

   const deleteHandler = (id) => {
      if (window.confirm('Are you sure?')) {
         dispatch(deleteUser(id))
      }
   }

   return (
      <>
         <h1>Users</h1>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <Table striped bordered hover responsive className='table-sm'>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>NAME</th>
                     <th>EMAIL</th>
                     <th>ADMIN</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                           {user.isAdmin ? (
                              <GiCheckMark color='green' />
                           ) : (
                              <FaTimesCircle color='red' />
                           )}
                        </td>
                        <td>
                           <LinkContainer to={`/admin/user/${user._id}/edit`}>
                              <Button
                                 style={{
                                    borderRadius: '5px',
                                    fontSize: '18px'
                                 }}
                                 variant='secondary'
                              >
                                 <FiSettings />
                              </Button>
                           </LinkContainer>
                           <Button
                              style={{ borderRadius: '5px', fontSize: '18px' }}
                              variant='danger'
                              onClick={() => {
                                 deleteHandler(user._id)
                              }}
                           >
                              <FiTrash2 />
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         )}
      </>
   )
}

export default UserListScreen
