import { Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import FormTypingText from '../FormTypingText'
import Keyboard from '../Keyboard'

const StartPrintingText = () => {

    const [keyboardActive, setKeyboardActive] = useState(false)
	const { text, isLoading, error } = useAppSelector(state => state.statatistics)
    
    return (
        <React.Fragment>
            {isLoading
            ? <Typography variant='h5'>Загрузка...</Typography>
            : <FormTypingText printingText={text} />}
            <Button onClick={() => setKeyboardActive(prev => !prev)} variant='outlined' >{keyboardActive ? "Закрыть" : "Открыть клавиатуру"}</Button>
            {keyboardActive && <Keyboard />}
        </React.Fragment>
	)
}

export default StartPrintingText