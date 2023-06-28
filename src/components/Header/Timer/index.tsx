import { Typography } from '@mui/material'
import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';
import { calcSpeed } from '../../../store/slices/statisticsSlice';
import { useAppDispatch } from './../../../hooks/redux';
import { convertMillisecondsToTime } from '../../../helpers/convertMillisecondsToTime';

const Timer = () => {
    const timerRef = useRef(0)

    const { timerIsStarted } = useAppSelector(state => state.timer)
    const [count, setCount] = useState(0)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (timerIsStarted) startTimer()
        else stopTimer()
    }, [timerIsStarted])

    const startTimer = () => {
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCount(prev => prev + 1)
        }, 10)
    }

    const stopTimer = () => {
        if (count === 0) return
        
        dispatch(calcSpeed(count))
        clearInterval(timerRef.current)
    }

    return (
        <div>
            <Typography variant='subtitle1'>Время: {convertMillisecondsToTime(count)}</Typography>
        </div>
    )
}

export default Timer