// DroppableArea.js
import React from 'react';

const DroppableArea = ({ onDrop, onDragOver, items }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData('text/plain');
    onDrop(itemId);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default DroppableArea;
