import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'

function Article({ article }) {
    return (
        <div>
            <Card className = "shadow-sm mb-4 bg-white rounded">
                <Card.Body>
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <Card.Img variant="top" src="https://storage.googleapis.com/cw-p1w5jpim0sdhkccw8gr/media/blog-images/django-logo.gif" />
                            </Col>
                            <Col>
                                <h5 className="card-title text-capitalize">
                                    <Link to={`/articles/${article.id}`}>
                                        {article.title}
                                    </Link>
                                </h5>
                                <p className="card-text justify-description-css">{article.description}</p>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Article
