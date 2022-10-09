import React from "react"
import Image from "next/image"
import Button from "@mui/material/Button"
import styles from "../styles/Header.module.css"

type Props = {
    logo : string
}

export const Header = ({ logo }: Props) => {
    return (
        <header className={styles.mainHeader}>
            <Image
                src={logo}
                alt="Comic Closet"
                width="110"
                height="110"
            ></Image>
            <Button variant="outlined">
                <span></span>
                <span></span>
                <span></span>
            </Button>
        </header>
    )
}