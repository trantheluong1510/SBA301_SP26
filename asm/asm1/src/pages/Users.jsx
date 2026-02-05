import { useEffect, useMemo, useState } from "react";
import { Table, Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { accountsApi } from "../api";
import { useToast } from "../context/ToastContext.jsx";

export default function Users() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Staff", password: "" });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await accountsApi.list();
        const mapped = (data || []).map((a) => ({
          id: a.accountID,
          name: a.accountName,
          email: a.accountEmail,
          role: a.accountRole === 1 ? "Admin" : "Staff",
          enabled: a.enabled !== false,
          password: "******",
        }));
        setItems(mapped);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (x) =>
        x.name.toLowerCase().includes(q) ||
        x.email.toLowerCase().includes(q) ||
        x.role.toLowerCase().includes(q) ||
        String(x.id).includes(q)
    );
  }, [items, search]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", email: "", role: "Staff", password: "" });
    setValidated(false);
    setShow(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, email: item.email, role: item.role, password: "" });
    setValidated(false);
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setValidated(true);
      return toast.error("AccountName is required");
    }
    if (!form.email.trim()) {
      setValidated(true);
      return toast.error("AccountEmail is required");
    }
    if (!editing && !form.password.trim()) {
      setValidated(true);
      return toast.error("AccountPassword is required");
    }
    const payload = {
      accountName: form.name,
      accountEmail: form.email,
      accountRole: form.role === "Admin" ? 1 : 2,
      accountPassword: form.password || (editing ? undefined : "123456"),
    };
    try {
      if (editing) {
        const updated = await accountsApi.update(editing.id, payload);
        setItems((prev) =>
          prev.map((x) =>
            x.id === editing.id
              ? {
                  id: updated.accountID,
                  name: updated.accountName,
                  email: updated.accountEmail,
                  role: updated.accountRole === 1 ? "Admin" : "Staff",
                  enabled: updated.enabled !== false,
                  password: "******",
                }
              : x
          )
        );
        toast.success("Account updated successfully");
      } else {
        const created = await accountsApi.create(payload);
        setItems((prev) => [
          ...prev,
          {
            id: created.accountID,
            name: created.accountName,
            email: created.accountEmail,
            role: created.accountRole === 1 ? "Admin" : "Staff",
            enabled: created.enabled !== false,
            password: "******",
          },
        ]);
        toast.success("Account created successfully");
      }
      setShow(false);
    } catch (e) {
      toast.error(e.message || "Error saving account");
    }
  };

  const handleToggleEnabled = async (item) => {
    const next = !item.enabled;
    try {
      await accountsApi.setEnabled(item.id, next);
      setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, enabled: next } : x)));
      toast.success(next ? "User enabled" : "User disabled");
    } catch (e) {
      toast.error(e.message || "Error updating account status");
    }
  };

  return (
    <>
      <div className="page-title">
        <h3>Account Management</h3>
      </div>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search by ID, Name, Email or Role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearch("")}>Clear</Button>
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button onClick={openCreate}>Add Account</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: 80 }}>AccountID</th>
            <th>AccountName</th>
            <th>AccountEmail</th>
            <th style={{ width: 160 }}>AccountRole</th>
            <th style={{ width: 120 }}>Enabled</th>
            <th style={{ width: 160 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.filter((x) => x.role !== "Admin").map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{item.enabled ? "Yes" : "No"}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => openEdit(item)}>
                  Edit
                </Button>
                <Button size="sm" variant={item.enabled ? "secondary" : "success"} onClick={() => handleToggleEnabled(item)}>
                  {item.enabled ? "Disable" : "Enable"}
                </Button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">No data</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Update Account" : "Add Account"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3">
              <Form.Label>AccountName</Form.Label>
              <Form.Control required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <Form.Control.Feedback type="invalid">Please enter account name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>AccountEmail</Form.Label>
              <Form.Control required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>AccountRole</Form.Label>
              <Form.Select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                <option>Admin</option>
                <option>Staff</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>AccountPassword</Form.Label>
              <Form.Control type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required={!editing} />
              {!editing && (
                <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
