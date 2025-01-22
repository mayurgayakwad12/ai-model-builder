import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PaginationProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
};

export const PaginationComponent: React.FC<PaginationProps> = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  return (
    <Stack spacing={2}>
      <Pagination
        size="small"
        color="primary"
        count={totalPages}
        page={page}
        onChange={onPageChange}
      />
    </Stack>
  );
};
