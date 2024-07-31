import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [
    {
      id: 1,
      logo: 'logo1.png',
      title: 'Frontend Developer',
      company: 'Company A',
      experience: 2,
      skills: ['JavaScript', 'React', 'CSS'],
      description: 'Lorem ipsum dolor sit amet.',
      applied: false,
      application: null,
    },
    {
      id: 2,
      logo: 'logo2.png',
      title: 'Backend Developer',
      company: 'Company B',
      experience: 3,
      skills: ['Node.js', 'Express', 'MongoDB'],
      description: 'Lorem ipsum dolor sit amet.',
      applied: false,
      application: null,
    },
    {
        id: 3,
        logo: 'logo3.png',
        title: 'Full stack Developer',
        company: 'Company c',
        experience: 3,
        skills: ['Node.js', 'Express', 'MongoDB', 'React Native', 'PHP'],
        description: 'Lorem ipsum dolor sit amet.',
        applied: false,
        application: null,
      },
  ],
  skills: [
    'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'CSS', 'HTML', 'Redux', 'TypeScript', 
    'Python', 'Django', 'Flask', 'Java', 'Spring', 'Hibernate', 'C++', 'SQL', 'NoSQL', 'GraphQL', 
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'Linux', 'Agile', 'Scrum'
  ],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    applyForJob: (state, action) => {
      const { jobId, application } = action.payload;
      const job = state.jobs.find(job => job.id === jobId);
      if (job) {
        job.applied = true;
        job.application = application;
      }
    },
  },
});

export const { applyForJob } = jobsSlice.actions;

export default jobsSlice.reducer;
