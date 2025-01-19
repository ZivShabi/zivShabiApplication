import { useState } from 'react'

export function useNavbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    const toggleNavbar = () => {
        setIsNavbarOpen((prevState) => !prevState)
    }

    return {
        isNavbarOpen,
        toggleNavbar
    }
}
