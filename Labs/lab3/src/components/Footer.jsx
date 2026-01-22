import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Footer({ avatar, name, email }) {
    return (
        <footer className="bg-light py-4 mt-auto">
            <Container>
                <Row className="align-items-center text-center g-3">
                    <Col xs={12} md={2}>
                        <Image
                            src={avatar}
                            roundedCircle
                            style={{ width: 60, height: 60, objectFit: "cover" }}
                        />
                    </Col>

                    <Col xs={12} md={7}>
                        <h5 className="mb-1">Tác giả: © {name}</h5>
                        <small>All rights reserved.</small>
                    </Col>

                    <Col xs={12} md={3}>
                        <a href={`mailto:${email}`}>{email}</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
