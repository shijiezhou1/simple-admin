import {
  Query,
  Builder,
  Utils as QbUtils,
  ImmutableTree,
} from "@react-awesome-query-builder/mui";
import { MuiConfig, MuiWidgets } from "@react-awesome-query-builder/mui";
import { useState } from "react";

const tmpConfig = {
  ...MuiConfig,
  fields: {
    qty: {
      label: "Qty",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    price: {
      label: "Price",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 10,
        max: 100,
      },
      preferWidgets: ["slider", "rangeslider"],
    },
    name: {
      label: "Name",
      type: "text",
    },
    color: {
      label: "Color",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "orange", title: "Orange" },
        ],
      },
    },
    is_promotion: {
      label: "Promo?",
      type: "boolean",
      operators: ["equal"],
      valueSources: ["value"],
    },
  },
};

export default () => {
  const queryValue = { id: QbUtils.uuid(), type: "group" };

  const [config, setConfig] = useState(tmpConfig);
  const [tree, setTree] = useState(
    QbUtils.checkTree(QbUtils.loadTree(queryValue), config)
  );

  const onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`

    setTree(immutableTree);
    setConfig(config);

    const jsonTree = QbUtils.getTree(immutableTree);
    console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };

  const renderResult = () => {
    return (
      <div className="query-builder-result">
        <div>
          Query string:{" "}
          <pre>{JSON.stringify(QbUtils.queryString(tree, config))}</pre>
        </div>
        <div>
          MongoDb query:{" "}
          <pre>{JSON.stringify(QbUtils.mongodbFormat(tree, config))}</pre>
        </div>
        <div>
          SQL where:{" "}
          <pre>{JSON.stringify(QbUtils.sqlFormat(tree, config))}</pre>
        </div>
        <div>
          JsonLogic:{" "}
          <pre>{JSON.stringify(QbUtils.jsonLogicFormat(tree, config))}</pre>
        </div>
      </div>
    );
  };

  const renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder">
        <Builder {...props} />
      </div>
    </div>
  );

  return (
    <>
      <Query
        {...config}
        value={tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      {renderResult()}
    </>
  );
};
