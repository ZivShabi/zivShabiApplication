

import PageHeader from '../common/PageHeader';
import { useAuth } from '../../contexts/User.Identification';
import { useImageContext } from '../../contexts/ImageContext';
import { useNavigate } from 'react-router-dom';
import '../../css/friends.css';
import { useFriendRequest } from '../../contexts/FriendRequestContext'
function Friends() {
    const { user } = useAuth();
    const { image } = useImageContext();
    const userImage = image || user?.image?.url;
    const { friends } = useFriendRequest(); // קבלת רשימת החברים מהקונטקסט
    const navigate = useNavigate();


    if (!user) {
        return <div className="error-message">Please log in to see your friends.</div>;
    }

    return (
        <div className="container-friends">
            <PageHeader title="Friends" description="Your friends" />
            <div className="cards-grid">
                {friends.length > 0 ? (
                    friends.map(friend => (
                        <div key={friend._id} className="friend-card">
                            <h1>{friend.name.first} {friend.name.middle} {friend.name.last}</h1>
                            <p>{friend.isBusiness ? "Business" : "Private"}</p>
                            <p>{friend.role}</p>
                            <p>{friend.address.city}</p>
                            <p>{friend.address.street}</p>
                            <p>{friend.address.houseNumber}</p>
                            <p>{friend.email}</p>
                            <div className="friendsButtons">
                                <button
                                    className="btn btn-outline-success message-button"
                                    onClick={() => navigate('/messages', {
                                        state: { recipientId: friend._id }
                                    })}>
                                    <i className="bi bi-chat-dots"></i>
                                </button>
                            </div>
                            <div className='img'>
                                {userImage !== '-' ? (
                                    <img
                                        className="FriendsUserImg"
                                        src={userImage}
                                        alt={`${user?.name?.first || ''} ${user?.name?.last || ''}`} />
                                ) : ('-')}
                            </div>


                        </div>
                    ))
                ) : (
                    <div className="no-friends-message">No friends yet</div>
                )}
            </div>
        </div>
    );
}

export default Friends;
