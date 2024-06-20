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
import rightContent from './rightContent';
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
  top: '40%',
  left: 20,
  transform: 'translateY(-50%)',
  zIndex: 1000,
  borderBottomRightRadius:20,
  borderBottomLeftRadius:20,
  borderTopRightRadius:40
}));

const FloatingCard = ({onClose, lat,lng,userId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [describe,setdescribe] = useState("");
  const [title,setTitle] = useState("");
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images[]', selectedFiles[i]);
    };
    formData.append('title',title);
    formData.append('descriptions',describe);
    formData.append('userId',userId);
    formData.append('lat',lat)
    formData.append('lng',lng)
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
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
            <Typography variant="h6">{userId}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="titre"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Description"
              value={describe}
              onChange={(e)=>setdescribe(e.target.value)}
              multiline
              rows={4}
            />
          </div>
          <div>
          <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={1}
              sx={{width:'90%',left:10  }}
              startIcon={<CloudUploadIcon />}
            >
              images
            <VisuallyHiddenInput onChange={handleFileChange} multiple type="file" />
            </Button>
          </div>
          <div>
          <Button
              component="label"
              role={undefined}
              variant="contained"
              onClick={handleUpload}
              tabIndex={1}
              sx={{width:'90%',left:10,top:10 }}
              startIcon={<AddBusinessIcon/>}
            >
              images
          </Button>
          <Typography>{selectedFiles.length}</Typography>
          </div>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

export default FloatingCard;
