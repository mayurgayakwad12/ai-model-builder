import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SearchComponent from './BaseSearch';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { PaginationComponent } from './Pagination';
import CustomizedDialogs from './Modal';

interface Data {
  id: number;
  modelType: string;
  description: string;
  status: string;
  modelName: string;
  createdOn: string;
  lastTrainedOn: string;
  action: string;
}
const getRandomTimestamp = (start: Date, end: Date): string => {
  const randomTime = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const day = String(randomTime.getDate()).padStart(2, '0');
  const month = String(randomTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = randomTime.getFullYear();
  return `${day}/${month}/${year}`; // Returns in DD/MM/YYYY format
};

const rows = Array.from({ length: 49 }, (_, i) => ({
  id: Math.floor(1000000 + Math.random() * 9000000),
  modelName: `Model ${i + 1}`,
  modelType: i % 2 === 0 ? 'LLM' : 'Neural',
  description: `Description of Model ${i + 1}`,
  createdOn: getRandomTimestamp(new Date(2020, 0, 1), new Date(2024, 11, 31)), // Between Jan 1, 2020, and Dec 31, 2024
  lastTrainedOn: getRandomTimestamp(new Date(2023, 0, 1), new Date(2024, 11, 31)), // Between Jan 1, 2023, and Dec 31, 2024
  status: i % 2 === 0 ? 'Active' : 'Inactive',
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'modelName',
    numeric: false,
    disablePadding: true,
    label: 'Model Name',
  },
  {
    id: 'modelType',
    numeric: false,
    disablePadding: false,
    label: 'Model Type',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'createdOn',
    numeric: false,
    disablePadding: false,
    label: 'Created On',
  },
  {
    id: 'lastTrainedOn',
    numeric: false,
    disablePadding: false,
    label: 'Last Trained On',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: 800 }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <>
      <Toolbar sx={{ display: 'flex' }}>
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: 600 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Model Library
        </Typography>
        <CustomizedDialogs />
      </Toolbar>
      <Toolbar>
        <div className="w-[60%]">
          <SearchComponent placeholder="Search By Name, ID" />
        </div>
      </Toolbar>
    </>
  );
}
interface ModalNameRenderProps {
  name: string;
  id: number;
}

const ModalNameRender = ({ name, id }: ModalNameRenderProps) => {
  return (
    <div>
      <Typography sx={{ fontWeight: 800 }}>{name}</Typography>
      <Typography sx={{ color: '#767676' }}>ID: #{id}</Typography>
    </div>
  );
};

export default function CustomTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('modelName');
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 7;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log({ newPage });
    setPage(newPage);
  };

  const emptyRows =
    page === Math.ceil(rows.length / rowsPerPage) ? rowsPerPage - (rows.length % rowsPerPage) : 0;

  console.log({ emptyRows, page });

  const visibleRows = React.useMemo(() => {
    return rows
      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
      .sort(getComparator(order, orderBy));
  }, [order, orderBy, page, rows, rowsPerPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                const statusBg = row.status === 'Active53' ? '#DCFCE7' : '#fcdcdc';
                const statusColor = row.status === 'Active' ? '#16A34A' : '#a31616';
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row" padding="normal">
                      <ModalNameRender name={row.modelName} id={row.id} />
                    </TableCell>
                    <TableCell align="left">{row.modelType}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.createdOn}</TableCell>
                    <TableCell align="left">{row.lastTrainedOn}</TableCell>
                    <TableCell align="left">
                      <div
                        className={`flex items-center justify-center w-[102px] h-8 bg-[${statusBg}] rounded-md font-bold text-[${statusColor}]`}
                      >
                        {row.status}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <MoreVertOutlinedIcon />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && emptyRows !== rowsPerPage && (
                <TableRow
                  style={{
                    height: 81 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Box sx={{ float: 'right', padding: 4 }}>
            <PaginationComponent
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Box>
        </TableContainer>
      </Paper>
    </Box>
  );
}
