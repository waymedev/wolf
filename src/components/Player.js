
import { useState, useRef, useEffect, useMemo, useImperativeHandle } from "react";

import ReactPlyr from '@m2g/react-plyr';
import '@m2g/react-plyr/build/react-plyr.css'
import { Button, HStack, Text, Box, IconButton, Switch } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

const Player = ({ handleTime, newTime }) => {

  const filename = useParams().filename

  const plyr = useRef()
  const [subtitle, setSubtitle] = useState([])
  const [nowTime, setNowTime] = useState(0)
  // 当前字幕
  const [now, setNow] = useState("")
  //上一个字幕
  const [last, setLast] = useState("")
  //下一个字幕
  const [next, setNext] = useState("")

  const [marked, setMarked] = useLocalStorage(filename, [])

  // const [name, setName] = useLocalStorage('name', 'Bob');

  const [isSubtitle, setIsSubtitle] = useState(true)

  // const readyCurrentTime = () => {
  //   plyr.current.setCurrentTime(newTime)
  //   console.log(plyr);
  // }

  // 当播放器时间变动时
  const timeUpdate = (currentTime) => {
    setNowTime(currentTime)
  }

  // 加载字幕
  useEffect(() => {
    axios.get(`https://cdn.jsdelivr.net/gh/orangiest/wolf/m4a/cet4/sub/${filename}.json`)
      .then(
        res => {
          setSubtitle(res.data)
        }
      )
  }, [])

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

  // 销毁对象 有和没有好像都没差
  useEffect(() => {
    return () => {
      plyr.current = null
    }
  }, [])

  const reactPlayer = useMemo(() => (
    <ReactPlyr
      type="audio"
      sources={[
        {
          src: `https://minio.cwm.wiki/eng/cet4/${filename}.m4a`
        }
      ]}
      debug={false}
      settings={[]}
      // autoplay={true}
      ref={plyr}
      onTimeUpdate={timeUpdate}
    />
  ), [])

  return (
    <div>
      {reactPlayer}
      <HStack px={2}>
        <Button onClick={() => {
          plyr.current.setCurrentTime(last.StartTime)
        }}>Last</Button>
        <Button onClick={() => {
          plyr.current.setCurrentTime(next.StartTime)
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
                plyr.current.setCurrentTime(mark.StartTime)
              }} />
              <Text>{mark.Value}</Text>
            </HStack>
          </Box>


        ))
      }
    </div>
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

export default Player