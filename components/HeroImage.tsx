import styled from "styled-components"
import { themeOptions } from "../themes/BaseTheme"

const palette = themeOptions.palette;

const HeroImage = styled.div`
    & {
        position: relative;
        background: url(${props => props.src}) center top / cover no-repeat;
        aspect-ratio: ${props => props.wSm} / ${props => props.hSm};
        overflow: hidden;
    }
    &:after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 0;
        width: 100%;
        height: 30%;
        background: url(${props => props.accentImg}) center / cover repeat-x;
        z-index: 2;
    }
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%);
        z-index: 1;
    }
    h1 {
        font: var(--font-montserrat);
        font-size: 27px;
        text-shadow: 3px 3px 1px rgba(0,0,0,0.7);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 800;
        margin: 0;
    }
    > div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        padding: 18px 28px;
        width: max-content;
        background: ${palette.secondary.transparent}
    }
    @media(min-width: 641px) {
        & {
            aspect-ratio: ${props => props.wMd} / ${props => props.hMd};
        }
    }
    @media(min-width: 1025px) {
        & {
            aspect-ratio: ${props => props.wLg} / ${props => props.hLg};
        },
        h1 {
            font-size: 61px;
            line-height: 74px;
        }
    }
`

export default HeroImage 