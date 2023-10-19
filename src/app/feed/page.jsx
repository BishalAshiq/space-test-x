"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';



const feed = () => {
    const [launches, setLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLaunches = launches.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div>
    <div>
    <Row>
        {currentLaunches.map((launch) => (
          <Col xs={12} md={6} lg={4} key={launch.flight_number}>
            <div>{launch.rocket.rocket_name}</div>
            <div>{launch.launch_date_utc}</div>
            {/* Add more data fields as needed */}
          </Col>
        ))}
      </Row>
    </div>

    {/* Pagination controls */}
    <div>
      {Array.from({ length: Math.ceil(launches.length / itemsPerPage) }).map((_, index) => (
        <button key={index} onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  </div>
);
}
  


export default feed