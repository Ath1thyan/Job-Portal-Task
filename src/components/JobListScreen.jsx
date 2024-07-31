import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Badge, Row, Col, Container } from 'react-bootstrap';
import JobDetailsModal from './JobDetailsModal';
import ApplyForJobForm from './ApplyForJobForm';
import ViewJobApplication from './ViewJobApplication';
import Header from './Header';
import Footer from './Footer';

const JobListScreen = () => {
  const jobs = useSelector(state => state.jobs.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJobClick = job => {
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  const handleApplyClick = job => {
    setSelectedJob(job);
    setShowApplyForm(true);
  };

  const handleViewApplicationClick = job => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Job List</h1>
        <Form.Control
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-3"
        />
        <Row className="job-list">
          {filteredJobs.map(job => (
            <Col key={job.id} xs={12} sm={6} md={4} lg={4} className="job-item">
              <div className="job-content">
                <img src="/media/rocket.svg" alt="company logo" className="company-logo" />
                <div className="job-info">
                  <h4 onClick={() => handleJobClick(job)}>{job.title}</h4>
                  <p>{job.company}</p>
                  <p>Experience: {job.experience} years</p>
                  <div className="skills">
                    {job.skills.map(skill => (
                      <Badge key={skill} pill bg="primary" className="mr-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p>{job.description}</p>
                  {job.applied ? (
                    <Button variant="success" onClick={() => handleViewApplicationClick(job)}>
                      View Application
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleApplyClick(job)}>
                      Apply for Job
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {selectedJob && (
          <JobDetailsModal
            show={showDetailsModal}
            onHide={() => setShowDetailsModal(false)}
            job={selectedJob}
          />
        )}

        {selectedJob && (
          <ApplyForJobForm
            show={showApplyForm}
            onHide={() => setShowApplyForm(false)}
            job={selectedJob}
          />
        )}

        {selectedJob && (
          <ViewJobApplication
            show={showApplicationModal}
            onHide={() => setShowApplicationModal(false)}
            job={selectedJob}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default JobListScreen;
