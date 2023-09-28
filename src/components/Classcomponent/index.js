import { Component } from "react";
import { get } from "lodash";
import { Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData, setData } from "reducers/dataSlice";

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
    dispatch(setData({ abc: 321 }));
  }, []);

  return (
    <Box>
      ----------------------------------------
      {computed}, {computed2}
      asd asasdsdasdasdsdawe this is error
      {/* asda dasd s<Typography>{dt.data.total2}</Typography> */}
    </Box>
  );
};

export default Classcomponent;
