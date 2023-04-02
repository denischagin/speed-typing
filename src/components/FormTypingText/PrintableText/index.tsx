import React, { FC, Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    spanPrintedText: {
        backgroundColor: "#dfe1ed",
        boxShadow: "0px 0px 2px black",

        padding: "2px 4px",
        margin: '0px 2px',
        lineHeight: "1.8",

        borderRadius: "4px",
    },
    spanText: {
        display: "inline-block",

        padding: "2px 4px",
        margin: '0px 2px',
        lineHeight: "1.8",

        backgroundColor: "white",
    },
    commonText: {
        fontSize: "20px",
    },
    errorText: {
        backgroundColor: "#ffd2d7",
    }
})

interface IPrintableTextProps {
    words: string[],
    currentWordIndex: number,
    isError: boolean
}

const PrintableText: FC<IPrintableTextProps> = ({ words, currentWordIndex, isError }) => {
    const classes = useStyles();

    return (
        <Typography variant='body1' className={classes.commonText}>
            {words.map((word, index) =>
                index === currentWordIndex
                    ?
                    <Fragment key={index}>
                        <span className={!isError ? classes.spanPrintedText : [classes.spanPrintedText, classes.errorText].join(" ")}>{word}</span>
                        <span>&nbsp;</span>
                    </Fragment>
                    : <span key={index} className={classes.spanText}>{word} </span>
            )}
        </Typography>
    )
}

export default PrintableText