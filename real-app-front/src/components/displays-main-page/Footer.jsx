import Logo from "./Logo";
import { useRatings } from "../../contexts/RatingsContext"
import '../../css/footer.css'
import { Link } from "react-router-dom"

function Footer() {
    const { averageRating } = useRatings()

    return (
        <footer className="border-top my-2 text-center ">
            <div className="container-footer">
                <div className="logo">
                    <Link to="/" className="navbar-brand mb-4">  <Logo /></Link>

                    <span className="mx-2">&copy;</span>
                    <span>{new Date().getUTCFullYear()}</span>
                </div>
                <Link to="/sign-out" className="navbar-brand mb-4">
                    <div className="siteRating">
                        {averageRating !== null && (
                            <h2 className="average-rating">
                                <div className="Average">
                                    <samp> Average Rating</samp>
                                    <samp>{averageRating}</samp>
                                    <span>
                                        {Array.from({ length: Math.floor(averageRating) }, (_, i) => (
                                            <i key={i} className="bi bi-star-fill"></i>
                                        ))}

                                        {Array.from({ length: 5 - Math.floor(averageRating) }, (_, i) => (
                                            <i key={i} className="bi bi-star"></i>
                                        ))}
                                    </span>
                                </div>
                            </h2>

                        )}

                    </div>
                </Link>
            </div>
        </footer>
    );
}

export default Footer;