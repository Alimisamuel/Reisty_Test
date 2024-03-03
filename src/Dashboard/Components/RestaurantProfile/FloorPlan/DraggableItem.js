// DraggableItem.js
import { Box } from '@mui/material';
import React from 'react';

const DraggableItem = ({ item, onDragStart }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', item.id);
    onDragStart(item);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
    >
      {item.name}
      <Box>GGG</Box>
    </div>
  );
};

export default DraggableItem;

