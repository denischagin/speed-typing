import React from 'react'
import { makeStyles } from '@material-ui/core';
import Key from './KeyboardRow/Key';
import KeyboardRow from './KeyboardRow';

const useStyles = makeStyles({
    keyboard_wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    keyboard_row: {
        display: "flex"
    }
})

const Keyboard = () => {
    const classes = useStyles();
    
    const keyboardRows = [
        ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\"],
        ["Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
        ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift"],
        ["Ctrl", "Win", "Alt", "Space", "Alt", "Win", "Ctrl"],
    ]

    return (
        <div className={classes.keyboard_wrapper}>
            { keyboardRows.map((row, index) => 
                <KeyboardRow lettersRow={row} key={row} />
            )}
        </div>
    )
}

export default Keyboard