import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ConfirmModal from "../components/ConfirmModal";

function Contact() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (event) => {
    const formEl = event.currentTarget;

    if (formEl.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setShow(true);
    }

    setValidated(true);
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <h3>Contact Us</h3>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="validationName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            name="message"
            value={form.message}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Message cannot be empty.
          </Form.Control.Feedback>
        </Form.Group>

        {/* AGREE */}
        <Form.Group className="mb-3">
          <Form.Check
            required
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        title="Confirm Information"
        body={
          <>
            <p><b>Name:</b> {form.name}</p>
            <p><b>Email:</b> {form.email}</p>
            <p><b>Message:</b> {form.message}</p>
          </>
        }
        onConfirm={() => {
          alert("Contact submitted successfully!");
          setShow(false);
        }}
      />
    </Container>
  );
}

export default Contact;
