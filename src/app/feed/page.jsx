"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Feed = () => {
  const [launches, setLaunches] = useState([]);
  const [rocketNameFilter, setRocketNameFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [launchDateFilter, setLaunchDateFilter] = useState('By Launch Date');
  const [lastYearSelected, setLastYearSelected] = useState(false);
  const [lastMonthSelected, setLastMonthSelected] = useState(false);
  const [lastWeekSelected, setLastWeekSelected] = useState(false);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spacexdata.com/v3/launches');
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

    // Filter by Rocket Name
    if (rocketNameFilter) {
      filteredLaunches = filteredLaunches.filter((launch) =>
        launch.rocket.rocket_name.toLowerCase().includes(rocketNameFilter.toLowerCase())
      );
    }
    if (searchFilter) {
      filteredLaunches = filteredLaunches.filter((launch) =>
        launch.mission_name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Filter by Launch Date
    if (lastYearSelected) {
      // Filter launches from the last year
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      filteredLaunches = filteredLaunches.filter((launch) =>
        new Date(launch.launch_date_utc) > lastYear
      );
    } else if (lastMonthSelected) {
      // Filter launches from the last month
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      filteredLaunches = filteredLaunches.filter((launch) =>
        new Date(launch.launch_date_utc) > lastMonth
      );
    } else if (lastWeekSelected) {
      // Filter launches from the last week
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      filteredLaunches = filteredLaunches.filter((launch) =>
        new Date(launch.launch_date_utc) > lastWeek
      );
    }

    return filteredLaunches;
  };

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleLaunchDateChange = (event) => {
    const selectedValue = event.target.value;
    setLaunchDateFilter(selectedValue);

    // Set the state variables for the selected interval
    setLastYearSelected(selectedValue === 'Last Year');
    setLastMonthSelected(selectedValue === 'Last Month');
    setLastWeekSelected(selectedValue === 'Last Week');
  };

  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLaunches = filterLaunches().slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Container>
        <div className="header-tag-div">
          <h2>Spaceflight details</h2>
          <p>Find out the elaborate features of all past big spaceflights</p>
        </div>

        <div className="check-input-div">
          <input type="checkbox" id="scales" name="scales" checked />
          <span>Show upcoming only</span>
        </div>

        <div className="header-imputs-div">
          <Row>
            <Col xs={12} md={6} lg={6}>
              <input
                type="search"
                placeholder="Search by Rocket Name"
                value={searchFilter}
                onChange={handleSearchChange}
              />
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <Form.Select
                    size="sm"
                    onChange={handleLaunchDateChange}
                    value={launchDateFilter}
                  >
                    <option>By Launch Date</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                    <option>Last Year</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            {currentLaunches.map((launch) => (
              <Col xs={12} md={6} lg={4} key={launch.flight_number}>
                <img src={launch.links.mission_patch_small} width={100} height={100} alt="" />
                <div>Date: {formatDate(launch.launch_date_local)}, <span>{launch.launch_year}</span></div>
                <div>{launch.mission_name}</div>
                <div>{launch.rocket.rocket_name}</div>
              </Col>
            ))}
          </Row>
        </div>

        <div>
          {Array.from({ length: Math.ceil(filterLaunches().length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Feed;


// import React from 'react'
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Col, Container, Row } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import Image from 'next/image';



// const feed = () => {
//   const [launches, setLaunches] = useState([]);
//   const [rocketNameFilter, setRocketNameFilter] = useState('');
//   const [launchDateFilter, setLaunchDateFilter] = useState('');

//   const [searchFilter, setSearchFilter] = useState(''); 

//   const [lastYearSelected, setLastYearSelected] = useState(false);
//   const [lastMonthSelected, setLastMonthSelected] = useState(false);
//   const [lastWeekSelected, setLastWeekSelected] = useState(false);
  
//   const itemsPerPage = 9;
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.spacexdata.com/v3/launches');
//         setLaunches(response.data);
//       } catch (error) {
//         console.error('Error fetching data', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { day: 'numeric', month: 'short' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const filterLaunches = () => {
//     let filteredLaunches = [...launches];

//     // Filter by Rocket Name
//     if (rocketNameFilter) {
//       filteredLaunches = filteredLaunches.filter((launch) =>
//         launch.rocket.rocket_name.toLowerCase().includes(rocketNameFilter.toLowerCase())
//       );
//     }
//     if (searchFilter) {
//       filteredLaunches = filteredLaunches.filter((launch) =>
//         launch.mission_name.toLowerCase().includes(searchFilter.toLowerCase())
//       );
//     }

//   // Filter by Launch Date
//   if (lastYearSelected) {
//     // Filter launches from the last year
//     const lastYear = new Date();
//     lastYear.setFullYear(lastYear.getFullYear() - 1);
//     filteredLaunches = filteredLaunches.filter((launch) =>
//       new Date(launch.launch_date_utc) > lastYear
//     );
//   } else if (lastMonthSelected) {
//     // Filter launches from the last month
//     const lastMonth = new Date();
//     lastMonth.setMonth(lastMonth.getMonth() - 1);
//     filteredLaunches = filteredLaunches.filter((launch) =>
//       new Date(launch.launch_date_utc) > lastMonth
//     );
//   } else if (lastWeekSelected) {
//     // Filter launches from the last week
//     const lastWeek = new Date();
//     lastWeek.setDate(lastWeek.getDate() - 7);
//     filteredLaunches = filteredLaunches.filter((launch) =>
//       new Date(launch.launch_date_utc) > lastWeek
//     );
//   }

//   return filteredLaunches;
//   };

//   const handleSearchChange = (event) => {
//     setSearchFilter(event.target.value);
//   };

//   const handleLaunchDateChange = (event) => {
//     const selectedValue = event.target.value;
//     setLaunchDateFilter(selectedValue);
    
//     // Set the state variables for the selected interval
//     setLastYearSelected(selectedValue === 'Last Year');
//     setLastMonthSelected(selectedValue === 'Last Month');
//     setLastWeekSelected(selectedValue === 'Last Week');
//   };

//     // Pagination function
//     const paginate = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };
  
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentLaunches = filterLaunches().slice(indexOfFirstItem, indexOfLastItem);
  
//   return (
//     <div>
//       <Container>
//           <div className='header-tag-div'>
//                 <h2>Spaceflight details</h2>
//                 <p>Find out the elaborate features of all past big spaceflights</p>
//           </div>

//           <div className='check-input-div'>
//        <input type="checkbox" id="scales" name="scales"
//          checked/>
//          <span>Show upcomming only</span>
//        </div>

//        <div className="header-imputs-div">
//         <Row>
//           <Col xs={12} md={6} lg={6}>
//             <input
//               type="search"
//               placeholder="Search by Rocket Name"
//               value={searchFilter}
//                 onChange={handleSearchChange}
//             />
//           </Col>
//           <Col xs={12} md={6} lg={6}>
//             <Row>
//               <Col xs={12} md={6} lg={6}>
//                 <Form.Select size="sm">
//                   <option>By Launch Date</option>
//                   <option>Last Week</option>
//                   <option>Last Month</option>
//                   <option>Last Year</option>
//                 </Form.Select>
//               </Col>
//               <Col xs={12} md={6} lg={6}>
//                 <Form.Select size="sm"     onChange={handleLaunchDateChange}
//                     value={launchDateFilter}>
//                   <option>By Launch Date</option>
//                   <option>Last Week</option>
//                   <option>Last Month</option>
//                   <option>Last Year</option>
//                 </Form.Select>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </div>
   
   
//     <div>
    
//     <Row>
//         {filterLaunches().map((launch) => (
//           <Col xs={12} md={6} lg={4} key={launch.flight_number}>
//             <img src={launch.links.mission_patch_small} width={100} height={100} alt="" />
//             <div>Date: {formatDate(launch.launch_date_local)}, <span>{launch.launch_year}</span></div>
//             <div>{launch.mission_name}</div>
//             <div>{launch.rocket.rocket_name}</div>
//           </Col>
//         ))}
//       </Row>
     
//     </div>

//     <div>
//       {Array.from({ length: Math.ceil(launches.length / itemsPerPage) }).map((_, index) => (
//         <button key={index} onClick={() => paginate(index + 1)}>
//           {index + 1}
//         </button>
//       ))}
//     </div>
//     </Container>
//   </div>
// );
// }
  


// export default feed

