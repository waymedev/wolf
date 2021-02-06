import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Form,
  Field,
  Input,
  Container,
  Text
} from "@chakra-ui/react"

const UrlForm = () => {

  const history = useHistory()
  const [text, setText] = useState("")
  const handleChange = (event) => setText(event.target.value)


  // 一堆正则骚操作
  const pushUrl = () => {
    // history.push(`/res/video`);

    let id = /v=.*/.exec(text)[0];
    id = id.substring(2, id.length)

    history.push(`/ytb/${id}`)
  }

  return (
    <div>
      <Container maxW="75%" my={2}>
        <Text>Enter custom YouTube URL:</Text>
        <Input my={2} text={text} onChange={handleChange} />
        <Button onClick={pushUrl}>Submit</Button>
      </Container>
    </div>
  )
}

export default UrlForm
