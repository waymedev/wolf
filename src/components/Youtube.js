import React, { useState, useEffect } from 'react'
import axios from "axios";
import Video from './Video';
import { useParams } from "react-router-dom";

const Youtube = () => {
  const videoId = useParams().id

  const [originSub, setOriginSub] = useState([])

  useEffect(async () => {
    const subPromise = axios.get(`https://hxshum4bg0.execute-api.ap-southeast-1.amazonaws.com/default/ytb?videoID=${videoId}`)
    const oldSub = (await subPromise).data
    let subArray = []
    oldSub.map((v, index) => {
      let sub = {
        StartTime: v.start,
        EndTime: new Number(v.start) + new Number(v.dur) + "",
        Value: v.text
      }
      subArray = subArray.concat(sub)

    })
    setOriginSub(subArray)
  }, [])


  return (
    <div>
      <Video subtitle={originSub} videoId={videoId}></Video>
    </div>
  )
}

export default Youtube
