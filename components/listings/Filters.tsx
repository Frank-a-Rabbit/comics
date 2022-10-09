import React from "react"
import Box from "@mui/material/Box"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faFilter } from "@fortawesome/free-solid-svg-icons"
import styles from "../../styles/Filters.module.css"

const FilterPane = ({ theme, characterHandler, creatorHandler, toggleFilter, filterState, toggleFaves, faveState }) => {
    const heros = [
        {name : "Iron Man", id: 1009368},
        {name : "Captain America", id: 1009220},
        {name : "Thor", id: 1009664},
        {name : "Deadpool", id: 1009268},
        {name : "Scarlet Witch", id: 1009562},
        {name : "Black Widow", id: 1009189},
        {name : "Wasp", id: 1009707},
        {name : "Gamora", id: 1010763}
    ]
    const creators = [
        {name : "Kate Leth", id : 12787},
        {name : "Brian Michael Bendis", id : 24},
        {name : "Stan Lee", id : 30},
        {name : "Steve Ditko", id : 32},
        {name : "Jack Kirby", id : 196}
    ]

    return (
        <Box
            position="relative"
            sx={{
                py: theme.spacing(2),
                px: theme.spacing(1),
                bgcolor: theme.palette.background,
                fontFamily: "Montserrat",
                margin: {
                    mobile: "0 auto",
                    tablet: "0 0 0 auto"
                },
                maxWidth: {
                    tablet: "995px"
                },
                width: "100%",
                display: {
                    laptop: "grid"
                },
                gridTemplateColumns: {
                    laptop: "max-content 1fr"
                }
            }}
        >
            <div className={styles.filterCont}>
                <button onClick={() => toggleFilter(!filterState)}>
                    Filter
                    <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                </button>
                <button onClick={() => toggleFaves(!faveState)}>
                    Show Favorites
                    <FontAwesomeIcon icon={faBolt}></FontAwesomeIcon>
                </button>
            </div>
            <div className={filterState ? styles.show : styles.hide}>
                <div className={styles.selectCont}>
                    <select name="heros" id="heros" onChange={e => characterHandler(e.target.value)}>
                        <option selected disabled>Character</option>
                        {heros.map(h => {
                            return <option key={h.id} value={h.id}>{h.name}</option>
                        })}
                    </select>
                    <select name="creators" id="creators" onChange={e => creatorHandler(e.target.value)}>
                    <option selected disabled>Creator</option>
                        {creators.map(c => {
                            return <option key={c.id} value={c.id}>{c.name}</option>
                        })}
                    </select>
                </div>
            </div>
        </Box>
    )
}

export default FilterPane