"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';



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

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div>
    <div>
    <Row>
        {currentLaunches.map((launch) => (
          <Col xs={12} md={6} lg={4} key={launch.flight_number}>
            
            <Image src={launch.links.mission_patch_small} width={100} height={100} alt=''/>
              <div>Date: {formatDate(launch.launch_date_local)}, <span>{launch.launch_year}</span></div>
              <div>{launch.mission_name}</div>
              <div>{launch.rocket.rocket_name}</div>


         
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