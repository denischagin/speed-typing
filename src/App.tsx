import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormTypingText from './components/FormTypingText'
import './App.css'
import Timer from './components/Header/Timer'
import { Button, Collapse, Fade, Grow, makeStyles, Typography } from '@material-ui/core'
import Keyboard from './components/Keyboard'
import Header from './components/Header/index';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import StartPrintingText from './components/StartPrintingText';
import { fetchText } from './store/asyncActions/fetchText';


const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		maxWidth: "1000px",
		padding: "0 15px",
		margin: "0 auto",
		marginBottom: "10px",
		gap: "30px"
	},
	keyboard_wrapper: {
		width: "100%"
	}
})

const App = () => {
	const classes = useStyles();

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchText())
	}, [])

	return (
		<div className={classes.container}>
			{/* <Button variant='outlined'>Начать писать</Button> */}
			<Header />
			<StartPrintingText />
		</div>
	)
}

export default App
