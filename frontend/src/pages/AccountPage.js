import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccount, logout } from '../actions/userActions'
//import { UPDATE_USER_ACCOUNT_RESET } from '../constants'
import Message from '../components/Message'


function AccountPage({ history }) {
    const dispatch = useDispatch()

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // reducer
    const getAccountReducer = useSelector(state => state.getAccountReducer)
    const { user: userAccDetails } = getAccountReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            try {
                dispatch(getUserAccount('account'))
            } catch (error) {
                history.push("/articles")
            }
        }
    }, [history, userInfo, dispatch])

    // logout
    const logoutHandler = () => {
        dispatch(logout()) // action
    }

    const renderData = () => {
        try {

            return (
                <div>
                    <Container>
                        <Row className="mr-6 mb-2 border border-dark">
                            <Col xs={2} className="p-3 bg-info text-white">Name:</Col>
                            <Col className="p-3">{userAccDetails.username}</Col>
                        </Row>
                        <Row className="mb-2 border border-dark">
                            <Col xs={2} className="p-3 bg-info text-white">Email:</Col>
                            <Col className="p-3">{userAccDetails.email}</Col>
                        </Row>
                        <Row className="mb-2 border border-dark">
                            <Col xs={2} className="p-3 bg-info text-white">Admin Privileges:</Col>
                            <Col className="p-3">{userAccDetails.isAdmin ? "Yes" : "No"}</Col>
                        </Row>
                    </Container>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to={`/account/update`}>Update Account details</Link>
                        <span className="ml-1 text-primary">| </span>
                        <span className="ml-1"></span>

                        {/* Admin check */}
                        {userAccDetails.isAdmin ? <div>
                            <Link to={`/users`}>All Users Info</Link>
                            <span className="ml-1 text-primary">| </span>
                            <span className="ml-1"></span>
                        </div>
                            : ""}

                        <Link to={`account/delete/`}>Delete Account</Link>
                    </span>
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

export default AccountPage
