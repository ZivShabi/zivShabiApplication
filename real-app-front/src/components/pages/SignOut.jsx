import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/User.Identification"
import { useRatings } from "../../contexts/RatingsContext"
import PageHeader from "../common/PageHeader"
import "../../css/SignOut.css"

function SignOut() {
    const [isSigningOut, setIsSigningOut] = useState(false)
    const [rating, setRating] = useState(null)
    const [showModal, setShowModal] = useState(false) // להצגת המודל
    const { logout } = useAuth()
    const { averageRating, submitRating } = useRatings()
    const navigate = useNavigate()

    function handleShowModal() {
        setShowModal(true)
    }

    async function handleSignOut() {
        setIsSigningOut(true)
        try {
            if (rating) {
                await submitRating(rating)
            }
            await logout()
            navigate("/sign-in")
        } catch (error) {
            console.error("Error during sign out", error)
        } finally {
            setIsSigningOut(false)
        }
    }

    return (
        <div className="container-Out-Page">
            <PageHeader title="Sign Out" description="We'd love feedback" />

            <div className="rating-section">
                <h2>How would you rate your experience?</h2>
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <i
                            key={star}
                            className={`bi bi-star${rating >= star ? "-fill" : ""}`}
                            onClick={() => setRating(star)}
                        ></i>
                    ))}
                </div>

            </div>

            <button className={`btn ${isSigningOut ? "disabled" : "btn-outline-info"}`}
                onClick={handleShowModal}
                disabled={isSigningOut} >
                {isSigningOut ? (<>
                    <i className="bi bi-arrow-repeat spinner-grow spinner-grow-sm me-2"></i>
                    Signing Out...
                </>) : (<>
                    <i className="bi bi-box-arrow-right me-2 "></i> Sign Out
                </>)}
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Would you like to rate us before signing out?</h2>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                    key={star}
                                    className={`bi bi-star${rating >= star ? "-fill" : ""}`}
                                    onClick={() => setRating(star)}
                                ></i>
                            ))}
                        </div>
                        <div className="modal-buttons">
                            <button className="btn btn-primary" onClick={handleSignOut}>
                                Skip and Sign Out
                            </button>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                stay on site
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignOut
