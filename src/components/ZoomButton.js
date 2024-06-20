// src/components/ZoomButtons.js
import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

const ZoomButtonContainer = styled('div')({
  position: 'fixed',
  bottom: 16, // Positionner en bas
  right: 16,   // Aligner à gauche
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px', // Espacement entre les boutons
});

const ZoomButtons = ({ onZoomIn, onZoomOut }) => {
  return (
    <ZoomButtonContainer>
      <Fab color="primary" size="small" onClick={onZoomIn}>
        <AddIcon   />
      </Fab>
      <Fab color="primary" size="small" onClick={onZoomOut}>
        <RemoveIcon />
      </Fab>
    </ZoomButtonContainer>
  );
};

export default ZoomButtons;
