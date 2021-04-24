import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccount, userAccountUpdate } from '../actions/userActions'


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
    const { user } = getAccountReducer

    // reducer
    const updateAccountReducer = useSelector(state => state.updateAccountReducer)
    const { success } = updateAccountReducer

    useEffect(() => {
        if(!userInfo) {
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
        }
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h1>Update User Details</h1>
                    <Form onSubmit={onSubmit}>

                        <Form.Group controlId='username'>
                            <Form.Label>
                                Username
                        </Form.Label>
                            <Form.Control
                                autoFocus={true}
                                type="text"
                                defaultValue = {user.username}
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
                                defaultValue = {user.email}
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

                        <Button type="submit" variant='primary'>Save Changes</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default AccountUpdatePage
