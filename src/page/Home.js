import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { TabBar } from '../components/TabBar'

function Home() {

  // const [fileList, setFileList] = useState([])
  const [cet4, setCet4] = useState([])
  const [cet6, setCet6] = useState([])

  useEffect(() => {
    axios.get('/resource/file.json')
      .then(
        res => {
          setCet4(res.data.CET_4)
          setCet6(res.data.CET_6)
        }
      )
  }, [])

  return (
    // <div>
    //   {
    //     fileList.map((value, index) => (
    //       <Link key={index} as={ReactLink} _hover={{ textDecoration: 'none', }} to={`/res/${value.name}`} >
    //         <Box p={2} my={2} borderRadius="md" bg={'gray.100'}>
    //           {value.name}
    //         </Box>
    //       </Link>
    //     ))
    //   }
    // </div>

    <div>
      <TabBar cet4={cet4} cet6={cet6}></TabBar>
    </div>
  )
}

export default Home
