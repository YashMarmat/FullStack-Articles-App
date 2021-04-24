import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { login } from '../actions/userActions'


function LoginPage({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { error, userInfo } = userLoginReducer

    useEffect(() => {
        if (userInfo) {
            history.push('/articles') // homepage
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (error) {
            alert(error)
        }
        dispatch(login(email, password))
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>                    
                    <h1>Sign In</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>
                                Email Address
                    </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>
                                Password
                    </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant='primary'>Sign In</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            Do not have an account?
                    <Link
                                to={`/register`}
                            > Register</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default LoginPage