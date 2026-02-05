import { useEffect, useMemo, useState } from "react";
import { Table, Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { newsApi } from "../api";
import { useToast } from "../context/ToastContext.jsx";

export default function News() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    title: "",
    headline: "",
    createdDate: new Date().toISOString().slice(0, 10),
    content: "",
    source: "",
    categoryId: "",
    status: "Draft",
    createdById: "",
    updatedById: "",
    modifiedDate: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await newsApi.list();
        const mapped = (data || []).map((n) => ({
          id: n.newsArticleID,
          title: n.newsTitle,
          headline: n.headline || "",
          createdDate: n.createdDate ? String(n.createdDate).slice(0, 10) : "",
          content: n.newsContent || "",
          source: n.newsSource || "",
          categoryId: n.category ? n.category.categoryID : null,
          status: (n.newsStatus ?? 0) === 1 ? "Published" : "Draft",
          createdById: n.createdBy ? n.createdBy.accountID : "",
          updatedById: n.updatedBy ? n.updatedBy.accountID : "",
          modifiedDate: n.modifiedDate ? String(n.modifiedDate).slice(0, 10) : "",
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
    return items.filter((x) =>
      x.title.toLowerCase().includes(q) ||
      (x.headline || "").toLowerCase().includes(q) ||
      String(x.categoryId || "").includes(q) ||
      String(x.id).includes(q)
    );
  }, [items, search]);

  const openCreate = () => {
    setEditing(null);
    let userId = "";
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const u = JSON.parse(raw);
        userId = u?.accountID ?? "";
      }
    } catch {}
    setForm({
      title: "",
      headline: "",
      createdDate: new Date().toISOString().slice(0, 10),
      content: "",
      source: "",
      categoryId: "",
      status: "Draft",
      createdById: userId,
      updatedById: userId,
      modifiedDate: new Date().toISOString().slice(0, 10),
    });
    setValidated(false);
    setShow(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    let userId = "";
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const u = JSON.parse(raw);
        userId = u?.accountID ?? "";
      }
    } catch {}
    setForm({
      title: item.title,
      headline: item.headline || "",
      createdDate: item.createdDate || new Date().toISOString().slice(0, 10),
      content: item.content || "",
      source: item.source || "",
      categoryId: item.categoryId ?? "",
      status: item.status || "Draft",
      createdById: item.createdById ?? userId,
      updatedById: userId,
      modifiedDate: item.modifiedDate || new Date().toISOString().slice(0, 10),
    });
    setValidated(false);
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setValidated(true);
      return toast.error("Title is required");
    }
    if (!String(form.categoryId).trim()) {
      setValidated(true);
      return toast.error("Category is required");
    }
    const payload = {
      newsTitle: form.title,
      headline: form.headline,
      newsContent: form.content,
      newsSource: form.source,
      newsStatus: form.status === "Published" ? 1 : 0,
      createdDate: form.createdDate ? new Date(form.createdDate).toISOString() : null,
      modifiedDate: form.modifiedDate ? new Date(form.modifiedDate).toISOString() : null,
      category: form.categoryId === "" ? null : { categoryID: Number(form.categoryId) },
      createdBy: form.createdById === "" ? null : { accountID: Number(form.createdById) },
      updatedBy: form.updatedById === "" ? null : { accountID: Number(form.updatedById) },
    };
    try {
      if (editing) {
        const updated = await newsApi.update(editing.id, payload);
        const mapped = {
          id: updated.newsArticleID,
          title: updated.newsTitle,
          headline: updated.headline || "",
          createdDate: updated.createdDate ? String(updated.createdDate).slice(0, 10) : "",
          content: updated.newsContent || "",
          source: updated.newsSource || "",
          categoryId: updated.category ? updated.category.categoryID : null,
          status: (updated.newsStatus ?? 0) === 1 ? "Published" : "Draft",
          createdById: updated.createdBy ? updated.createdBy.accountID : "",
          updatedById: updated.updatedBy ? updated.updatedBy.accountID : "",
          modifiedDate: updated.modifiedDate ? String(updated.modifiedDate).slice(0, 10) : "",
        };
        setItems((prev) => prev.map((x) => (x.id === editing.id ? mapped : x)));
        toast.success("Article updated successfully");
      } else {
        const created = await newsApi.create(payload);
        const mapped = {
          id: created.newsArticleID,
          title: created.newsTitle,
          headline: created.headline || "",
          createdDate: created.createdDate ? String(created.createdDate).slice(0, 10) : "",
          content: created.newsContent || "",
          source: created.newsSource || "",
          categoryId: created.category ? created.category.categoryID : null,
          status: (created.newsStatus ?? 0) === 1 ? "Published" : "Draft",
          createdById: created.createdBy ? created.createdBy.accountID : "",
          updatedById: created.updatedBy ? created.updatedBy.accountID : "",
          modifiedDate: created.modifiedDate ? String(created.modifiedDate).slice(0, 10) : "",
        };
        setItems((prev) => [...prev, mapped]);
        toast.success("Article created successfully");
      }
      setShow(false);
    } catch (e) {
      toast.error(e.message || "Error saving article");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await newsApi.remove(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      toast.success("Article deleted successfully");
    } catch (e) {
      toast.error(e.message || "Error deleting article");
    }
  };

  return (
    <>
      <div className="page-title">
        <h3>News Article Management</h3>
      </div>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search by ID, Title or Category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearch("")}>Clear</Button>
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button onClick={openCreate}>Add Article</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: 80 }}>NewsArticleID</th>
            <th>NewsTitle</th>
            <th>Headline</th>
            <th style={{ width: 120 }}>CategoryID</th>
            <th style={{ width: 120 }}>NewsStatus</th>
            <th style={{ width: 120 }}>CreatedDate</th>
            <th style={{ width: 160 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.headline}</td>
              <td>{item.categoryId ?? ""}</td>
              <td>{item.status}</td>
              <td>{item.createdDate}</td>
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
              <td colSpan={5} className="text-center">No data</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Update Article" : "Add Article"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3">
              <Form.Label>NewsTitle</Form.Label>
              <Form.Control required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              <Form.Control.Feedback type="invalid">Please enter title.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Headline</Form.Label>
              <Form.Control value={form.headline} onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))} />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>CategoryID</Form.Label>
                  <Form.Control required type="number" value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))} />
                  <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>NewsStatus</Form.Label>
                  <Form.Select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>CreatedDate</Form.Label>
                  <Form.Control type="date" value={form.createdDate} onChange={(e) => setForm((f) => ({ ...f, createdDate: e.target.value }))} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>NewsContent</Form.Label>
              <Form.Control as="textarea" rows={4} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>NewsSource</Form.Label>
                  <Form.Control value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>CreatedByID</Form.Label>
                  <Form.Control type="number" value={form.createdById} readOnly />
                  <Form.Text muted>Auto-filled from current user</Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>UpdatedByID</Form.Label>
                  <Form.Control type="number" value={form.updatedById} readOnly />
                  <Form.Text muted>Auto-filled from current user</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>ModifiedDate</Form.Label>
              <Form.Control type="date" value={form.modifiedDate} onChange={(e) => setForm((f) => ({ ...f, modifiedDate: e.target.value }))} />
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
