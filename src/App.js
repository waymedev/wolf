import react, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Box, Button, ChakraProvider, Container, Flex, HStack } from "@chakra-ui/react"
import TopBar from './components/TopBar';
import Player from './components/Player';
import Home from './page/Home'


const App = () => {

  return (
    <div style={{ height: '90vh', margin: 0, padding: 0 }} >
      <ChakraProvider>
        <Container maxW={{ md: "75%" }}>
          <Router>
            <TopBar ></TopBar>
            <Switch>
              <Route path="/res/:filename">
                <Player />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </Container>
      </ChakraProvider>
    </div >

  )
}

export default App