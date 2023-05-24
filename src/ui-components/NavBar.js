import React from 'react';


const NavBar = () => {
    return (
        <div>
            <nav className='navs'>
                <div className='leftNavItems'><span className='companyLogo'>SCAVENGER</span></div>
                <div className='rightNavItems'><span className='menuDots'>...</span></div>
                <div className='rightNavItems'><span className='profile'>E</span></div>
            </nav>
        </div>
    )
}

export default NavBar