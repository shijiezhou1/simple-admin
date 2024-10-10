import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Posts from "components/posts";
import Querybuilder from "components/querybuilder";
import { Title } from "react-admin";

import { Box, Divider, TextField, Typography } from "@mui/material";
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
import MultipleEmail from "components/multipleEmail";
import DropdownExample from "components/dropdownExample";
import SimplePopper from "components/simplePopper";

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
      <CardContent>
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
        {/* <MultipleEmail /> */}
        {/* <Card>
        <CardContent><DropdownExample /></CardContent>
      </Card>
      <Box>adasd sasdkja dasjd asjd aks ja</Box>
      <Divider /> */}
        <SimplePopper />
        {/* <SetTimeoutTextField />
      <DebounceTextfield />
      <Classcomponent value={dt} />
      {/* {JSON.stringify(dt.data)} */}
        {/* <ReactEditorJS defaultValue={EDITOR_BLOCKS} /> */}
      </CardContent>



    </Card>
  );
};

export default Dashboard;
