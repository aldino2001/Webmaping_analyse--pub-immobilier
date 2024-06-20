// FloatingCard.js
import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'fixed',
  top: '40%',
  left: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1000,
  borderBottomRightRadius:20,
  borderBottomLeftRadius:20,
  borderTopRightRadius:40
}));

const FloatingCard = ({ title, content, onClose }) => {
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
              top={10}
              rows={4}
            />
          </div>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

export default FloatingCard;
