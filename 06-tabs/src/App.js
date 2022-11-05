import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

// API
const url = 'https://course-api.com/react-tabs-project'

function App() {
  // set up state values
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0); // first item of array

  // fetch data from API
  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs); // setJobs equal to newJobs
    setLoading(false); // setLoading to be false
  };

  // when we would want the fetchJobs function to run
  useEffect(() => {
    fetchJobs() // invoke the function
  }, []); // run the app render just once


  // if loading display h1
  if (loading) {
    return (
      <section className='section loading'>
        <h1>loading...</h1>
      </section>
    );
  }

  // destructuring to be done only right after the loading
  // jobs are no longer an emptry array since we fetched the jobs
  const { company, dates, duties, title } = jobs[value];

  // otherwise display section
  return (
    <section className='section'>
      <div className='title'>
        <h2>experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        <div className='btn-container'>
          {/* iterate over our jobs and then for every job, 
          display specific button */}
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() =>
                  setValue(index)}
                className={`job-btn ${index === value && 'active-btn'}`}
              >{item.company}
              </button>
            )
          })}
        </div>

        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>

          {/* iterate over our duties cause it is an array in API */}
          {duties.map((duty, index) => {
            return (
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight
                  className='job-icon'>
                </FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section >
  )
}

export default App