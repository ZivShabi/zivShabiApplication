import { useAuth } from '../../contexts/User.Identification'
import { deleteUserAccount } from '../../services/users/users'
import { useNavigate } from "react-router-dom"
import PageHeader from "../common/PageHeader"


function DeleteUser() {
    const { user, setUser } = useAuth()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (!user?._id) return;

        try {
            await deleteUserAccount(user._id)
            navigate('/')
            setUser(null)
        } catch (error) {
            console.error("שגיאה במחיקת החשבון", error)
        }
    }
    return (
        <div className="containerDeleteUser">
            <PageHeader title="Your user can be deleted"
                description="If you are sure you want to delete the user click here"
            />
            <div className="buttonDeleteuser">
                <button
                    onClick={handleDelete}
                    className="btn btn-outline-danger like-button-danger" >
                    <i className="bi bi-person-x"></i>
                </button>
            </div>
        </div>
    )
}
export default DeleteUser