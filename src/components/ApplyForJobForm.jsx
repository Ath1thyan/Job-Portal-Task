import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { applyForJob } from '../redux/jobsReducer';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const ApplyForJobForm = ({ show, onHide, job }) => {
  const dispatch = useDispatch();
  const skillsOptions = useSelector(state => state.jobs.skills).map(skill => ({
    value: skill,
    label: skill,
  }));

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    skills: [],
    aboutMe: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    skills: Yup.array().min(1, 'At least one skill is required'),
    aboutMe: Yup.string().required('About Me is required'),
  });

  const handleSubmit = (values) => {
    dispatch(applyForJob({
      jobId: job.id,
      application: values,
    }));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Apply for {job.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <FormikForm>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Field name="firstName" className="form-control" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Field name="lastName" className="form-control" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Field name="email" type="email" className="form-control" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Skills</Form.Label>
                <Select
                  isMulti
                  options={skillsOptions}
                  onChange={(selected) => setFieldValue('skills', selected)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>About Me</Form.Label>
                <Field name="aboutMe">
                  {({ field }) => (
                    <ReactQuill value={field.value} onChange={field.onChange(field.name)} />
                  )}
                </Field>
              </Form.Group>

              <Button style={{marginTop:"20px"}} type="submit">Submit</Button>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyForJobForm;
