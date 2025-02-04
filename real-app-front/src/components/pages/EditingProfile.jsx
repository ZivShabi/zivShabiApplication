import UserProfilePicture from './UserProfilePicture'
import { useAuth } from '../../contexts/User.Identification'
import ChangePassword from './ChangePassword'
// function EditingProfile() {
//     const { user } = useAuth()
//     if (!user) {
//         return <p>Loading...</p>
//     }
//     console.log("User in EditingProfile:", user)

//     return (<div className="container-Editing-Profile">
//         <div className="profilePicture">
//             <UserProfilePicture
//                 id={user?.id}
//                 profileImage={user?.profileImage || '/default-profile.png'}>
//             </UserProfilePicture>
//         </div>
//         <div className="changePassword">
//             <ChangePassword />
//         </div>

//     </div>)
// }


function EditingProfile() {
    const { user } = useAuth()
    if (!user) {
        return <p>Loading...</p>
    }

    console.log('User in EditingProfile:', user) // בדוק את הנתונים של המשתמש

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
        </div>
    )
}
export default EditingProfile
