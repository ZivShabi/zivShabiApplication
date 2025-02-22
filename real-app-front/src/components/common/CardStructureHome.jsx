

import "../../css/cardStructureHome.css"
import { useNavigate } from 'react-router-dom'
function CardStructureHome({ cardData, onLike, onDelete }) {

    const { imageSrc, alt,
        title, description,
        email, web,
        openingText, phone,
        addressLine1, addressLine2,
        city, state, zip, creatorId, liked, likesCount } = cardData

    const navigate = useNavigate()
    const address = ` ${addressLine1} ${addressLine2} ${city} ${state} ${zip}`

    return (<div className="business-card containerCards">
        <div className="business-card-image-wrapper">
            {imageSrc ? (
                <img className="business-card-image"
                    src={imageSrc} alt={alt || title}
                />
            ) : ('')}
        </div>
        <div className="business-card-content">

            <h2 className="business-card-title">{title}</h2>
            <p className="business-card-opening-text">{openingText}</p>
            <div className=""><p className="business-card-description">{description}</p></div>
            <div className="emailWeb">
                <div className="">
                    <a href={`mailto:${email}`} className="business-card-email">
                        <i className="bi bi-envelope-fill"></i> {email}
                    </a>
                </div>
                {web && (
                    <a href={web} target="_blank" rel="noopener noreferrer"
                        className="business-card-web">
                        <i className="bi bi-globe"></i> {web}
                    </a>
                )}
            </div>

            <div className="business-card-contact">
                <a href={`tel:${phone}`} className="business-card-phone">
                    <i className="bi bi-telephone-fill"></i> {phone}
                </a>
                <a href={`https://maps.google.com/?q=${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="business-card-address" >
                    <i className="bi bi-geo-alt-fill"></i>
                    <div className="">{address}</div>
                </a>
                <div className="buttons">
                    <button
                        className={`btn ${liked ? "btn-outline-danger" : "btn-outline-primary"} like-button`}
                        onClick={onLike} >
                        {liked ? "" : ""} ({likesCount})
                        <i className={`bi ${liked ? "bi-hand-thumbs-down" : "bi-hand-thumbs-up"}`}></i>
                    </button>
                    <button className="btn btn-outline-danger like-button-danger"
                        onClick={onDelete} >  <i className="bi bi-trash3"></i>
                    </button>
                    <button className="btn btn-outline-success message-button"
                        onClick={() => navigate('/messages',
                            { state: { recipientId: creatorId } })}>
                        <i className="bi bi-chat-dots"></i>
                    </button>
                </div>
            </div>
        </div>
    </div >)
}
export default CardStructureHome