import { Component } from "react";
import { get } from "lodash";
import { Typography, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData, setData, dataAddOne, dataRemoveOne } from "reducers/dataSlice";

// class Classcomponent extends Component {
//   get computed() {
//     return get(this.props.value, "data[0].firstName", "");
//   }

//   get computed2() {
//     return get(this.props.value, "data[0].lastName", "");
//   }

//   render() {
//     return (
//       <div>
//         ----------------------------------------
//         {this.computed}, {this.computed2}
//       </div>
//     );
//   }
// }

const Classcomponent = (props) => {
  const computed = get(props.value, "data[0].firstName", "");
  const computed2 = get(props.value, "data[0].lastName", "");

  const dispatch = useDispatch();
  const dt = useSelector(selectData);

  useEffect(() => {
    // dispatch(setData({ abc: 321 }));
  }, [])

  const handleDataAddOne = (event) => {
    const newData = Math.floor(Math.random() * 10);
    dispatch(dataAddOne({ id: 'a' + newData, name: '苏' + newData }));
  }

  const handleDataRemoveOne = ()=> {
    const newData = Math.floor(Math.random() * 10);
    dispatch(dataRemoveOne('a' +  newData));
  }

  return (
    <Box>
      ----------------------------------------
      {computed}, {computed2}

      <Typography>
        {/* {dt.data.total2} */}
      </Typography>

      <Button onClick={handleDataAddOne}>handleDataAddOne</Button>
      <Button onClick={handleDataRemoveOne}>handleDataRemoveOne</Button>
    </Box>
  );
};

export default Classcomponent;
