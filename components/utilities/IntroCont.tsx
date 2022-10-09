import { useSlotProps } from "@mui/base"
import React from "react"

type Props = {
    preText : string,
    title : string,
    desc : string
}

const IntroCont = ({ preText, title, desc } : Props) => {
    return (
        <div className="intro-cont">
            <div>
                <h2>{preText}</h2>
                <h3>{title}</h3>
            </div>
            <p>{desc}</p>
        </div>
    )
}

export default IntroCont