// src/components/Paginate.js (Updated Version)
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // Construct the base URL for the links
  const getLinkUrl = (p) => {
    if (isAdmin) {
      return `/admin/dashboard/${p}`;
    }
    if (keyword) {
      return `/search/${keyword}/page/${p}`;
    }
    return `/page/${p}`;
  };

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          // We no longer use LinkContainer here
          <Pagination.Item
            key={x + 1}
            as={Link} // Tell the item to render as a Link
            to={getLinkUrl(x + 1)} // Pass the 'to' prop directly
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;