import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

function Home() {

  const [fileList, setFileList] = useState([])

  useEffect(() => {
    axios.get('/resource/file.json')
      .then(
        res => {
          setFileList(res.data)
          // console.log(sub)
        }
      )
  }, [])

  return (
    <div>
      {
        fileList.map((value, index) => (
          <Link key={index} as={ReactLink} _hover={{ textDecoration: 'none', }} to={`/res/${value.name}`} >
            <Box p={2} my={2} borderRadius="md" bg={'gray.100'}>
              {value.name}
            </Box>
          </Link>
        ))
      }
    </div>
  )
}

export default Home
