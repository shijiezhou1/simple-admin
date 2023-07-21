import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title } from "react-admin";
import Posts from "components/posts";
import Querybuilder from "components/querybuilder";

import { createReactEditorJS } from "react-editor-js";
import { Divider, TextField } from "@mui/material";
import { useState } from "react";
import { blocks } from 'config/index'
import CustomQuerybuilder from "components/customQuerybuilder";

const ReactEditorJS = createReactEditorJS();

const Dashboard = () => {
  const [formatedValue, setFormatedValue] = useState();

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
  return (
    <Card>
      <Title title="Welcome to the administration" />
      <CardContent>Lorem ipsum sic dolor amet...</CardContent>
      <CustomQuerybuilder />
      {/* <Posts />
      <Querybuilder />
      <TextField
        value={formatedValue}
        multiline
        variant="outlined"
        onChange={handleExcelPasteData}
      /> */}
      <Divider />
      {/* <ReactEditorJS defaultValue={blocks} /> */}
    </Card>
  );
};


export default Dashboard;