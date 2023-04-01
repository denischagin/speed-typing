import { useState, Fragment, useRef, useEffect } from 'react'
import { makeStyles, Typography, TextField, createTheme, ThemeProvider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { mistakesActions } from '../../store/slices/mistakesSlice';
import { currentSymbolActions } from '../../store/slices/currentSymbolSlice';
import { fetchText } from './../../store/slices/textSlice';
import PrintableText from './PrintableText/index';


const useStyles = makeStyles({
    FormTypingText_wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    inputWord: {
        maxWidth: "400px",
        width: "100%"
    },
    errorText: {
        backgroundColor: "#ffd2d7",
    }

})

const FormTypingText = ({ printingText }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const textFieldInputRef = useRef(null)

    const [value, setValue] = useState('')
    const [isErrorInput, setIsErrorInput] = useState(false)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [words, setWords] = useState([])

    const { timerIsStarted } = useSelector(state => state.timer)

    useEffect(() => {
        if (timerIsStarted) {
            textFieldInputRef.current.focus()
        }
    }, [timerIsStarted])

    useEffect(() => {
        startNewText()
    }, [printingText])

    useEffect(() => {
        if (words.length === 0) return
        if (words.length === currentWordIndex) return clearFromTypingText()

        dispatch(currentSymbolActions.setCurrentSymbol(words[currentWordIndex][0]))
    }, [currentWordIndex])

    const startNewText = () => {
        const newWords = printingText.split(" ")
        setWords(newWords)
        dispatch(currentSymbolActions.setCurrentSymbol(newWords[0][0]))
    }

    const clearFromTypingText = () => {
        dispatch(fetchText())
        setCurrentWordIndex(0);
        dispatch(mistakesActions.setMistakes(0))
    }

    const handlerInputChange = (e) => {
        const currentValue = e.target.value
        setValue(currentValue)

        const lastSymbol = currentValue[currentValue.length - 1]
        const wordInValue = currentValue.substring(0, currentValue.length - 1)
        
        if (words[currentWordIndex].startsWith(currentValue)
            || lastSymbol === " " && words[currentWordIndex] === wordInValue
        ) {
            setIsErrorInput(false)

            if (lastSymbol === " ") {
                setCurrentWordIndex(prev => prev += 1)
                setValue('')
            }

            const currentSymbol = words[currentWordIndex][currentValue.length]

            if (currentSymbol === undefined)
                return dispatch(currentSymbolActions.setCurrentSymbol("Space"))

            dispatch(currentSymbolActions.setCurrentSymbol(currentSymbol))
        }
        else {
            !isErrorInput && dispatch(mistakesActions.increment())
            setIsErrorInput(true)
        }
    }

    return (
        <div className={classes.FormTypingText_wrapper}>
            <PrintableText currentWordIndex={currentWordIndex} words={words} isError={isErrorInput} />
            <TextField
                inputRef={textFieldInputRef}
                label="Введите текст..."
                className={classes.inputWord}
                variant='outlined'
                type="text"
                error={isErrorInput}
                value={value}
                onChange={(e) => { handlerInputChange(e) }} />
        </div>

    )
}

export default FormTypingText