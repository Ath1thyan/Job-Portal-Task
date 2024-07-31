import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Badge } from 'react-bootstrap';
import JobDetailsModal from './JobDetailsModal';
import ApplyForJobForm from './ApplyForJobForm';


const JobListScreen = () => {
  const jobs = useSelector(state => state.jobs.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);

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

  return (
    <div className="container">
      <h1>Job List</h1>
      <Form.Control
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="job-list">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-item">
            <img src={job.logo} alt="company logo" className="company-logo" />
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
              <Button
                variant="primary"
                disabled={job.applied}
                onClick={() => handleApplyClick(job)}
              >
                {job.applied ? 'Applied' : 'Apply for Job'}
              </Button>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default JobListScreen;
