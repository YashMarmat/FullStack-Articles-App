import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAccount, getUserAccount } from '../actions/userActions'
import Message from '../components/Message'
import { Spinner } from 'react-bootstrap'


function DeleteUserAccount({ history }) {
    const dispatch = useDispatch()
    const [myPassword, setMyPassword] = useState("")

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // user details reducer
    const getAccountReducer = useSelector(state => state.getAccountReducer)
    const { user } = getAccountReducer

    // user details reducer
    const userDeleteReducer = useSelector(state => state.userDeleteReducer)
    const { error, loading } = userDeleteReducer


    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
            alert("Account Successfully Deleted!")
        }
        dispatch(getUserAccount('account'))
    }, [history, userInfo, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        const idpluspass = user.id + "," + myPassword
        //console.log(idpluspass)
        dispatch(deleteUserAccount(idpluspass))        
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h3>Confirm your password to delete your account.</h3>
                    {loading && <span style = {{ display: "flex" }}><h5>Please wait</h5><span className = "ml-2"><Spinner animation="border" /></span></span>}                    
                    {error && <Message variant='danger'>Incorrect Password!</Message>}        
                    <div className="mt-4">
                        <Form onSubmit={onSubmit}>
                            <Form.Group controlId='password'>
                                <Form.Label>
                                    Password
                            </Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="enter your password"
                                    value={myPassword}
                                    onChange={(e) => setMyPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type="submit" variant="danger">Confirm Delete</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DeleteUserAccount
