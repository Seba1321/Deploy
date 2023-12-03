import React from 'react';

const MyEventComponent = ({ event }) => (
  <div>
    {event && event.nombre && (
      <div>
        <strong style={{ color: 'white' }}>{event.nombre}</strong>
      </div>

    )}
  </div>
);

export default MyEventComponent;
