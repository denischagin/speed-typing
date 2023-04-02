import { useState, Fragment, useRef, useEffect, FC, DOMElement, ChangeEvent, ChangeEventHandler } from 'react'
import { makeStyles, Typography, TextField, createTheme, ThemeProvider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { mistakesActions } from '../../store/slices/mistakesSlice';
import { currentSymbolActions } from '../../store/slices/currentSymbolSlice';
import { fetchText } from '../../store/slices/textSlice';
import PrintableText from './PrintableText/index';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { timerActions } from '../../store/slices/timerSlice';
import Statistics from './Statistics';


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

})

interface IFormTypingTextProps {
    printingText: string
}

const FormTypingText: FC<IFormTypingTextProps> = ({ printingText }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const textFieldInputRef = useRef<HTMLInputElement>(null)

    const [value, setValue] = useState('')
    const [isErrorInput, setIsErrorInput] = useState(false)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [words, setWords] = useState<string[]>([])
    const [statsPage, setStatsPage] = useState(false)

    const { timerIsStarted } = useAppSelector(state => state.timer)

    useEffect(() => {
        if (timerIsStarted) {
            textFieldInputRef.current?.focus()
        }
    }, [timerIsStarted])

    useEffect(() => {
        if (printingText == '') return
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

    const goToStats = () => {
        setStatsPage(true)
    }

    const clearFromTypingText = () => {
        dispatch(fetchText())
        setCurrentWordIndex(0);
        dispatch(mistakesActions.setMistakes(0))
        dispatch(timerActions.startStopTimer())
    }

    const onInputStart = (value: string) => {
        console.log(value, !timerIsStarted)
        if (!timerIsStarted && value.length === 1) dispatch(timerActions.startStopTimer())
    }

    const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value
        setValue(currentValue)
        onInputStart(currentValue);

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

            const currentSymbol: string | undefined = words[currentWordIndex][currentValue.length]

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlerInputChange(e) }} />
        </div>

    )
}

export default FormTypingText