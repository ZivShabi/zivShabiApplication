import { NavLink } from 'react-router-dom'
import { useAuth } from "../../contexts/User.Identification";
import { linkadmin, linkHome, linkIdentity, linkLogout, linkCards } from '../../data/dataNavBar'
function NavbarLinks() {
    const { user } = useAuth()

    return (
        <div className="container d-flex flex-column align-items-center">
            <ul className="navbar-nav mb-3">
                {linkHome.map((link) => (
                    <li className="nav-item" key={link.to}>
                        <NavLink
                            to={link.to}
                            className="nav-link">
                            <i className={`bi ${link.icon}`}></i>
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            {!user ? (
                <> <ul className="navbar-nav mt-auto">
                    {linkIdentity.map((link) => (
                        <li className="nav-item" key={link.to}>
                            <NavLink
                                to={link.to}
                                className="nav-link">
                                <i className={`bi ${link.icon}`}></i>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                </>) : (<>

                    {user.isBusiness === true ?
                        <ul className="navbar-nav mt-auto"> {linkCards.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className="nav-link">
                                    <i className={`bi ${link.icon}`}></i>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))} </ul> : <p></p>
                    }

                    {user.role === 'admin' ?
                        <ul className="navbar-nav mt-auto"> {linkadmin.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className="nav-link">
                                    <i className={`bi ${link.icon}`}></i>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))} </ul> : <p></p>
                    }
                    <ul className="navbar-nav mt-auto">
                        {linkLogout.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className="nav-link">
                                    <i className={`bi ${link.icon}`}></i>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </>)}
        </div>
    )
}
export default NavbarLinks
