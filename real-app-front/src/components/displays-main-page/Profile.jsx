import { useAuth } from '../../contexts/User.Identification'
import { useImageContext } from '../../contexts/ImageContext';

function Profile() {
    const { user } = useAuth()
    const { image } = useImageContext();
    const profileImage = image || user?.image?.url;

    return (
        <div>
            {profileImage ? (
                <img
                    className="userImg"
                    src={profileImage}
                    alt={`${user?.name?.first || ''} ${user?.name?.last || ''}`}
                />
            ) : ('-')}

        </div>
    );
}
export default Profile