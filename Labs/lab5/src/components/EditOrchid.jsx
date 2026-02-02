import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from 'react-hook-form';

export default function EditOrchid() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const apiBase = (baseUrl || '').replace(/\/+$/, '');
  const apiRoot = apiBase.replace(/\/orchids$/, '');
  const categoriesBase = `${apiRoot}/categories`;

  const [api, setApi] = useState({});
  const [categories, setCategories] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    fetchOrchid();
    fetchCategories();
  }, []);

  const fetchOrchid = async () => {
    try {
      const response = await axios.get(`${apiBase}/${id}`);
      setApi(response.data);
      reset({
        ...response.data,
        categoryID: response.data?.category?.categoryID || ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Cannot load orchid data');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(categoriesBase);
      setCategories(res.data || []);
    } catch (err) {
      console.error('Cannot load categories', err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        category: data.categoryID ? { categoryID: parseInt(data.categoryID, 10) } : null
      };
      delete payload.categoryID;
      await axios.put(`${apiBase}/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Orchid updated successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error(error);
      toast.error('Update failed!');
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={2000} />

      <Row>
        <p className="lead text-primary">
          Edit the orchid: {api.orchidName}
        </p>
        <hr />

        <Col md={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Controller
                name="orchidName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Control {...field} type="text" />
                )}
              />
              {errors.orchidName &&
                errors.orchidName.type === 'required' && (
                  <p className="text-warning">Name is required</p>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Controller
                name="orchidUrl"
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/
                }}
                render={({ field }) => (
                  <Form.Control {...field} type="text" />
                )}
              />
              {errors.orchidUrl &&
                errors.orchidUrl.type === 'pattern' && (
                  <p className="text-warning">Image must be a valid URL</p>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Controller
                name="orchidDescription"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Control {...field} as="textarea" rows={3} />
                )}
              />
              {errors.orchidDescription && (
                <p className="text-warning">Description is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Controller
                name="categoryID"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Select {...field} defaultValue="">
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((c) => (
                      <option key={c.categoryID} value={c.categoryID}>
                        {c.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              {errors.categoryID && (
                <p className="text-warning">Category is required</p>
              )}
            </Form.Group>

            

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Natural"
                {...register('natural')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="attractive-switch"
                label="Attractive"
                {...register('attractive')}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
