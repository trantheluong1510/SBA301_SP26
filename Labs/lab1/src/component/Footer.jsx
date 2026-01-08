//Footer.jsx  to describe the footer component about the author
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
function Footer({avatar, name, email}) {
    return (
        //footer có background light và text center
        <footer className="bg-light text-center py-4 mt-auto">
        {/* Sử dụng Container để căn chỉnh nội dung footer, có 1 dòng, 3 cột: Avatar, Tên tác giả, Thông tin liên hệ */}
        <Container fluid>
            <Row className="align-items-center">
                <Col xs={2}>
                    <Image src={avatar} alt="Author Avatar" className="rounded-circle" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                </Col>
                <Col xs={8}>
                    <h5>Tác giả: &copy; {name}</h5>
                    <small>All rights reserved.</small>
                </Col>
                <Col xs={2}>
                    <a href={`mailto:${email}`}>{email}</a>    
                </Col>
            </Row>
        </Container>
        </footer>
    );
}   
export default Footer;