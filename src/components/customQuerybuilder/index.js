import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { set } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslate } from "react-admin";



const CustomQuerybuilder = () => {
  const translate = useTranslate()

  const opt = [1, 2, 3, 4, 5, 6];

  const [complexObj, setComplexObj] = useState([{
    isExpand: false,
    isLoading: false,
    data: opt,
    id: 321,
    value: null,
  }]);

  const [tempVal, settempVal] = useState();
  const [aa, setAA] = useState(null);
  const [isBlock, setIsBlock] = useState(true);

  const handleCurrentRow = (e, v, id) => {
    setComplexObj(() => complexObj.map(r => r.id === id ? {
      ...r,
      isExpand: false,
      isLoading: false,
      value: v,
    } : r));
  }

  const setAsync = (item, value, option) => {
    const { isExpand, isLoading, id, } = item;

    if (!isExpand) {
      // load api
      setTimeout(() => {
        setComplexObj(
          complexObj.map(r => r.id === id ? {
            ...r,
            isExpand: true,
            isLoading: false
          } : r)
        )
      }, 1500);
    } else {
      if (option && option === 'selectOption') {
        console.log('selectOption')
        return;
      }

      setComplexObj(
        complexObj.map(r => r.id === id ? {
          ...r,
          isExpand: false,
          isLoading: false
        } : r)
      )
    }
  }

  return (
    <Stack>
      {complexObj.map((item, idx) => (
        <Box key={idx}>
          <Autocomplete
            options={opt}
            onChange={(event, value) => handleCurrentRow(event, value, item.id)}
            getOptionLabel={opt => opt.toString()}
            open={item.isExpand}
            onOpen={(event, option) =>
              setAsync(item, true, option)
            }
            onClose={(event, option) => setAsync(item, false, option)}
            loading={item.isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"categories"}
              />
            )}
          />

          {JSON.stringify(item)}
        </Box>
      ))}

    </Stack>
  )
}

export default CustomQuerybuilder;