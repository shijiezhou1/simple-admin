import { useEffect, useState, useMemo, useRef } from "react";
import { TextField } from "@mui/material";

const SetTimeoutTextField = () => {
  const [txt, setTxt] = useState("");

  let delayDebounceFn;

  // https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
  const cto = () => {
    console.log("cancel", txt);
    clearTimeout(delayDebounceFn);
  };

  useEffect(() => {
    delayDebounceFn = setTimeout(() => {
      console.log("search text: ", txt);
      // Send Axios request here
    }, 1000);

    return () => cto();
  }, [txt]);

  return (
    <TextField
      label="settimeouttextfield"
      variant="outlined"
      onChange={(event) => setTxt(event.target.value)}
    />
  );
};

export default SetTimeoutTextField;
