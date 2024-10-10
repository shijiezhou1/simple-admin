import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return (
      <div style={{ display: 'block', padding: 30 }}>
          <h1 style={{ color: 'green' }}>GeeksforGeeks</h1>
          <h4>How to use Popper Component in ReactJS?</h4>
          <button type="button" onClick={(event) => {
              setAnchorEl(anchorEl ? null : event.currentTarget);
          }}>
              Click Me to Toggle Popper
          </button>
          <Popper
              id={open ? 'simple-popper' : undefined}
              open={open}
              anchorEl={anchorEl}>
              <div style={{
                  padding: 2,
                  border: '1px solid',
                  backgroundColor: 'gray',
              }}>Greetings from GeeksforGeeks</div>
          </Popper>
      </div>
  );

}