import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';
import styles from '../../../styles/pagination.module.css';

const PaginationM = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    paginate(value);
  };
  return (
    <div className={styles.container}>
      <Grid direction="column" justifyContent="flex-end" alignItems="center">
        <Pagination
          className={styles.pagination}
          count={pageNumbers.length}
          color="primary"
          onChange={handleChange}
        />
      </Grid>
    </div>
  );
};
export default PaginationM;
