// FloatingCard.js
import React,{useState} from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShareIcon from '@mui/icons-material/Share';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: 10,
  transform: 'translateY(-50%)',
  zIndex: 1000,
  borderBottomRightRadius:20,
  borderBottomLeftRadius:20,
  borderTopRightRadius:40
}));

const FloatingCard = ({onClose, lng,lat,user_id }) => {
  const [describe,setdescribe] =useState();
  const [name,setname] =useState();
  const [rayon,setrayon] =useState();
  const [user,setuser] =useState();
  const [etat,setetat] =useState();
  
  
  const CreateCartier = async (e) =>{
    e.preventDefault();
    console.log(user_id)
    const create = await axios.post('http://localhost:8080/createcartier/'+lng+'/'+lat+'/'+describe+'/'+name+'/'+rayon+'/'+user_id+'/'+etat)
};

  return (
    <StyledCard>
       <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
      <CardContent >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">detaillé le cartier</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="nom du cartier"
              onChange={(e)=>setname(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Description"
              onChange={(e)=>setdescribe(e.target.value)}
              multiline
              rows={2}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              type='number'
              label="Rayon en (km)"
              onChange={(e)=>setrayon(e.target.value)}
            />
          </div>
         
          <div>
          <FormControl sx={{ m: 1, minWidth: 165 }} size="small">
            <InputLabel id="demo-select-small-label">Etat du cartier </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              //value={age}
              label="Age"
              fullWidth
              onChange={(e)=>setetat(e.target.value)}
              //onChange={handleChange}
            >
              <MenuItem value={3}>zone rouge</MenuItem>
              <MenuItem value={4}>zone vert</MenuItem>
              <MenuItem value={5}>zone jaune</MenuItem>
            </Select>
          </FormControl>
          </div>
          <div>
          <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={1}
              sx={{width:'90%',left:10,top:10 }}
              startIcon={<AddBusinessIcon/>}
              onClick={CreateCartier}
            >
              enregistrer
           
            </Button>
          </div>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

export default FloatingCard;
