import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'

interface IPropsFlexGrow {
    flexGrow: number 
}

const useStyles = makeStyles<Theme, IPropsFlexGrow>(theme => 
    createStyles({
        key: {
            textAlign: "center",
            padding: "3px",
            margin: "3px",
            borderRadius: "5px",
            border: "1px solid black",
            width: "100%", 
            flexBasis: "100px",
            flexGrow: ({flexGrow}) => flexGrow,   
        },
        key_active: {
            background: "#dfe1edbd"
        }
    }))

interface IKeyProps {
    content: string;
    flexGrow: number;
    active: boolean
}

const Key: FC<IKeyProps> = ({ content, flexGrow, active }) => {
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