import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const JobDetailsModal = ({ show, onHide, job }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{job.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Experience Required:</strong> {job.experience} years</p>
        <p><strong>Skills Required:</strong></p>
        <ul>
          {job.skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <p><strong>Job Description:</strong></p>
        <p>{job.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobDetailsModal;
