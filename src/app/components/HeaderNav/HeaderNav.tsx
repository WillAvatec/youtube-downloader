"use client"

import Link from "next/link";
import styles from "@/app/components/HeaderNav/styles.module.css"
import useScroll from "@/app/hooks/useScroll";

export default function HeaderNav() {

    const scroll = useScroll();
    const headerBackgroundClass = scroll ? styles.header_hide : styles.header_show

    return (
        <div className={styles.wrapper}>
            <header className={`${styles.header} ${headerBackgroundClass}`}>
                <Link href="/">
                    <h1>noTube</h1>
                </Link>
                <nav className={styles.nav}>
                    <ul>
                        <Link href="/">Pagina de Inicio</Link>
                    </ul>
                    <ul>
                        <Link href="/">Preguntas Frecuentes</Link>
                    </ul>
                    <ul>
                        <Link href="/">Sitios Compatibles</Link>
                    </ul>
                    <ul>
                        <Link href="/">Blog</Link>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
