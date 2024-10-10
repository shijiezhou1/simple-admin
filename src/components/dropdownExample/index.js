import * as React from 'react'
import Downshift from 'downshift'
import { Box, Paper, Popper, TextField, Typography } from '@mui/material'

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
]


const DropdownExample = () => {

  const [curSel, setCurSel] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const id = open ? 'simple-popper' : undefined;


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        sx={{ width: "300px" }}
        InputProps={{
          inputRef: ref,
          ...InputProps,
          size: "small"
        }}
        {...other}
      />
    );
  }

  return <Downshift
    onChange={selection => {
      console.log(selection)
    }
      // alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
    }
    itemToString={item => (item ? item.value : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      getRootProps,
    }) => (
      <div>
        <Typography {...getLabelProps()}>Enter a fruit</Typography>
        <Box
          style={{ display: 'inline-block' }}
          {...getRootProps({}, { suppressRefError: true })}
        >
          {renderInput({
            fullWidth: true,
            InputProps: getInputProps({
              placeholder: "Search a country (start with a)",
              id: "integration-downshift-simple"
            }),
          })}
        </Box>


        <button aria-describedby={id} type="button" onClick={handleClick}>
          Toggle Popper
        </button>


        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
          <Paper>
            {/* <ul {...getMenuProps()}> */}
            {isOpen
              ?
              items
                .filter(item => !inputValue || item.value.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.value}
                  </li>
                ))
              : null}
            {/* </ul> */}
          </Paper>
        </Popper>
      </div>
    )}
  </Downshift>
}

export default DropdownExample