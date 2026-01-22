import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Alert, Badge } from "react-bootstrap";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";

function OrchidAdmin() {
  const API_BASE = "http://localhost:8080/orchids";

  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [validated, setValidated] = useState(false);
  const [confirmState, setConfirmState] = useState({ show: false, item: null });

  const [form, setForm] = useState({
    orchidName: "",
    category: "",
    price: "",
    isSpecial: false,
    image: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  //  GET LIST 
  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_BASE);
        setOrchids(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(
          err.response
            ? `HTTP ${err.response.status}`
            : err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrchids();
  }, []);

  const nextId = useMemo(() => {
    if (!orchids.length) return 1;
    const numericIds = orchids.map(o => Number(o.id)).filter(id => !isNaN(id));
    return numericIds.length ? Math.max(...numericIds) + 1 : 1;
  }, [orchids]);

  const resetForm = () => {
    setForm({
      orchidName: "",
      category: "",
      price: "",
      isSpecial: false,
      image: "",
      description: "",
    });
    setEditingId(null);
    setValidated(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, image: reader.result || "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (o) => {
    setEditingId(o.id);
    setValidated(false);
    setForm({
      orchidName: o.orchidName || "",
      category: o.category || "",
      price: o.price ? String(o.price) : "",
      isSpecial: !!o.isSpecial,
      image: o.image || "",
      description: o.description || "",
    });
  };

  //  DELETE 
  const handleDelete = async (item) => {
    setConfirmState({ show: true, item });
  };

  //  CREATE / UPDATE 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setError(null);

    const payload = {
      orchidName: form.orchidName.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      isSpecial: !!form.isSpecial,
      image: form.image.trim(),
      description: form.description.trim(),
    };

    try {
      setSaving(true);

      if (editingId) {
        const { data: updated } = await axios.put(
          `${API_BASE}/${editingId}`,
          { id: editingId, ...payload }
        );

        setOrchids(prev =>
          prev.map(o => String(o.id) === String(editingId) ? updated : o)
        );
      } else {
        const newItem = { id: String(nextId), ...payload };

        const { data: created } = await axios.post(API_BASE, newItem);
        setOrchids(prev => [...prev, created]);
      }

      resetForm();
    } catch (e) {
      setError(
        e.response ? `HTTP ${e.response.status}` : "Failed to save orchid"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h3>Manage Orchids</h3></Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={5}>
          <h5>{editingId ? "Edit Orchid" : "Create Orchid"}</h5>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* NAME */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="orchidName"
                value={form.orchidName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter orchid name
              </Form.Control.Feedback>
            </Form.Group>

            {/* CATEGORY */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                name="category"
                value={form.category}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Category is required
              </Form.Control.Feedback>
            </Form.Group>

            {/* PRICE */}
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                min="1"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Price must be greater than 0
              </Form.Control.Feedback>
            </Form.Group>

            {/* IMAGE */}
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                required
                className="mb-2"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
              <Form.Control type="file" accept="image/*" onChange={handleImageFile} />
              <Form.Control.Feedback type="invalid">
                Image is required
              </Form.Control.Feedback>
            </Form.Group>

            {/* DESCRIPTION */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Description is required
              </Form.Control.Feedback>
            </Form.Group>

            {/* SPECIAL */}
            <Form.Check
              className="mb-3"
              type="checkbox"
              label="Special"
              name="isSpecial"
              checked={form.isSpecial}
              onChange={handleChange}
            />

            <div className="d-flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
              {editingId && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Col>

        <Col md={7}>
          <h5>Orchid List</h5>
          {loading ? <div>Loading...</div> : (
            <Table bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Special</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orchids.map(o => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.orchidName}</td>
                    <td>{o.category}</td>
                    <td>{o.price}</td>
                    <td>
                      {o.isSpecial ? <Badge bg="danger">Yes</Badge> : <Badge bg="secondary">No</Badge>}
                    </td>
                    <td className="d-flex gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => handleEdit(o)}>Edit</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDelete(o)}>Delete</Button>
                    </td>
                  </tr>
                ))}
                {orchids.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">No orchids</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
    <ConfirmModal
      show={confirmState.show}
      handleClose={() => setConfirmState({ show: false, item: null })}
      title="Confirm Delete"
      body={<>
        {confirmState.item && (
          <div>
            <p><b>ID:</b> {confirmState.item.id}</p>
            <p><b>Name:</b> {confirmState.item.orchidName}</p>
            <p><b>Category:</b> {confirmState.item.category}</p>
            <p><b>Price:</b> {confirmState.item.price}</p>
            <p><b>Special:</b> {confirmState.item.isSpecial ? "Yes" : "No"}</p>
            {confirmState.item.image && (
              <div className="mb-2">
                <b>Image:</b>
                <div>
                  <img src={confirmState.item.image} alt={confirmState.item.orchidName} style={{ maxWidth: "100%", maxHeight: 150, objectFit: "contain" }} />
                </div>
              </div>
            )}
            {confirmState.item.description && (
              <p><b>Description:</b> {confirmState.item.description}</p>
            )}
            <p className="text-danger">Are you sure you want to delete this orchid?</p>
          </div>
        )}
      </>}
      onConfirm={async () => {
        const id = confirmState.item?.id;
        if (id == null) {
          setConfirmState({ show: false, item: null });
          return;
        }
        try {
          setSaving(true);
          await axios.delete(`${API_BASE}/${id}`);
          setOrchids(prev => prev.filter(o => String(o.id) !== String(id)));
          if (editingId === id) resetForm();
          setError(null);
        } catch (e) {
          setError(
            e.response ? `HTTP ${e.response.status}` : e.message
          );
        } finally {
          setSaving(false);
          setConfirmState({ show: false, item: null });
        }
      }}
    />
    </>
  );
}

export default OrchidAdmin;
