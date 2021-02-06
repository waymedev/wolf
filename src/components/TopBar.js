import React from 'react'
import { Avatar, Box, Flex, HStack, Link } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom";

const Links = [
  {
    name: "Audio",
    link: "/audio"
  },
  {
    name: "Video",
    link: "/video"
  }
];

const NavLink = ({ children }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{ textDecoration: 'none', bg: 'gray.400' }}
      as={ReactLink}
      to={children.link}>
      {children.name}
    </Link>
  )
}

function TopBar() {

  return (
    <>
      <Box bg={'gray.300'} px={4} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack
            as={'nav'}
            spacing={4}
          >
            <Link as={ReactLink} to="/">
              <Avatar
                size={'md'}
                bg={'gray.100'}
                _hover={{ bg: 'gray.400' }}
                src={
                  '/resource/img/logo.png'
                }
              /></Link>
            {Links.map((link) => (
              <NavLink key={link.name} display={{ base: 'none', md: 'flex' }}>{link}</NavLink>
            )
            )}
          </HStack>
          {/* <Flex alignItems={'center'}>
            <h3>Listen What You Want</h3>
          </Flex> */}
        </Flex>

      </Box>
    </>
  )
}

export default TopBar
