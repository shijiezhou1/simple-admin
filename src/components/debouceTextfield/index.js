import { useEffect, useState, useMemo, useRef } from "react";
import { TextField } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { selectData, updateDynamicData } from "reducers/dataSlice";
import { useDispatch } from "react-redux";

const DebounceTextfield = () => {
  const [txt, setTxt] = useState("");
  const dt = useSelector(selectData);
  const dispatch = useDispatch();

  const onChangeSearchInput = (evt) => {
    debouncedSearch(evt.target.value);
  };

  const debouncedSearch = debounce(function (txt) {
    setTxt(txt);
    dispatch(updateDynamicData({ name: "text", value: txt }));
  }, 1000);

  return (
    <TextField
      label="debounce"
      variant="outlined"
      onChange={onChangeSearchInput}
      value={dt.text}
    />
  );
};

export default DebounceTextfield;
