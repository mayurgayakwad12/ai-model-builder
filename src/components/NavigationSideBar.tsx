import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import navigationType from '../typesConstant';
type NavigationTreePropsType = {
  navigation: navigationType[];
};

export const NavigationTree = ({ navigation }: NavigationTreePropsType) => {
  return (
    <List>
      {navigation.map((item, index) => {
        if (item.kind === 'header') {
          return (
            <ListItem key={index} disablePadding sx={{ px: 2 }}>
              <ListItemText
                primary={item.title}
                className="font-bold"
                sx={{ '.MuiTypography-root': { fontWeight: 600 } }}
              />
            </ListItem>
          );
        }

        if (item.segment === 'divider') {
          return <div key={index} style={{ height: '20px', width: '100%' }} />;
        }

        return (
          <ListItemButton
            key={index}
            sx={[
              (item?.active && {
                backgroundColor: '#1E1B4E',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: 600,
                '.MuiTypography-root': { fontWeight: 600 },
                '&:hover': { backgroundColor: '#1E1B4E' },
              }) || {
                borderRadius: '12px',
              },
            ]}
          >
            <ListItemIcon sx={[item?.active ? { color: '#fff' } : {}]}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default NavigationTree;
