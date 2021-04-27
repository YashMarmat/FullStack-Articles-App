import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { dateCheck } from './GetDate'

function Article({ article }) {

    let descriptionCondition = ""

    if (article.description.length > 200) {
        descriptionCondition = <div>{article.description.substring(0, 200)}........<Link to={`/articles/${article.id}`}>read more</Link></div>
    } else {
        descriptionCondition = article.description
    }

    return (
        <div>
            <Card className="shadow-sm mb-4 bg-white rounded">
                <Card.Body>
                    <Container>
                        <Row>
                            <Col className = "card-zoom-css" sm={4}>
                                <Link to={`/articles/${article.id}`}>
                                    <Card.Img variant="top" src="https://storage.googleapis.com/cw-p1w5jpim0sdhkccw8gr/media/blog-images/django-logo.gif" />
                                </Link>
                            </Col>
                            <Col>
                                <h5 className="card-title text-capitalize">
                                    <Link to={`/articles/${article.id}`}>
                                        {article.title}
                                    </Link>
                                </h5>
                                <p className="card-text justify-description-css">{descriptionCondition}</p>
                                <small className="text-muted">Author: {article.user.username}</small><br />
                                <small className="text-muted">Created: {dateCheck(article.created_at.substring(0, 10))} | </small>
                                <small className="text-muted">Last Updated: {dateCheck(article.updated_at.substring(0, 10))}</small>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Article
