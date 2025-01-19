import UserProfilePicture from './UserProfilePicture'
import { useAuth } from '../../contexts/User.Identification'
import ChangePassword from './ChangePassword'
function EditingProfile() {
    const { user } = useAuth()
    return (<div className="container-Editing-Profile">
        <div className="profilePicture">
            <UserProfilePicture
                // id={user === user.id ? true : false}
                id='677c333de91679db76ddf13d'
                profileImage=''>
            </UserProfilePicture>
        </div>
        <div className="changePassword">
            <ChangePassword></ChangePassword>
        </div>

    </div>)
}
export default EditingProfile

