import { useEffect, useMemo, useState } from "react";
import { Table, Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { categoriesApi } from "../api";
import { useToast } from "../context/ToastContext.jsx";

export default function Category() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null); // null = create, object = edit
  const [form, setForm] = useState({ name: "", description: "", parentId: "", isActive: true });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await categoriesApi.list();
        const mapped = (data || []).map((c) => ({
          id: c.categoryID,
          name: c.categoryName,
          description: c.categoryDescription || "",
          parentId: c.parentCategory ? c.parentCategory.categoryID : null,
          isActive: (c.isActive ?? 0) === 1,
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
        String(x.id).includes(q) ||
        (x.description || "").toLowerCase().includes(q)
    );
  }, [items, search]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "", parentId: "", isActive: true });
    setValidated(false);
    setShow(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description || "", parentId: item.parentId ?? "", isActive: !!item.isActive });
    setValidated(false);
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setValidated(true);
      return toast.error("Name is required");
    }
    const payload = {
      categoryName: form.name,
      categoryDescription: form.description,
      isActive: form.isActive ? 1 : 0,
      parentCategory: form.parentId === "" ? null : { categoryID: Number(form.parentId) },
    };
    try {
      if (editing) {
        const updated = await categoriesApi.update(editing.id, payload);
        setItems((prev) =>
          prev.map((x) =>
            x.id === editing.id
              ? {
                  id: updated.categoryID,
                  name: updated.categoryName,
                  description: updated.categoryDescription || "",
                  parentId: updated.parentCategory ? updated.parentCategory.categoryID : null,
                  isActive: (updated.isActive ?? 0) === 1,
                }
              : x
          )
        );
        toast.success("Category updated successfully");
      } else {
        const created = await categoriesApi.create(payload);
        setItems((prev) => [
          ...prev,
          {
            id: created.categoryID,
            name: created.categoryName,
            description: created.categoryDescription || "",
            parentId: created.parentCategory ? created.parentCategory.categoryID : null,
            isActive: (created.isActive ?? 0) === 1,
          },
        ]);
        toast.success("Category created successfully");
      }
      setShow(false);
    } catch (e) {
      toast.error(e.message || "Error saving category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await categoriesApi.remove(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      toast.success("Category deleted successfully");
    } catch (e) {
      toast.error(e.message || "Error deleting category");
    }
  };

  return (
    <>
      <div className="page-title">
        <h3>Category Management</h3>
      </div>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search by ID or Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearch("")}>Clear</Button>
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button onClick={openCreate}>Add Category</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: 80 }}>CategoryID</th>
            <th>CategoryName</th>
            <th>CategoryDescription</th>
            <th style={{ width: 140 }}>ParentCategoryID</th>
            <th style={{ width: 120 }}>IsActive</th>
            <th style={{ width: 160 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.parentId ?? ""}</td>
              <td>{item.isActive ? "Active" : "Inactive"}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => openEdit(item)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">No data</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal Create / Update */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Update Category" : "Add Category"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3">
              <Form.Label>CategoryName</Form.Label>
              <Form.Control required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <Form.Control.Feedback type="invalid">Please enter category name.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CategoryDescription</Form.Label>
              <Form.Control as="textarea" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ParentCategory</Form.Label>
                  <Form.Select value={form.parentId} onChange={(e) => setForm((f) => ({ ...f, parentId: e.target.value }))}>
                    <option value="">-- None --</option>
                    {items
                      .filter((c) => !editing || c.id !== editing.id)
                      .map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>IsActive</Form.Label>
                  <Form.Check type="switch" label={form.isActive ? "Active" : "Inactive"} checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
