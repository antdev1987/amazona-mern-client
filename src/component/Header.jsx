import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <header>
                <div className='container-lg'>
                    <Link to='/' >Amazona</Link>
                </div>
            </header>

            <main className='container-lg flex-fill'>
                <Outlet />
            </main>

            <footer>
                <div className='text-center'>All rights reserved</div>
            </footer>
        </div>
    )
}

export default Header