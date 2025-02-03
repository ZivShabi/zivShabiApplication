import '../../css/navBar.css'
import { Link } from "react-router-dom"
import Profile from "./Profile"
import { useNavbar } from '../../hooks/useNavbar'
import NavbarLinks from '../common/NavbarLinks'
import BrightnessMode from '../common/BrightnessMode'
import { useAuth } from '../../contexts/User.Identification'
import { useImageContext } from '../../contexts/ImageContext';
function NavBar() {
    const { isNavbarOpen, toggleNavbar } = useNavbar()
    const { user } = useAuth()
    return (
        <nav className="navbar navbar-expand-lg 
        navbar-light bg-light shadow side-navbar ">

            <div className="">
                {user ? <Link to="/" className="navbar-brand mb-4"> <Profile /> </Link> : ''}
                <BrightnessMode />
            </div>

            <button className="navbar-toggler"
                type="button"
                onClick={toggleNavbar}
                aria-controls="navbarsExample05"
                aria-expanded={isNavbarOpen ? "true" : "false"}
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse 
                    ${isNavbarOpen ? 'show' : ''}`}
                id="navbarsExample05">
                <NavbarLinks />
            </div>
        </nav>
    )
} export default NavBar
