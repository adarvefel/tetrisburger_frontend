    import React from 'react'
    import "./navbar.css"
    import { useAuthStore } from '../../store/useAuthStore'
    import NavbarAuthenticated from './navbarAuthenticated/NavbarAuthenticated';
    import NavbarNotAuthenticated from './navbarNotAuthenticated/NavbarNotAuthenticated';


    export default function Navbar() {

        const {isAuthenticated} = useAuthStore();

        return (
            <>
                {isAuthenticated ? <NavbarAuthenticated/> : <NavbarNotAuthenticated/>}
            </>
        )
    }
