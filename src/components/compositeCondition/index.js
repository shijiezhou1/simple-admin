import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  CardHeader,
  CardContent,
  Card,
  Autocomplete,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { useTranslate } from "react-admin";
import { FILTER_CATEGORY, SIZING_LOGICS_TYPE } from "config/constant";
import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { OPR_OPT, OPR_MATCH_SQL, OPR_OPT_CONFIG } from "config/sqlConstant";
import { uuid } from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDataModelCol,
  selectSizing,
  updateDynamicData,
} from "reducers/sizingSlice";

const DROPDOWN_WIDTH = Object.freeze({
  FIRST: 0.25,
  SECOND: 0.25,
  THIRD: 0.25,
  FOURTH: 0.25,
});

const CONDITION_TYPE = Object.freeze({
  FIELD: "field",
  OPERATOR: "operator",
  VALUE: "value",
  FULLLOGIC: "fullLogic",
  ISREADY: "isReady",
  CATEGORY: "category",
  RULE: "rule",
  LOADER: "loader",
  DATA: "data",
  ERROR: "error",
  ISEXPAND: "isExpand",
});

const DataModelCol = [
  "Market Sector",
  "GHO",
  "age",
  "product",
  "trb",
  "account type",
  "is active",
];

const COMBINATOR = {
  AND: "and",
  OR: "or",
};

const eachRowStyle = {
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  paddingLeft: 6,
  borderLeft: 2 + "px solid lightgray",
  marginLeft: 4,
  py: 1,
  borderRadius: "unset",
  position: "relative",
};

const ToggleOperator = ({
  defaultOperator = COMBINATOR.AND,
  isMainOperator = false,
}) => {
  const [alignment, setAlignment] = useState(defaultOperator);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="opr"
      size="small"
      sx={isMainOperator ? null : eachRowStyle}
    >
      <ToggleButton value="and" aria-label="left aligned">
        AND
      </ToggleButton>
      <ToggleButton value="or" aria-label="centered">
        OR
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

function LineTemplate() {
  return (
    <Box
      sx={{
        backgroundColor: "lightgrey",
        position: "absolute",
        width: "48px",
        height: "2px",
        top: "50%",
        left: "0",
      }}
    />
  );
}

const SearchAutocomplete = () => {
  const translate = useTranslate();
  const sz = useSelector(selectSizing);
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        console.info("callback: ", callback);
        console.info("request: ", request);
        dispatch(getAllDataModelCol({ searchTerm: request.input })).finally(
          () => {
            callback(sz.dataModelCol);
          }
        );
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      sx={{ width: DROPDOWN_WIDTH.FIRST, mr: 1 }}
      // options={sz.dataModelCol}
      getOptionLabel={(option) => option.col_label}
      filterOptions={(x) => x}
      options={options}
      includeInputInList
      filterSelectedOptions
      autoComplete
      size="small"
      noOptionsText="enter base column key word"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        console.log(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={translate("column")} />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.constraints[0]}>
            <span
              style={{
                wordBreak: "break-all",
              }}
            >
              {option.col_label}
            </span>
          </li>
        );
      }}
    />
  );
};

const AutocompleteRowOption = () => {
  const translate = useTranslate();
  const [operatorList, setOperatorList] = useState(OPR_OPT);

  return (
    <Stack sx={eachRowStyle} direction="row" component="div">
      <SearchAutocomplete />
      {/* // basedata OPERATOR */}
      <Autocomplete
        sx={{ width: DROPDOWN_WIDTH.SECOND, mr: 1 }}
        options={operatorList}
        getOptionLabel={(option) => translate(option)}
        onChange={(event, value) => {}}
        size="small"
        renderInput={(params) => (
          <TextField {...params} label={translate("operator")} />
        )}
        value={""}
        renderOption={(props, option) => {
          return (
            <li {...props} key={"list_item_" + option}>
              <span
                style={{
                  wordBreak: "break-all",
                }}
              >
                {translate(option)}
              </span>
            </li>
          );
        }}
      />
      <TextField
        sx={{ width: DROPDOWN_WIDTH.THIRD, mr: 1 }}
        label={translate("value")}
        variant="outlined"
        size="small"
        color="primary"
        onChange={(e) => {}}
      />

      <LineTemplate></LineTemplate>
    </Stack>
  );
};

const CategoryContainer = (prop) => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const sz = useSelector(selectSizing);

  const handleAddCondition = (e) => {
    dispatch(
      updateDynamicData({
        name: prop.name,
        value: [...sz[prop.name], { id: uuid() }],
      })
    );
  };

  return (
    <>
      <Stack direction="row" component="div">
        <Typography variant="h6">{prop.title}</Typography>
      </Stack>

      <Stack direction="column" component="div">
        {prop.children}
      </Stack>

      <Stack
        direction="row"
        component="div"
        sx={{ ...eachRowStyle, pt: 0, pb: 1, borderLeftStyle: "dashed" }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={handleAddCondition}
          startIcon={<AddCircleOutlineIcon />}
        >
          {translate("add")}
        </Button>
      </Stack>

      <Divider />
    </>
  );
};

const CompositeConditionSimple = () => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const sz = useSelector(selectSizing);

  useEffect(() => {
    dispatch(getAllDataModelCol({}));
  }, []);

  return (
    <Box>
      <CategoryContainer title="Base data:" name="sizingBasedata">
        {sz.sizingBasedata.map((item, index) => (
          <AutocompleteRowOption key={index} />
        ))}
      </CategoryContainer>

      <CategoryContainer title="Filter: ">
        <ToggleOperator isMainOperator={true} />
        <AutocompleteRowOption />
        <ToggleOperator />
        <AutocompleteRowOption />
        <ToggleOperator />
        <AutocompleteRowOption />
      </CategoryContainer>

      <CategoryContainer title="Whitelist / Blacklist: ">
        <ToggleOperator isMainOperator={true} />
        <AutocompleteRowOption />
        <ToggleOperator />
        <AutocompleteRowOption />
        <ToggleOperator />
        <AutocompleteRowOption />
      </CategoryContainer>

      <CategoryContainer title="Tags: ">
        <ToggleOperator isMainOperator={true} />
        <AutocompleteRowOption />
        <ToggleOperator />
        <AutocompleteRowOption />
        <ToggleOperator />
        <AutocompleteRowOption />
      </CategoryContainer>

      <Divider />
    </Box>
  );
};

export default CompositeConditionSimple;
