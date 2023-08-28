import { Component } from "react";
import { get } from "lodash";

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

  return (
    <div>
      ----------------------------------------
      {computed}, {computed2}
    </div>
  );
};

export default Classcomponent;
