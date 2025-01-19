
import { useState, useEffect } from 'react'
import '../../css/adminSettings.css'
import PageHeader from '../common/PageHeader'
import UserEditFields from '../common/UserEditFields'
import UsersTable from '../common/UsersTable'
import { getMe } from '../../services/users/users'

function AdminSettings() {
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        try {
            const res = await getMe()
            setUsers(res || []);
        } catch (err) {
            console.error(err.message)
        }
    }

    function handleEditClick(user) {
        setEditingUser(user)
        setIsEditModalOpen(true)
    }

    function handleSubmitEdit(updatedUser) {
        setUsers((prevUsers) => prevUsers.map((user) => user._id === updatedUser._id ? updatedUser : user))
        setIsEditModalOpen(false)
    }

    return (
        <div className="container mt-4">
            {isEditModalOpen && (<UserEditFields
                user={editingUser}
                onSubmit={handleSubmitEdit}
                onClose={() => setIsEditModalOpen(false)}
            />)}
            <PageHeader title="Admin Settings" description="It is Users" />
            <UsersTable users={users} onEditClick={handleEditClick} />
        </div>
    )
}

export default AdminSettings
