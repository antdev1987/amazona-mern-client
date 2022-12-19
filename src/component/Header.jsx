import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <Link to='/' >Amazona</Link>

            </header>
            <main>

            <Outlet />
            </main>
        </>
    )
}

export default Header