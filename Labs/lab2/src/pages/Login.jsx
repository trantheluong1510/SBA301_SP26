import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import { loginReducer, INITIAL_STATE } from "../../store/login/loginReducer"; 

function Login() {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);

  const { username, password, error, validated, loading } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INPUT", field: name, value: value });
  };

  const handleSubmit = (event) => {
    const formEl = event.currentTarget;
    event.preventDefault();

    // 1. Bật loading
    dispatch({ type: "SUBMIT_ATTEMPT" });

    // 2. Kiểm tra HTML5 validation (trống form)
    if (formEl.checkValidity() === false) {
      event.stopPropagation();
      
      dispatch({ type: "VALIDATION_ERROR" }); 
      
      return;
    }

    // 3. Logic login khi form đã điền đủ
    if (username === "admin" && password === "123456") {
      // Giả lập độ trễ mạng để thấy loading (tuỳ chọn)
      setTimeout(() => {
          dispatch({ type: "LOGIN_SUCCESS" });
          navigate("/");
      }, 1000); 
    } else {
      setTimeout(() => {
           dispatch({ type: "LOGIN_FAILURE" });
      }, 1000);
    }
  };

  const handleCancel = () => {
    dispatch({ type: "RESET" }); 
    navigate("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
      <Container style={{ maxWidth: "480px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4 p-md-5">
            <h3 className="text-center mb-4">Welcome back</h3>

            {error && (
              <Alert variant="danger" className="py-2">
                {error}
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationUsername">
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
                  Please enter your username.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="validationPassword">
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
                  Please enter your password.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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

export default Login;