import { makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles({
    key: {
        textAlign: "center",
        padding: "3px",
        margin: "3px",
        borderRadius: "5px",
        border: "1px solid black",
        width: "100%", 
        flexBasis: "100px",
        flexGrow: props => props.flexGrow,   
    },
    key_active: {
        background: "#dfe1edbd"
    }
})

const Key = ({ content, flexGrow, active }) => {
    const classes = useStyles({ flexGrow })

    const [keyClasses, setKeyClasses] = useState([classes.key])

    useEffect(() => {
        active && setKeyClasses(prev => [...prev, classes.key_active])
    }, [])

    return (
        <div className={keyClasses.join(" ")}>
            <Typography variant='subtitle1'>{content}</Typography>
        </div>
    )
}

export default Key