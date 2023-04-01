import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Key from './Key/index';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    row: {
        display: "flex",
        justifyContent: "space-between"
    }
})

const KeyboardRow = ({ lettersRow }) => {
    const classes = useStyles()
    const state = useSelector(state => state.currentSymbol)

    const symbolAndCtrl = (symbol) => {
        switch (symbol) {
            case "!":
                return ["Shift", "1"]
            case "\"":
                return ["Shift", "2"]
            case ";":
                return ["Shift", "4"]
            case "%":
                return ["Shift", "5"]
            case ":":
                return ["Shift", "6"]
            case "?":
                return ["Shift", "7"]
            case "*":
                return ["Shift", "8"]
            case "(":
                return ["Shift", "9"]
            case ")":
                return ["Shift", "0"]
            case "-":
                return ["-"]
            case ",":
                return ["Shift", "."]
            case symbol.toUpperCase():
                return ["Shift", symbol.toLowerCase()] 
                
            default: 
                return [symbol]
        }
        
    }

    return (
        <div className={classes.row}>
            { lettersRow.map(((letter, index) => 
                <Key 
                    active={ symbolAndCtrl(state.currentSymbol).indexOf(letter) != -1}
                    content={letter} 
                    key={index+Date.now()} 
                    flexGrow={letter === "Space" ? "50" : "0"} />
            )) }
        </div>
    )
}

export default KeyboardRow