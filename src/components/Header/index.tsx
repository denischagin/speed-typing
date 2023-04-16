import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { timerActions } from '../../store/slices/timerSlice';
import Timer from './Timer/index';

const useStyles = makeStyles({
    header: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    }

})

const Header = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const { mistakesCount } = useAppSelector(state => state.mistakes)
    return (
        <header className={classes.header}>
            <Typography variant='body1'>Количество ошибок: {mistakesCount} </Typography>
            <Timer />
            {/* <Button variant='outlined' onClick={() => dispatch(timerActions.startStopTimer())}>Начать печатать</Button> */}
        </header>
    )
}

export default Header