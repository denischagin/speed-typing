import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormTypingText from './components/FormTypingText'
import './App.css'
import Timer from './components/Header/Timer'
import { Button, Collapse, Fade, Grow, makeStyles, Typography } from '@material-ui/core'
import Keyboard from './components/Keyboard'
import Header from './components/Header/index';
import { fetchText } from './store/slices/textSlice'
import { useAppDispatch, useAppSelector } from './hooks/redux';


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

	const [keyboardActive, setKeyboardActive] = useState(false)
	const { text, isLoading, error } = useAppSelector(state => state.text)

	useEffect(() => {
		dispatch(fetchText())
	}, [])

	return (
		<div className={classes.container}>
			<Header />
			{isLoading
				? <Typography variant='h5'>Загрузка...</Typography>
				: <FormTypingText printingText={text} />}
			<Button onClick={() => setKeyboardActive(prev => !prev)} variant='outlined' >{keyboardActive ? "Закрыть" : "Открыть клавиатуру"}</Button>
			{keyboardActive && <Keyboard />}
		</div>
	)
}

export default App
