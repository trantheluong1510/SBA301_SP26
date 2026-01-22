import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

// Import custom hook
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  
  // Lấy state, dispatch và hàm loginAction từ Context
  const { state, dispatch, loginAction } = useAuth();
  
  // Destructuring state
  const { username, password, error, validated, loading } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INPUT", field: name, value: value });
  };

  const handleSubmit = async (event) => {
    const formEl = event.currentTarget;
    event.preventDefault();

    // Logic 1: Validate HTML5
    if (formEl.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();
      // Bạn có thể dispatch action VALIDATION_ERROR nếu muốn hiện state validated
      dispatch({ type: "SUBMIT_ATTEMPT" }); // Để kích hoạt hiệu ứng đỏ của bootstrap
      dispatch({ type: "VALIDATION_ERROR" }); // Tắt loading ngay
      return;
    }

    // Logic 2: Gọi Action Login từ Context
    try {
      // Gọi hàm loginAction đã viết trong Context
      await loginAction(username, password);
      
      // Nếu thành công (không bị reject), chuyển trang
      navigate("/");
    } catch (err) {
      // Nếu thất bại, loginAction đã tự dispatch LOGIN_FAILURE rồi
      console.log("Đăng nhập thất bại");
    }
  };

  const handleCancel = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: "100vh",
        backgroundImage: "url('/images/c2.jpg')",
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Container style={{ maxWidth: "480px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4 p-md-5">
            <h3 className="text-center mb-4">Welcome back</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Your username"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập username.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Your password"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập password.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"/>
                      Logging in...
                    </>
                  ) : "Login"}
                </Button>
                <Button type="button" variant="outline-secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;