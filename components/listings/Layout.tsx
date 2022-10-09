import React, { useRef, useEffect, useState, useContext } from "react"
import IntroCont from "../utilities/IntroCont"
import Filters from "./Filters"
import Favorites from "../Favorites"
import Pager from "./Pager"
import Card from "@mui/material/Card"
import { CardContent, Typography, CardMedia } from "@mui/material"
import CardActions from '@mui/material/CardActions'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { themeOptions } from "../../themes/BaseTheme"
import Image from "next/image"
import styles from "../../styles/Layout.module.css"
import { GetApiResults } from "../../apiHook/ApiUrl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt } from "@fortawesome/free-solid-svg-icons"

const theme = createTheme(themeOptions)

const Layout = () => {
    const { docs, total, current, updatePager, setCharacterFilter, setCreatorFilter, setFilterState, currentFilterState } = GetApiResults({limit : 15, offset : 0, creator : "", character : ""})

    const [favoritesList, setFavorites] = useState<any>([])
    const [favoritesIds, addToFavs] = useState([])

    const initRender = useRef(true)
    useEffect(() => {
        if (initRender.current) {
            const listFromStorage = localStorage.getItem("favorites")
            if (listFromStorage) {
                let parseData = JSON.parse(listFromStorage)
                let storedIds = [] 
                parseData.forEach(d => storedIds.push(d.id))
                if (storedIds.length > 0) {
                    addToFavs(prev => [...prev, ...storedIds])
                }
                setFavorites(JSON.parse(listFromStorage))
            }
        }
        initRender.current = false
    }, [])   

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favoritesList))
    }, [favoritesList])

    const toggleFavoritesIds = (comic) => {
        if (favoritesIds.includes(comic)) {
            addToFavs(prev => prev.filter(p => p !== comic))
        } else {
            addToFavs(prev => [...prev, comic])
        }
    }

    const favoritesHandler = (comic) => {
        if (favoritesList.length > 0) {
            let arr:[] = []
            favoritesList.forEach(f => {
                arr.push(f.id)
            })
            if (favoritesIds.includes(comic.id)) {
                setFavorites(favoritesList.filter(f => f.id !== comic.id))
            } else {
                setFavorites(prev => [...prev, comic])
            }
        } else {
            setFavorites([comic])
        }
        toggleFavoritesIds(comic.id)
    }
    const removeFavorites = (comic) => {
        console.log("Remove")
        if (favoritesList.length < 10) toggleFavoritesIds(comic.id)
        let temp = favoritesList.filter(f => f.id !== comic.id)
        setFavorites(temp)
    }

    const [currentFaveState, toggleFaves] = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.layoutList}>
                <IntroCont preText="New Comics!" title="Comic Closet" desc="Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit."></IntroCont>
                <div className={styles.headerFaves}>
                    <FontAwesomeIcon icon={ faBolt }></FontAwesomeIcon>
                    <span>({favoritesList.length})</span>
                </div>
                <div className={styles.gridCont}>
                    <Filters theme={theme} characterHandler={setCharacterFilter} creatorHandler={setCreatorFilter} toggleFilter={setFilterState} filterState={currentFilterState} toggleFaves={toggleFaves} faveState={currentFaveState}></Filters>
                    <Favorites favorites={favoritesList} favoritesHandler={removeFavorites} theme={theme} currentState={currentFaveState} hideFaves={toggleFaves}></Favorites>
                    <ul className={styles.grid}>
                        {docs.map(r => {
                            return (
                                <li key={r.id}>
                                    <Card>
                                        <CardContent sx={{"position": "relative"}}>
                                            <Typography variant="h4"
                                                sx={{
                                                    fontFamily: "Montserrat",
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    lineHeight: "19px",
                                                    margin: "0 0 15px"
                                                }}
                                            >{r.title}</Typography>
                                            <div className={styles.info}>
                                                <h5>
                                                    <span>Issue: </span>
                                                    <span>{r.issueNumber}</span>
                                                </h5>
                                                {r.creators?.items?.length > 0 &&
                                                    <h5 className={styles.creator}>
                                                        <span>Creators: </span>
                                                        <span>{r.creators.items.map(c => c.name).join(", ")}</span>
                                                    </h5>
                                                }
                                            </div>
                                            <CardActions sx={{
                                                position: "absolute",
                                                width: 30,
                                                height: 30,
                                                borderRadius: "100%",
                                                bgcolor: favoritesIds.includes(r.id) ? theme.palette.secondary.main : theme.palette.primary.main,
                                                color: "white",
                                                zIndex: 1,
                                                top: {
                                                    mobile: "50%",
                                                    tablet: 0
                                                },
                                                transform: {
                                                    mobile: "translate(50%, -50%)"
                                                },
                                                right: {
                                                    mobile: 0,
                                                    tablet: "50%"
                                                }
                                            }}
                                                onClick={function() {
                                                    let favObj = {
                                                        id : r.id,
                                                        thumbnail : r.thumbnail.path+"."+r.thumbnail.extension,
                                                        title : r.title,
                                                        issue : r.issueNumber
                                                    }
                                                    if (favoritesList.length < 10) {
                                                        favoritesHandler(favObj)
                                                    } else {
                                                        removeFavorites(favObj)
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faBolt} />
                                            </CardActions>
                                        </CardContent>
                                        <CardMedia title="Your title">
                                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                <Image alt={r.title} src={r.thumbnail.path+"."+r.thumbnail.extension} layout="responsive" width="125" height="190" objectFit="cover" />
                                            </div>
                                        </CardMedia>
                                    </Card>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <Pager handler={updatePager} total={total} current={current} ></Pager>
            </div>
        </ThemeProvider>
    )
}

export default Layout