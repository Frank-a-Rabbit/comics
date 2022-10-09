import React, { useState, useEffect } from "react"

type DefaultSettings = {
    fetchUrl?: URL,
    limit?: number,
    offset?: number,
    creator?: string,
    character?: string,
    ts?: string,
    hash?: string
}

type Doc = {
    title : string
}

type Props = {
    fetchUrl : URL,
    ts : string,
    hash : string,
    limit : number,
    offset : number,
    creator : string,
    character : string,
    creatorId : string,
    characterId : string,
    docs : Doc[],
    total : number,
    setDocs : React.Dispatch<React.SetStateAction<Array<Doc>>>
    updateFilterCreator : React.Dispatch<React.SetStateAction<string>>
    updateFilterCharacter : React.Dispatch<React.SetStateAction<string>>
    updatePager : Function,
    current : object,
    steps : number,
    currentFilterState : boolean,
    setCharacterFilter : Function
}

const apiKeyPublic = process.env.NEXT_PUBLIC_API_KEY_PUBLIC
const apiKeyPrivate = process.env.NEXT_PUBLIC_API_KEY_PRIVATE

export const GetApiResults = ({ limit = 20, offset = 0, creator = "", character = "", fetchUrl = new URL("http://gateway.marvel.com/v1/public/comics"), ts = Date.now().toString(), hash = require("crypto").createHash("md5").update(ts+apiKeyPrivate+apiKeyPublic).digest("hex") }: DefaultSettings = {}): Props => {
    let [apiOffset, setOffset] = useState(offset)
    const [characterId, updateFilterCharacter] = useState(character)
    const [creatorId, updateFilterCreator] = useState(creator)
    fetchUrl.searchParams.set("hash", hash)
    fetchUrl.searchParams.set("ts", ts)
    fetchUrl.searchParams.set("apikey", apiKeyPublic.toString())
    fetchUrl.searchParams.set("limit", limit.toString())
    fetchUrl.searchParams.set("offset", apiOffset.toString())
    if (characterId) fetchUrl.searchParams.set("characters", characterId)
    if (creatorId) fetchUrl.searchParams.set("creators", creatorId)
    const [docs, setDocs] = useState([])
    const [total, setTotal] = useState([])
    const [current, setCurrent] = useState({
        start : 1,
        current : limit,
        steps : 0
    })
    const [currentFilterState, setFilterState] = useState(false)

    useEffect(() => {
        const queryApi = async () => {
            const query = await fetch(fetchUrl)
            const results = await query.json()
            setDocs(results.data.results)
            setTotal(results.data.total)
        }
        queryApi()
    }, [current, characterId, creatorId])

    const setCharacterFilter = (characterId) => {
        updateFilterCharacter(characterId)
    }
    const setCreatorFilter = (creatorId) => {
        updateFilterCreator(creatorId)
    }

    const updatePager = dir => {  
        if (dir === "next" && ((offset * current.steps) !== total)) {
            setCurrent({
                start : current.start += limit,
                current : current.current += limit,
                steps : current.steps += 1
            })

            setOffset(apiOffset += limit)
        } else if (dir === "prev" && (current.steps > 0)) { 
            setCurrent({
                start : current.start -= limit,
                current : current.current -= limit,
                steps : current.steps -= 1
            })
            setOffset(apiOffset -= limit)
         }
    }
    return { docs, total, offset, current, currentFilterState, updatePager, setCharacterFilter, setCreatorFilter, setFilterState }
}