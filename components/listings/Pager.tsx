import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

type Props = {
    total : number,
    handler : Function,
    current : object
}

const Pager = ({ total, handler, current }: Props) => {
    return (
        <div className="pager">
            <button onClick={() => handler("prev")}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <span>{current.start}-{current.current} of {total}</span>
            <button onClick={() => handler("next")}><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
    )
}

export default Pager