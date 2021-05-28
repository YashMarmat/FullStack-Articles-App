import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { dateCheck } from './GetDate'

function Article({ article }) {

    let descriptionCondition = ""

    if (article.description.length > 150) {
        descriptionCondition = <div>{article.description.substring(0, 150)}........<Link to={`/articles/${article.id}`}>read more</Link></div>
    } else {
        descriptionCondition = article.description
    }

    return (
        <Card className="shadow-sm mb-4 bg-white rounded">
            <Card.Body>
                <Container>
                    <Row>
                        <Col className="card-zoom-css" sm={4}>
                            <Link to={`/articles/${article.id}`}>
                                <Card.Img variant="top" src={article.image} alt="image" height="180" />
                            </Link>
                        </Col>
                        <Col>
                            <h5 className="card-title text-capitalize">
                                <Link to={`/articles/${article.id}`}>
                                    {article.title}
                                </Link>
                            </h5>
                            <span className="card-text justify-description-css">{descriptionCondition}</span>
                            <hr />
                            <small className="text-muted">Author: {article.user.username}</small><br />
                            <small className="text-muted">Created: {dateCheck(article.created_at.substring(0, 10))} | </small>
                            <small className="text-muted">Last Updated: {dateCheck(article.updated_at.substring(0, 10))}</small>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default Article
