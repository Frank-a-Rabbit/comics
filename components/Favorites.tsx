import React, { useEffect } from "react"
import Card from "@mui/material/Card"
import { CardContent, Typography, CardMedia } from "@mui/material"
import Image from "next/image"
import styles from "../styles/Favorites.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt } from "@fortawesome/free-solid-svg-icons"

type Props = {
    favorites : Array<any>,
    favoritesHandler : Function,
    currentState : boolean,
    hideFaves : Function
}

const Favorites = ({ favorites, favoritesHandler, theme, currentState, hideFaves }: Props) => {
    return (
        <div className={currentState ? styles.show : styles.hide}>
            <div className={styles.favoritesCont}>
                <Typography 
                    variant="h4"
                    sx={{
                        color: "white",
                        fontSize: "25px",
                        lineHeight: "30px",
                        fontWeight: 900,
                        margin: "0 0 40px 20px"
                    }}
                >Favorites</Typography>
                <ul>
                    {favorites.map(f => {
                        return (
                            <li key={f.id}>
                                <Card>
                                    <button onClick={() => favoritesHandler(f)}>X</button>
                                    <CardMedia title="Your title">
                                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                            <Image alt={f.title} src={f.thumbnail} layout="intrinsic" width="50" height="75" objectFit="cover" />
                                        </div>
                                    </CardMedia>
                                    <div>
                                        <Typography
                                            variant="h6"
                                            sx={{color: "white", fontSize: "14px", lineHeight: "16px", margin: "0 0 8px"}}
                                        >{f.title}</Typography>
                                        <Typography
                                            component={"span"}
                                            sx={{color: "white", fontSize: "14px", lineHeight: "17px"}}
                                        >Issue: {f.issue}</Typography>
                                    </div>
                                </Card>
                            </li>
                        )
                    })}
                </ul>
                <button className={styles.close} onClick={() => hideFaves()}>Hide Favorites
                    <FontAwesomeIcon icon={faBolt} />
                </button>
            </div>
        </div>
    )
}

export default Favorites