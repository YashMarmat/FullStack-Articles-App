import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccount, userAccountUpdate, logout } from '../actions/userActions'
import Message from '../components/Message'
import { Spinner } from 'react-bootstrap'


function AccountUpdatePage({ history }) {
    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // reducer
    const getAccountReducer = useSelector(state => state.getAccountReducer)
    const { user, loading } = getAccountReducer

    // reducer
    const updateAccountReducer = useSelector(state => state.updateAccountReducer)
    const { success } = updateAccountReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        dispatch(getUserAccount('account')) // extracting the info first (get request)
    }, [dispatch, history, userInfo, success])

    const onSubmit = (e) => {
        e.preventDefault()
        const updatedUsername = username === "" ? user.username : username
        const updatedEmail = email === "" ? user.email : email

        if (password !== confirmPassword) {
            alert("Passwords do not match")
        } else {
            dispatch(userAccountUpdate({
                'id': user.id,
                'username': updatedUsername,
                'email': updatedEmail,
                'password': password,
            }))
            alert("Account Updated Successfully")
            history.push("/account")
        }
    }

    // logout
    const logoutHandler = () => {
        dispatch(logout()) // action
    }

    const renderData = () => {
        try {
            return (
                <div>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} md={6}>
                        <span
                    className="d-flex justify-content-center"
                    style={{ display: "flex", marginBottom: "15px", color: "#008080" }}>
                    <em>Update User Details</em>
                </span>
                {loading && <Spinner animation="border" />}
                            <Form onSubmit={onSubmit}>

                                <Form.Group controlId='username'>
                                    <Form.Label>
                                        Username
                        </Form.Label>
                                    <Form.Control
                                        autoFocus={true}
                                        type="text"
                                        defaultValue={user.username}
                                        placeholder="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label>
                                        Email Address
                        </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="enter email"
                                        defaultValue={user.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password'>
                                    <Form.Label>
                                        Reset-Password
                        </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="enter new password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='confirmPassword'>
                                    <Form.Label>
                                        Confirm Password
                        </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="confirm new password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Button type="submit" variant='success' className = "btn-sm">Save Changes</Button>
                                <Link to={`/account`}>
                                    <button className="btn btn-primary btn-sm ml-2" type="button">
                                        Cancel
                                    </button>
                                </Link>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        } catch (error) {
            return <Message variant='danger'>Something went wrong, go back to <Link
                onClick={logoutHandler} to={`/login`}
            > Login</Link> page.</Message>
        }
    }

    return renderData()
}

export default AccountUpdatePage
