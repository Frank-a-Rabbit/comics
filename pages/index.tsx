import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Header } from "../components/Header"
import HeroImage from "../components/HeroImage"
import Layout from "../components/listings/Layout"

type Props = {
  resultsList : []
}

const Home: NextPage = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Comic Closet</title>
        <meta name="description" content="Search for all your favorite Marvel characters." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <section>
        <Header logo="/assets/logo.svg"></Header>
        <HeroImage src="/assets/hero-photo.png" wSm="375" hSm="450" wMd="1025" hMd="460" wLg="1440" hLg="650" accentImg="/assets/hero-pattern.png">
          <div>
            <h1>Comic Closet</h1>
          </div>
        </HeroImage>
        <Layout></Layout>
        <footer>
          <img src="/assets/logo.svg" width="110" height="110"></img>
          <div>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <p>Copyright 2022. Comic Closet LLC. All rights reserved.</p>
        </footer>
      </section>
    </div>
  )
}

export default Home
