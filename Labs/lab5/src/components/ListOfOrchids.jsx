import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import { Button, Form, FormGroup, Image, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function ListOfOrchids() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const apiBase = (baseUrl || '').replace(/\/+$/, '');
  const apiRoot = apiBase.replace(/\/orchids$/, '');
  const categoriesBase = `${apiRoot}/categories`;

  const [api, setAPI] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiBase);
      const sortedData = response.data.sort(
        (a, b) => parseInt(b.orchidID) - parseInt(a.orchidID)
      );
      setAPI(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(categoriesBase);
      setCategories(res.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBase}/${id}`);
      fetchData();
      toast.success('Orchid deleted successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error('Orchid deleted failed!');
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        category: data.categoryID ? { categoryID: parseInt(data.categoryID, 10) } : null
      };
      delete payload.categoryID;
      await axios.post(apiBase, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setShow(false);
      fetchData();
      reset();
      setValue('');
      toast.success('Orchid added successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error('Orchid added fail!');
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={2000} />

      <Table striped bordered hover className="my-5">
        <thead>
          <tr>
            <th>Image</th>
            <th>Orchid name</th>
            <th>Original</th>
            <th>Category</th>
            <th>Attractive</th>
            <th>
              <button
                onClick={handleShow}
                type="button"
                className="btn btn-primary"
              >
                <i className="bi bi-node-plus"> Add new orchid</i>
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {api.map((a) => (
            <tr key={a.orchidID}>
              <td>
                <Image src={a.orchidUrl} width={40} rounded />
              </td>
              <td>{a.orchidName}</td>
              <td>
                {a.natural ? (
                  <span className="badge text-bg-success">Natural</span>
                ) : (
                  <span className="badge text-bg-warning">Industry</span>
                )}
              </td>
              <td>{a.category?.categoryName}</td>
              <td>
                {a.attractive ? (
                  <span className="badge text-bg-primary">Yes</span>
                ) : (
                  <span className="badge text-bg-secondary">No</span>
                )}
              </td>
              <td className="d-flex gap-2">
                <Link to={`edit/${a.orchidID}`}>
                  <Button size="sm" variant="warning">
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to delete this orchid?'
                      )
                    ) {
                      handleDelete(a.orchidID);
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Orchid</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                {...register('orchidName', { required: true })}
              />
              {errors.orchidName && (
                <p className="text-warning">Name is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                {...register('orchidUrl', {
                  required: true,
                  pattern:
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/
                })}
              />
              {errors.orchidUrl && (
                <p className="text-warning">Image must be a valid URL</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('orchidDescription', { required: true })}
              />
              {errors.orchidDescription && (
                <p className="text-warning">Description is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select defaultValue="" {...register('categoryID', { required: true })}>
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.categoryID} value={c.categoryID}>
                    {c.categoryName}
                  </option>
                ))}
              </Form.Select>
              {errors.categoryID && (
                <p className="text-warning">Category is required</p>
              )}
            </Form.Group>

            <FormGroup>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Natural"
                {...register('natural')}
              />
            </FormGroup>

            <FormGroup className="mt-2">
              <Form.Check
                type="switch"
                id="attractive-switch"
                label="Attractive"
                {...register('attractive')}
              />
            </FormGroup>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
