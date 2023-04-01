import { Typography } from '@material-ui/core'
import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const Timer = () => {
    const timerRef = useRef()

    const { timerIsStarted } = useSelector(state => state.timer)
    const [count, setCount] = useState(0)

    useEffect(() => {
        timerIsStarted && startTimer()
    }, [timerIsStarted])

    const msToHMSM = (ms) => {
        ms *= 10;
        let milliseconds = Math.floor((ms % 1000) / 10);
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    const startTimer = () => {
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCount(prev => prev + 1)
        }, 10)
    }

    return (
        <div>
            <Typography variant='subtitle1'>Время: {msToHMSM(count)}</Typography>
        </div>
    )
}

export default Timer