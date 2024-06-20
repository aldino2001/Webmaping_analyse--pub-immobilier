import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid,Paper } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: 'relative',
  }),
);

  
const StyledPaper = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));
  
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight({open, onClose ,content}) {
  const theme = useTheme();
  //const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    //setOpen(true);
  };

  const handleDrawerClose = () => {
    open=false;
  };

  return (
    <Card>
    
    <Box sx={{p:2 }}>
      <CssBaseline />
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            minWidth:'25%',
            zIndex:1000
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        
        <DrawerHeader>
          <IconButton onClick={onClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Box sx={{p:2 ,right:10 }}>
                <Stack direction="row" spacing={1}>
                <Chip style={{
                    backgroundColor:content.color,
                }}
                label="Soft" size="small" />
                </Stack>
            </Box>
        </DrawerHeader>
        <Divider />
        <CardHeader
        avatar={
            <Avatar sx={{bgcolor: 'red', width:24,height:24}}></Avatar>
        }
        title="ralobo"
        />
        <Box  sx={{p:3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {content.cartname}
          </Typography>
         
        </Stack>
        <Typography color="text.secondary" variant="body1">
          {content.describe}fgdf fgdfg dgfg f fgfdgdf fgf gdfg dg dgdfg d fgdfgfd dfgf d
        </Typography>
        </Box>
      <Divider />
      
      <StyledPaper sx={{my: 1,mx: 'auto'}}
      >
        <Grid container wrap="nowrap"  spacing={1}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>fsdfdfdsfd dsfdf sfds dfdsf sfdsfdf dsf fdsf dfdf dfsdfsdfdfdsfd dsfdf sfds dfdsf sfdsfdf dsf fdsf dfdf dfsdfsdfdfdsfd dsfdf sfds dfdsf sfdsfdf dsf fdsf dfdf dfsdfsdfdfdsfd dsfdf sfds dfdsf sfdsfdf dsf fdsf dfdf dfsdfsdfdfdsfd dsfdf sfds dfdsf sfdsfdf dsf fdsf dfdf dfsd</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper sx={{my: 1,mx: 'auto'}}
      >
        <Grid container wrap="nowrap" spacing={1}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>fsdfdfdsfd dsfdf sfds dfdsf sfdsfdf dsf fdsf dfdf dfsd</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
      <FormControl sx={{mt:'auto',p:1}} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">
                <IconButton>
                    <SendRoundedIcon/>
                </IconButton>
            </InputAdornment>}
            fullWidth
            aria-describedby="outlined-weight-helper-text"
            sx={{borderRadius:20, fontSize:1, bottom:10}}
            inputProps={{
              'aria-label': 'weight',
              style:{fontSize:15}
            }}
          />
        </FormControl>
        
      </Drawer>
    </Box>
    </Card>
  );
}