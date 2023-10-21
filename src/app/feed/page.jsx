"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Feed = () => {
  const [launches, setLaunches] = useState([]);
  const [rocketNameFilter, setRocketNameFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  
  const [launchDateFilter, setLaunchDateFilter] = useState('By Launch Date');
  const [showUpcoming, setShowUpcoming] = useState(false); 
  const [filter, setFilter] = useState('All');
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
        .get('https://api.spacexdata.com/v3/launches');
        setLaunches(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filterLaunches = () => {
    let filteredLaunches = [...launches];

  
  
    if (searchFilter) {
      filteredLaunches = filteredLaunches.filter((launch) =>
        launch.mission_name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    if (rocketNameFilter) {
      filteredLaunches = filteredLaunches.filter((launch) =>
        launch.rocket.rocket_name.toLowerCase().includes(rocketNameFilter.toLowerCase())
      );
    }

    // Filter by Launch Date

    const today = new Date();
    if (launchDateFilter === 'Last Year') {
    
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      filteredLaunches = filteredLaunches.filter((launch) =>
        new Date(launch.launch_year) > lastYear
      );
    } else if (launchDateFilter === 'Last Month') {
    
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      filteredLaunches = filteredLaunches.filter((launch) =>
        new Date(launch.launch_date_utc) > lastMonth
      );
    } else if (launchDateFilter === 'Last Week') {
  
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      filteredLaunches = filteredLaunches.filter((launch) =>
        new Date(launch.launch_date_local) > lastWeek
      );
      
    }
    console.log("Filtered Launches (after date filter):", filteredLaunches);

    if (showUpcoming) {
      const today = new Date();
      filteredLaunches = filteredLaunches.filter((launch) =>
        new Date(launch.launch_date_utc) > today
      );
    }

    return filteredLaunches;
  };
  const handleRocketNameChange = (event) => {
    setRocketNameFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleLaunchDateChange = (event) => {
    setLaunchDateFilter(event.target.value);
  };

  const handleShowUpcomingChange = () => {
    setShowUpcoming(!showUpcoming);
  };


  const handleWeekChange = (event) => {
    setWeekFilter(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonthFilter(event.target.value);
  };

  const handleYearChange = (event) => {
    setYearFilter(event.target.value);
  };




  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLaunches = filterLaunches().slice(indexOfFirstItem, indexOfLastItem);

  const convertLaunchSuccessToString = (launchSuccess) => {
    return launchSuccess ? 'Success' : 'Failure';
  };
  

  return (
    <div>
      <Container>
        <div className="header-tag-div">
          <h2>Spaceflight details</h2>
          <p>Find out the elaborate features of all past big spaceflights</p>
        </div>

        <div className="check-input-div">
          <input
            type="checkbox"
            id="scales"
            name="scales"
            checked={showUpcoming}
            onChange={handleShowUpcomingChange}
          />
          <span>Show upcoming only</span>
        </div>

        <div className="header-imputs-div">
          <Row>
            <Col xs={12} md={6} lg={6}>
              <div className='search-div'>
                  <input
                  className='search-input'
                    type="search"
                    placeholder="Search.."
                    value={rocketNameFilter}
                    onChange={handleRocketNameChange}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" fill="white" className="bi bi-search search-icon" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
              </div>
              <div className=" mobile">
          <input
            type="checkbox"
            id="scales"
            name="scales"
            checked={showUpcoming}
            onClick={handleShowUpcomingChange}
          />
          <span>Show upcoming only</span>
        </div>
            </Col>


            <Col xs={12} md={6} lg={6}>
              <Row>

                <Col xs={12} md={6} lg={6} className='launch-state-by'>
                  

                  <select class="form-select" aria-label="Default select example"  >
                  
                    <option>By Launch Status</option>
                  </select>
                </Col>


                <Col xs={12} md={6} lg={6}>
             
                  <select 
                  className="form-select" 
                  aria-label="Default select example"   
                  onChange={handleLaunchDateChange}
                  value={launchDateFilter}>

                    <option selected>By Launch Date</option>
                    <option value="Last Week">Last Week</option>
                    <option value="Last Month">Last Month</option>
                    <option value="Last Year">Last Year</option>

                  </select>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className='data-div'>
          <Row>
            {currentLaunches.map((launch) => (
              <Col xs={12} md={6} lg={4} key={launch.flight_number}>
                <div className='single-lounch-div'>
                  <div className='img-date-name-div'>
                      <img className='rocke-image' src={launch.links.mission_patch_small} width={100} height={100} alt="" />
                      <p>Launch Date: <span className='date-year'>{formatDate(launch.launch_date_local)}, <span>{launch.launch_year}</span></span></p>
                      <h5 className='mission-name'>{launch.mission_name}</h5>
                      <p>{launch.rocket.rocket_name}</p>
                  </div>
                  <div className='launch-stat-div'>
                       <p>Launch Status: </p>
                      {launch.launch_success ? (
                      <p ><span className='status-success'> Success</span> </p> 
                      ) : (
                        <p className='status-failed'>Faild</p>
                      )}
                  </div>
  
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className='paginations-div'>
          {Array.from({ length: Math.ceil(filterLaunches().length / itemsPerPage) }).map((_, index) => (
            <button className='paginations-btn' key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Feed;

