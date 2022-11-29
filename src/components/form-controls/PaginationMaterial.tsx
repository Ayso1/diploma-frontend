import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';

const PaginationM = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    paginate(value);
  };
  return (
    <Grid>
      <Pagination
        count={pageNumbers.length}
        color="primary"
        onChange={handleChange}
      />
    </Grid>
  );
};
export default PaginationM;
