import React from 'react'
import Link from 'next/link'

const Menu = () => {
    return (
        <ul className={"menu"}>
            <li>
                <Link href={{pathname:"/"}}>
                    <a className={'font-black'}>
                        Recherche par commune
                    </a>
                </Link>
            </li>
            <li>
                <Link href={{pathname:"/candidat"}}>
                    <a className={'font-black'}>
                        Recherche par candidat
                    </a>
                </Link>
            </li>
        </ul>
    )
}

export default Menu
