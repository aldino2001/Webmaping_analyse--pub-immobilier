// FloatingChips.js
import React from 'react';
import { Chip, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const FloatingChips = ({ chips, expanded, onToggle }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '7.3%',
        left:120,
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <IconButton onClick={onToggle} sx={{ mb: 1 }}>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      {expanded && chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip.label}
          onDelete={chip.onDelete}
          sx={{ mb: 1 }}
        />
      ))}
    </Box>
  );
};

export default FloatingChips;
