import { Button } from '@chakra-ui/react'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import Player from './Player'

function Sub({ subtitle }) {


  useEffect(() => {
    setNow(subtitle[0])
    setLast(subtitle[0])
    setNext(subtitle[1])
  }, [])
  // 当前播放时间
  const [current, setCurrent] = useState(0)
  // 当前字幕
  const [now, setNow] = useState("")
  //上一个字幕
  const [last, setLast] = useState("")
  //下一个字幕
  const [next, setNext] = useState("")

  const [nextTime, setNextTime] = useState(0)

  const runTime = (time) => {
    setCurrent(time.toFixed(2))
  }

  useEffect(() => {
    let now = subtitle.filter(sub => current >= sub.StartTime && current < sub.EndTime)
    let last = subtitle.filter(sub => current > sub.EndTime)
    let next = subtitle.filter(sub => current <= sub.StartTime)

    if (now[0] !== undefined) {
      setNow(now[0])
    }

    if (last[last.length - 1] !== undefined) {
      setLast(last[last.length - 1])
    }

    if (next[1] !== undefined) {
      setNext(next[1])
    }

  }, [current])

  const handleNext = () => {
    setNextTime(next.StartTime)
  }

  // 父组件刷新的时候 子组件不刷新
  const player = useMemo(() => <Player subtitle={subtitle} handleTime={runTime} newTime={nextTime}> </Player>, [])
  return (
    <>
      {player}
      {
        now && <h3>now : {now.Value}</h3>
      }
      {
        last && <h3>last : {last.Value}</h3>
      }
      {
        next && <h3>next : {next.Value}</h3>
      }
      <Button onClick={handleNext}>Next</Button>
    </>
  )
}

export default Sub
