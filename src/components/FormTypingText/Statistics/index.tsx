import { Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../hooks/redux'

const Statistics = () => {
    const { mistakesCount } = useAppSelector(state => state.mistakes)
    const { printSpeedLetterPerMinute, printSpeedWordsPerMinute } = useAppSelector(state => state.statatistics)

    return (
        <div>
            <Typography variant='h2'>Статистика</Typography>
            <Typography variant='h5'>{printSpeedLetterPerMinute} зн./мин.</Typography>
            <Typography variant='h5'>{printSpeedWordsPerMinute} слов/мин.</Typography>
        </div>
    )
}

export default Statistics