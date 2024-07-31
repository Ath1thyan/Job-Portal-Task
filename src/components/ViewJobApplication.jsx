import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

const ViewJobApplication = ({ show, onHide, job }) => {
  const jobDetails = useSelector(state => state.jobs.jobs.find(j => j.id === job.id));
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
        {jobDetails && jobDetails.application ? (
          <>
            <p><strong>First Name:</strong> {jobDetails.application.firstName}</p>
            <p><strong>Last Name:</strong> {jobDetails.application.lastName}</p>
            <p><strong>Email:</strong> {jobDetails.application.email}</p>
            <p><strong>Skills:</strong></p>
            <ul>
              {jobDetails.application.skills.map(skill => (
                <li key={skill.value}>{skill.label}</li>
              ))}
            </ul>
            <p><strong>About Me:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: jobDetails.application.aboutMe }} />
          </>
        ) : (
          <p>No application found for this job.</p>
        )}
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
