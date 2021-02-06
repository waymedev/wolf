import React, { useState, useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Flex } from "@chakra-ui/react"
import { Box, Link } from '@chakra-ui/react'
import { Link as ReactLink, BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Player from './Player'

export const TabBar = ({ cet4, cet6 }) => {
  // const history = useHistory()
  // const size = useWindowSize();

  // const [fileName, setFileName] = useState(cet4[0])
  // const pushName = (e) => {
  //   const name = e.target.innerText
  //   if (size.width <= 766) {
  //     history.push(`/res/${name}`)
  //   }
  //   history.push(`/res/123/${name}`)


  //   setFileName(name)

  // }

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>CET-4</Tab>
          <Tab>CET-6</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex>
              <Box w={{ base: "100%", md: "30%" }}>
                {
                  cet4.map((value, index) => (
                    <Link key={index} as={ReactLink} _hover={{ textDecoration: 'none', }} to={`/res/cet4/${value.name}`} >
                      <Box p={2} my={2} borderRadius="md" bg={'gray.100'}>
                        {value.name}
                      </Box>
                    </Link>
                  ))
                }
              </Box>

            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex>
              <Box w={{ base: "100%", md: "30%" }}>
                {
                  cet6.map((value, index) => (
                    <Link key={index} as={ReactLink} _hover={{ textDecoration: 'none', }} to={`/res/cet6/${value.name}`} >
                      <Box p={2} my={2} borderRadius="md" bg={'gray.100'}>
                        {value.name}
                      </Box>
                    </Link>
                  ))
                }
              </Box>

            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div >
  )
}


// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
