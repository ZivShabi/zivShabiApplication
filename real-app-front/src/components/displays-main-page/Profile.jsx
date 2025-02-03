import { useAuth } from '../../contexts/User.Identification'
import { useImageContext } from '../../contexts/ImageContext'
import { getUserById } from '../../services/users/users'

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
            <div className="">
                <p className="userName">
                    {`${user?.name?.first || ''} ${user?.name?.last || ''}`}
                </p>
            </div>

        </div>
    );
}
export default Profile