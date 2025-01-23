import { Avatar, Badge, Box, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchComponent from './BaseSearch';

const shapeStyles = {
  bgcolor: 'white',
  width: 40,
  height: 40,
  border: '1px solid grey',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const shapeCircleStyles = { borderRadius: '50%' };

function UserNameMenu() {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>NS</Avatar>
      <div>
        <p className="font-bold">Neurotic Spy</p>
        <p className="font-light text-gray-500">neurotic@taildo.com</p>
      </div>
      <KeyboardArrowDownIcon />
    </div>
  );
}

const AppBar = () => {
  return (
    <div
      className="flex items-center drop-shadow-md h-20 bg-[#FFFFFF] text-black p-6 w-[100%]"
      style={{ justifyContent: 'space-between' }}
    >
      <p className="font-bold">AI/ML Model Builder</p>
      <div className="font-bold w-[350px]">
        <SearchComponent />
      </div>
      <div className="notification-and-userMenu flex items-center gap-8">
        <div className="notification flex gap-4">
          <Badge color="warning" overlap="circular" badgeContent="2">
            <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
              <NotificationsOutlinedIcon fontSize="medium" />
            </Box>
          </Badge>
          <Badge color="warning" overlap="circular">
            <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
              <FavoriteBorderOutlinedIcon fontSize="medium" />
            </Box>
          </Badge>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div>
          <UserNameMenu />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
