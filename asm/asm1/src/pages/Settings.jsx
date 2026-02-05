import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { accountsApi } from "../api";
import { useToast } from "../context/ToastContext.jsx";

export default function Settings() {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
        setName(u?.accountName || "");
        setEmail(u?.accountEmail || "");
      }
    } catch {}
  }, []);

  const handleSave = async () => {
    if (!user) return;
    if (!name.trim()) return toast.error("Name is required");
    setSaving(true);
    try {
      const updated = await accountsApi.update(user.accountID, {
        accountName: name.trim(),
        accountEmail: email, // read-only, keep same
        accountRole: user.accountRole,
      });
      setUser(updated);
      try { localStorage.setItem("auth_user", JSON.stringify(updated)); } catch {}
      toast.success("Profile updated");
    } catch (e) {
      toast.error(e.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="page-title">
        <h3>Settings</h3>
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} readOnly />
                </Form.Group>
                <div className="text-end">
                  <Button variant="primary" onClick={handleSave} disabled={saving || !user}>
                    {saving ? "Saving..." : "Save Profile"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
