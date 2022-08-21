import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBox = () => {
   const navigate = useNavigate()
   const [keyword, setKeyword] = useState('')

   useEffect(() => {
      if (keyword.trim()) {
         navigate(`/search/${keyword}`)
      } else {
         navigate('/')
      }
   }, [keyword])

   return (
      <Form
         style={{
            display: 'flex',
            flexDirection: 'row'
         }}
         inline
      >
         <Form.Control
            style={{
               marginRight: '5px',
               borderRadius: '50px'
            }}
            className='inputDesign'
            type='text'
            name='q'
            onChange={(e) => {
               setKeyword(e.target.value)
            }}
            placeholder='Search Products...'
            value={keyword}
         ></Form.Control>
         <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size='2x'
            style={{ color: 'black', paddingTop: '10px' }}
         />
         {/* <Button
            style={{
               borderRadius: '50px'
            }}
            type='submit'
            variant='dark'
            className='p-2'
         >
            Search
         </Button> */}
      </Form>
   )
}

export default SearchBox
