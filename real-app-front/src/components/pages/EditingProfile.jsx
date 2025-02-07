import { useAuth } from '../../contexts/User.Identification'
import UserProfilePicture from './UserProfilePicture'
import ChangePassword from './ChangePassword'
import DeleteUser from '../common/DeleteUser'

function EditingProfile() {
    const { user } = useAuth()
    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div className="container-Editing-Profile">
            <div className="profilePicture">
                <UserProfilePicture
                    id={user._id}  // לוודא שאתה שולח את ה-ID הנכון
                    imageUrl={user.profileImage || '/default-profile.png'}
                />

            </div>
            <div className="changePassword">
                <ChangePassword />
            </div>

            <div className="">
                <DeleteUser />
            </div>
        </div>
    )
}
export default EditingProfile
