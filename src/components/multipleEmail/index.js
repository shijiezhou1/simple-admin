
import { ReactMultiEmail } from 'react-multi-email';

import { useEffect, useState, useMemo, useRef } from "react";
import { Box, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import "./index.css"
import Downshift, { useSelect } from 'downshift';

const MultipleEmail = () => {

  // Create react multi email
  const [emails, setEmails] = useState([]);


  const [inputValue, setInputValue] = useState('');

  const suggestions = [
    { label: "Afghanistan" },
    { label: "Aland Islands" },
    { label: "Albania" },
    { label: "Algeria" },
    { label: "American Samoa" },
    { label: "Andorra" },
    { label: "Angola" },
    { label: "Anguilla" },
    { label: "Antarctica" },
    { label: "Antigua and Barbuda" },
    { label: "Argentina" },
    { label: "Armenia" },
    { label: "Aruba" },
    { label: "Australia" },
    { label: "Austria" },
    { label: "Azerbaijan" },
    { label: "Bahamas" },
    { label: "Bahrain" },
    { label: "Bangladesh" },
    { label: "Barbados" },
    { label: "Belarus" },
    { label: "Belgium" },
    { label: "Belize" },
    { label: "Benin" },
    { label: "Bermuda" },
    { label: "Bhutan" },
    { label: "Bolivia, Plurinational State of" },
    { label: "Bonaire, Sint Eustatius and Saba" },
    { label: "Bosnia and Herzegovina" },
    { label: "Botswana" },
    { label: "Bouvet Island" },
    { label: "Brazil" },
    { label: "British Indian Ocean Territory" },
    { label: "Brunei Darussalam" }
  ];


  function getSuggestions(inputValue) {
    let count = 0;

    return suggestions.filter(suggestion => {
      const keep =
        (!inputValue ||
          suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !==
          -1) &&
        count < 5;

      if (keep) {
        count += 1;
      }

      return keep;
    });
  }

  function renderSuggestion({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  }

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


  return (
    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
      {/* <Stack direction="column" sx={{ position: "relative" }}>
        <ReactMultiEmail
          className={'aaaaaaaaa'}
          onChange={(emails) => setEmails(emails)}
          getLabel={(email, index, removeEmail) => {
            return <Box>{email}</Box>
          }}
          onChangeInput={(value) => {
            setInputValue(value);
          }}
          autoComplete={true}
          sx={{ border: "1px solid black", }}
        />
        <Paper square>
          <Typography>1</Typography>
          <Typography>2</Typography>
          <Typography>3</Typography>
        </Paper>
      </Stack> */}

      <Downshift
      //  inputValue={inputValue}
      //  onChange={(item) => {
      //    // Handle selection of a suggestion
      //    const selectedEmail = `${item.label}@example.com`;
      //    setEmails([...emails, selectedEmail]);
      //    setInputValue('');
      //  }}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => {

          return <div >
            {renderInput({
              fullWidth: true,
              InputProps: getInputProps({
                placeholder: "Search a country (start with a)",
                id: "integration-downshift-simple"
              })
            })}
            {isOpen ? (
              <Paper square>
                {getSuggestions(inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem
                  })
                )}
              </Paper>
            ) : null}
          </div>
        }}
      </Downshift>
    </Stack>
  );
};

export default MultipleEmail;