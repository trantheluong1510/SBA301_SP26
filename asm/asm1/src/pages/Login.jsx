import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { login as loginApi } from "../api";

function LoginPage() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    validated: false,
    loading: false,
  });

  const { email, password, error, validated, loading } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const formEl = event.currentTarget;
    event.preventDefault();

    if (formEl.checkValidity() === false) {
      event.stopPropagation();
      setState((s) => ({ ...s, validated: true }));
      return;
    }

    try {
      setState((s) => ({ ...s, loading: true, error: "" }));
      const user = await loginApi({ email, password });
      try { localStorage.setItem("auth_user", JSON.stringify(user)); } catch {}
      navigate("/");
    } catch (err) {
      const status = err?.status || 0;
      let msg = (err?.message || "").trim();
      if (status >= 500) {
        msg = "Đăng nhập thất bại. Vui lòng thử lại.";
      } else if (status === 400 || status === 401) {
        msg = "Email hoặc mật khẩu không đúng.";
      } else if (!msg || /^HTTP\s+\d+$/i.test(msg)) {
        msg = "Đăng nhập thất bại. Vui lòng thử lại.";
      }
      setState((s) => ({ ...s, error: msg, loading: false }));
    } finally {
      setState((s) => ({ ...s, loading: false, validated: true }));
    }
  };

  const handleCancel = () => {
    setState({ email: "", password: "", error: "", validated: false, loading: false });
    navigate("/login");
  };

  return (
    <div
      className="login-page d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/images/c2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container style={{ maxWidth: "480px" }}>
        <Card className="login-card shadow-lg border-0">
          <Card.Body className="p-4 p-md-5">
            <h3 className="text-center mb-4">Welcome back</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập email hợp lệ.
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
                      <span className="spinner-border spinner-border-sm me-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
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
