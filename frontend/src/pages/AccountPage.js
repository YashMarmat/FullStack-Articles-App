import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccount, deleteUserAccount } from '../actions/userActions'
import { UPDATE_USER_ACCOUNT_RESET } from '../constants'


function AccountPage({ history }) {
    const dispatch = useDispatch()

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // reducer
    const getAccountReducer = useSelector(state => state.getAccountReducer)
    const { user } = getAccountReducer

    const [myPassword, setMyPassword] = useState("")

    // modal state and functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            if (userInfo.id !== user.id) {
                dispatch({ type: UPDATE_USER_ACCOUNT_RESET })
            }
            dispatch(getUserAccount('account'))
        }
    }, [history, userInfo])

    return (
        <div>
            <Container>
                <Row className="mr-6 mb-2 border border-dark">
                    <Col xs={2} className="p-3 bg-info text-white">Name:</Col>
                    <Col className="p-3">{user.username}</Col>
                </Row>
                <Row className="mb-2 border border-dark">
                    <Col xs={2} className="p-3 bg-info text-white">Email:</Col>
                    <Col className="p-3">{user.email}</Col>
                </Row>
                <Row className="mb-2 border border-dark">
                    <Col xs={2} className="p-3 bg-info text-white">Admin Privileges:</Col>
                    <Col className="p-3">{user.isAdmin ? "Yes" : "No"}</Col>
                </Row>
                <Row className="mb-2 border border-dark">
                    <Col xs={2} className="p-3 bg-info text-white">Number of Articles:</Col>
                    <Col className="p-3">Not Set</Col>
                </Row>
            </Container>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to={`/account/update`}>Update Account details</Link>
                <span className="ml-1 text-primary">| </span>
                <span className="ml-1"></span>
                {/* <button onClick = {() => accountDeleteConfirmation(user.id)}>Delete Account</button> */}
                <Link to = {`account/delete/`}>Delete Account</Link>
            </span>
        </div>
    )
}

export default AccountPage
