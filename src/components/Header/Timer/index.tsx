import { Typography } from '@material-ui/core'
import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

const Timer = () => {
    const timerRef = useRef(0)

    const { timerIsStarted } = useAppSelector(state => state.timer)
    const [count, setCount] = useState(0)

    useEffect(() => {
        timerIsStarted && startTimer()
    }, [timerIsStarted])

    const msToHMSM = (ms: number):string => {
        ms *= 10;
        let milliseconds = Math.floor((ms % 1000) / 10);
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

        const hoursStr = (hours < 10) ? "0" + `${hours}` : `${hours}`;
        const minutesStr = (minutes < 10) ? "0" + `${minutes}` : `${minutes}`;
        const secondsStr = (seconds < 10) ? "0" + `${seconds}` : `${seconds}`;
        const millisecondsStr = (milliseconds < 10) ? "0" + `${milliseconds}` : `${milliseconds}`;

        return hoursStr + ":" + minutesStr + ":" + secondsStr + "." + millisecondsStr;
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