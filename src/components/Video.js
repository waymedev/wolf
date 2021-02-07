import React, { useRef, useMemo, useEffect, useState } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, Box, IconButton, Switch, Flex, Center, Container } from "@chakra-ui/react";
import ReactPlayer from 'react-player/youtube';




const Video = ({ videoId, subtitle }) => {

  const url = `https://www.youtube.com/watch?v=${videoId}`

  const ref = useRef()
  // 获取当前时间
  const [nowTime, setNowTime] = useState(0)
  // useEffect(() => {
  //   const player = ref.current.plyr
  //   player.captions.toggled = true

  //   console.log(player)
  //   player.on("timeupdate", () => setNowTime(player.currentTime))
  // }, [])

  // 当前字幕
  const [now, setNow] = useState("")
  //上一个字幕
  const [last, setLast] = useState("")
  //下一个字幕
  const [next, setNext] = useState("")
  // 计算当前相关字幕
  useEffect(() => {
    let now = subtitle.filter(sub => nowTime >= sub.StartTime && nowTime < sub.EndTime)
    let last = subtitle.filter(sub => nowTime > sub.EndTime)
    let next = subtitle.filter(sub => nowTime <= sub.StartTime)

    if (now[0] !== undefined) {
      setNow(now[0])
    }

    if (last[last.length - 1] !== undefined) {
      setLast(last[last.length - 1])
    }

    if (next[1] !== undefined) {
      setNext(next[1])
    }
  }, [nowTime])

  // mark 的句子列表
  const [marked, setMarked] = useLocalStorage(videoId, [])
  // 是否展示字幕
  const [isSubtitle, setIsSubtitle] = useState(true)


  const dispaly = () => {
    // // console.log(now, last, next);
    // ref.current.plyr.currentTime = 10
    // console.log(ref.current.plyr);

    // ref.current.getInternalPlayer().playerInfo.currentTime = 100
    ref.current.getInternalPlayer().seekTo(100)
    console.log(ref.current.getInternalPlayer());
  }

  const setCurrentTime = (time) => {
    ref.current.plyr.currentTime = time;
  }


  const videoSrc = {
    type: "video",
    sources: [
      {
        src: videoId,
        provider: "youtube"
      }
    ]
  };

  const options = {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'fullscreen'],
    // hideControls: true,
    clickToPlay: true,
    autoplay: true,
    settings: ['captions', 'quality', 'speed'],
    captions: { active: false, language: 'zh', update: false },
  }

  const reactPlayer = useMemo(() => (
    <Plyr
      source={videoSrc}
      options={options}
      ref={ref}
    />
  ), [])

  const onProgress = progress => {
    // console.log("123");
    // console.log(progress)
    setNowTime(progress.playedSeconds)
  }
  return (
    <div>
      <Container maxW="50%" my={2} >
        <ReactPlayer url={url}
          onProgress={onProgress}
          ref={ref}
          controls="true"
        ></ReactPlayer>
        {/* <Plyr source={videoSrc} ref={ref} /> */}
        {/* {reactPlayer} */}
        {/* <button onClick={dispaly}>Buttin</button> */}
        <HStack px={2} my={2}>
          <Button onClick={() => {
            ref.current.getInternalPlayer().seekTo(last.StartTime)
          }}>Last</Button>
          <Button onClick={() => {
            ref.current.getInternalPlayer().seekTo(next.StartTime)

          }}>Next</Button>
          <Button onClick={() => {
            setMarked([...marked, now])
          }}>Mark It</Button>
          <label>字幕状态</label><Switch size="lg" defaultChecked={true} onChange={(event) => {
            setIsSubtitle(event.target.checked)
          }} />
        </HStack>
        {
          isSubtitle && <Box textShadow="1px 1px #90c9f2" my={2} px={2} borderRadius="md">
            {
              now && <Text>{now.Value}</Text>
            }
          </Box>
        }
        {
          marked.length > 0 && marked.map((mark, index) => (
            <Box key={index} my={2} px={3} py={1} bg={'gray.100'} borderRadius="md" boxShadow="base">
              <HStack>
                <IconButton icon={<ChevronRightIcon></ChevronRightIcon>} onClick={() => {
                  ref.current.getInternalPlayer().seekTo(mark.StartTime)
                }} />
                <Text>{mark.Value}</Text>
              </HStack>
            </Box>


          ))
        }
      </Container>
    </div >
  )
}

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default Video
