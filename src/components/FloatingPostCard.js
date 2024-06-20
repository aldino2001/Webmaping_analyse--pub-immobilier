// FloatingCard.js
import React from 'react';
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

const FloatingCard = ({onClose, coordone }) => {
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
            <Typography variant="h6">Créer une poste</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="objet"
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Description"
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
            <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <div>
          <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={1}
              sx={{width:'90%',left:10,top:10 }}
              startIcon={<AddBusinessIcon/>}
            >
              images
           
            </Button>
          </div>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

export default FloatingCard;
