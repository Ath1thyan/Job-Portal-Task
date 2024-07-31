import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

const ViewJobApplication = ({ show, onHide, jobId }) => {
  const job = useSelector(state => state.jobs.jobs.find(job => job.id === jobId));
  const printRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Job Application Details</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={printRef}>
        <p><strong>First Name:</strong> {job.application.firstName}</p>
        <p><strong>Last Name:</strong> {job.application.lastName}</p>
        <p><strong>Email:</strong> {job.application.email}</p>
        <p><strong>Skills:</strong></p>
        <ul>
          {job.application.skills.map(skill => (
            <li key={skill.value}>{skill.label}</li>
          ))}
        </ul>
        <p><strong>About Me:</strong></p>
        <div dangerouslySetInnerHTML={{ __html: job.application.aboutMe }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewJobApplication;
