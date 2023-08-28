import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Posts from "components/posts";
import Querybuilder from "components/querybuilder";
import { Title } from "react-admin";

import { Divider, TextField, Typography } from "@mui/material";
import { EDITOR_BLOCKS } from "config/constant";
import { useEffect, useState, useMemo, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { useSelector } from "react-redux";
import { getData, selectData, setData, updateDynamicData } from "reducers/dataSlice";
import { useDispatch } from "react-redux";
import Classcomponent from "components/Classcomponent";
import { debounce } from "lodash";
import SetTimeoutTextField from "components/settimeoutTextfield";
import DebounceTextfield from "components/debouceTextfield";

const ReactEditorJS = createReactEditorJS();

const Dashboard = () => {
  const [formatedValue, setFormatedValue] = useState();
  const [a, setA] = useState();
  const dt = useSelector(selectData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleExcelPasteData = (e) => {
    const data = e.target.value;
    if (!data) {
      setFormatedValue("");
    } else {
      let dataArray = data.split("\n").map((str) => str.trim());
      const newStr = dataArray.map((element) => `"${element}"`).join(",");
      setFormatedValue(`(${newStr})`);
    }
  };

  const [displayName, professionName] = useMemo(() => {
    if (dt.data && dt.data[0]) {
      return [`${dt.data[0].firstName}`, `${dt.data[0].lastName}`];
    }
    return ["", 2];
  }, [dt.data]);

  const concateDisplayName = useMemo(() => {
    return displayName ? displayName + " abc" : " eee";
  }, [displayName]);

  return (
    <Card>
      <Title title="Welcome to the administration" />
      <CardContent>Lorem ipsum sic dolor amet...</CardContent>
      {/* <CustomQuerybuilder /> */}
      {/* <Posts />
      <Querybuilder />
      <TextField
        value={formatedValue}
        multiline
        variant="outlined"
        onChange={handleExcelPasteData}
      /> */}
      <Divider />

      <Typography>
        show undefined value 1:
        {dt.text2.abc||'cannot show'}
      </Typography>

      <Typography>
        show undefined value 2:
        {dt.text2.kkk||'cannot show'}
      </Typography>

    
      <TextField variant="outlined" onChange={() => { }} label="simples" />

      <Divider />

      <SetTimeoutTextField />

      <DebounceTextfield />

      <Classcomponent value={dt} />

      {/* {JSON.stringify(dt.data)} */}

      {dt.data && dt.data.length > 0
        ? dt.data.map((r, idx) => (
          <Typography key={idx}>{r.firstName}</Typography>
        ))
        : null}
      <Divider />
      {/* <ReactEditorJS defaultValue={EDITOR_BLOCKS} /> */}
    </Card>
  );
};

export default Dashboard;
