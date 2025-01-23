import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import SearchComponent from './BaseSearch';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { PaginationComponent } from './Pagination';
import CustomizedDialogs from './Modal';
import { Button } from '@mui/material';

interface Data {
  id: string;
  modelType: string;
  description: string;
  status: string;
  modelName: string;
  createdOn: string;
  lastTrainedOn: string;
  action?: string;
}

type SortableData = Omit<Data, 'action'>;
type EnhancedTableToolbarProps = {
  setSearchQuery: (query: string) => void;
};
const getRandomTimestamp = (start: Date, end: Date): string => {
  const randomTime = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const day = String(randomTime.getDate()).padStart(2, '0');
  const month = String(randomTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = randomTime.getFullYear();
  return `${day}/${month}/${year}`; // Returns in DD/MM/YYYY format
};

const rows = Array.from({ length: 49 }, (_, i) => ({
  id: `${Math.floor(1000000 + Math.random() * 9000000)}`,
  modelName: `Model ${i + 1}`,
  modelType: i % 2 === 0 ? 'LLM' : 'Neural',
  description: `Description of Model ${i + 1}`,
  createdOn: getRandomTimestamp(new Date(2020, 0, 1), new Date(2024, 11, 31)), // Between Jan 1, 2020, and Dec 31, 2024
  lastTrainedOn: getRandomTimestamp(new Date(2023, 0, 1), new Date(2024, 11, 31)), // Between Jan 1, 2023, and Dec 31, 2024
  status: i % 2 === 0 ? 'Active' : 'Inactive',
}));

function descendingComparator<Key extends keyof SortableData>(a: Data, b: Data, orderBy: Key): number {
  if (a[orderBy] < b[orderBy]) {
    return -1;
  }
  if (a[orderBy] > b[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof SortableData>(
  order: Order,
  orderBy: Key
): (a: Data, b: Data) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  disableSort?: boolean;
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
    disableSort: true,
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof SortableData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof SortableData) => (event: React.MouseEvent<unknown>) => {
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
              active={headCell?.disableSort ? false : orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={(() => {
                if (!headCell?.disableSort && headCell.id !== 'action') return createSortHandler(headCell.id);
              })()}
              sx={{ fontWeight: 800 }}
              hideSortIcon={headCell?.disableSort}
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

function EnhancedTableToolbar({ setSearchQuery }: EnhancedTableToolbarProps) {
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
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <div className="w-[60%]">
          <SearchComponent placeholder="Search By Name, ID" onChange={setSearchQuery} />
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#EFEFEF',
            textTransform: 'none',
            color: '#767676',
            boxShadow: 'none',
          }}
          disableElevation
          startIcon={<TuneOutlinedIcon />}
        >
          Filter
        </Button>
      </Toolbar>
    </>
  );
}
interface ModalNameRenderProps {
  name: string;
  id: number | string;
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
  const [orderBy, setOrderBy] = React.useState<keyof SortableData>('modelName');
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const rowsPerPage = 7;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof SortableData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows =
    page === Math.ceil(rows.length / rowsPerPage) ? rowsPerPage - (rows.length % rowsPerPage) : 0;

  const visibleRows = React.useMemo(() => {
    const filteredRows = rows.filter((val) => {
      const query = searchQuery.trim().toLowerCase();
      return (
        query === '' ||
        val.modelName.toLowerCase().includes(query) ||
        val.id.toLowerCase().includes(query)
      );
    });

    const sortedRows = filteredRows.sort(getComparator(order, orderBy));

    return sortedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, searchQuery]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mt: 1 }}>
        <EnhancedTableToolbar setSearchQuery={(value: string) => setSearchQuery(value)} />
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
                const statusBg = row.status === 'Active' ? '#DCFCE7' : '#fcdcdc';
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
