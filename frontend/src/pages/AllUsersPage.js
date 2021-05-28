import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, changeAdminStatus, deleteUserByAdmin } from '../actions/userActions'
import { Table } from 'react-bootstrap'
import Message from '../components/Message';
import { Spinner } from 'react-bootstrap'


function AllUsersPage({ history }) {

    const dispatch = useDispatch()

    const [cloneId, setCloneId] = useState(0)
    const [cloneUserName, setCloneUserName] = useState("")

    // modal state and functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // allUsersDetailReducer
    const allUsersDetailReducer = useSelector(state => state.allUsersDetailReducer)
    const { users, error, loading } = allUsersDetailReducer

    // changeAdminStatusReducer 
    const changeAdminStatusReducer = useSelector(state => state.changeAdminStatusReducer)
    const { user: userAdmin, loading: loadingUserStatus } = changeAdminStatusReducer

    // deleteUserByAdminReducer
    const deleteUserByAdminReducer = useSelector(state => state.deleteUserByAdminReducer)
    const { success, loading: loadingDeleteStatus } = deleteUserByAdminReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(getAllUsers())
        }
    }, [history, userInfo, userAdmin, success, dispatch])

    const switchUserStatus = (user, status) => {
        if (user.id === userInfo.id) {
            alert("Cannot change admin status of Currently logged in User!")
            handleClose()
        } else {
            const userData = {
                email: user.email,
                id: user.id,
                isAdmin: status,
                name: user.name,
                username: user.username
            }
            dispatch(changeAdminStatus(userData))
        }
    }

    // user delete modal
    const userDeleteModalHandlder = (user) => {
        if (user.id === userInfo.id) {
            alert("Cannot delete Currently logged in User!")
            handleClose()
        } else {
            setCloneId(user.id)
            setCloneUserName(user.username)
            handleShow()
        }
    }

    // user delete confirmation
    const confirmDelete = (id) => {
        dispatch(deleteUserByAdmin(id))
        handleClose()
    }

    return (
        <div>

            {/* Modal Start*/}
            <div>
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <i style={{ color: "#e6e600" }} className="fas fa-exclamation-triangle"></i>
                                {" "}
                                Delete Confirmation
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete the user "{cloneUserName}"?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => confirmDelete(cloneId)}>
                                Confirm Delete
                                        </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Cancel
                                        </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>

            {/* Modal End */}

            {loading && <span style = {{ display: "flex" }}><h5>Please wait</h5><span className = "ml-2"><Spinner animation="border" /></span></span>}
            {loadingUserStatus && <span style = {{ display: "flex" }}><h5>Updating User Status</h5><span className = "ml-2"><Spinner animation="border" /></span></span>}
            {loadingDeleteStatus && <span style = {{ display: "flex" }}><h5>Deleting User</h5><span className = "ml-2"><Spinner animation="border" /></span></span>}
            {error ? <Message variant='danger'>{error}</Message> :
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="p-3 bg-info text-white">
                                <th>User Id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Change Admin Status</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        {users.map((user, idx) => (
                            <tbody key = {idx}>
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                                    <td>
                                        {user.isAdmin ?
                                            <button
                                                className="btn btn-outline-success btn-block btn-sm"
                                                onClick={() => switchUserStatus(user, false)}
                                            >Demote to User</button>
                                            :
                                            <button
                                                className="btn btn-outline-success btn-block btn-sm"
                                                onClick={() => switchUserStatus(user, true)}
                                            >Promote to Admin</button>
                                        }
                                    </td>
                                    <td>
                                        <div className="buttons-width-css d-flex justify-content-center">
                                            <span
                                                onClick={() => userDeleteModalHandlder(user)}>
                                                <i
                                                    title="delete user"
                                                    className="fas fa-trash-alt fa-lg user-delete-button"
                                                ></i>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </div>
            }
        </div>
    )
}

export default AllUsersPage
