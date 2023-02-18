import { useEffect, useState } from 'react';
import { Title, List, ListContextProvider, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput, useRecordContext, useDataProvider, CreateButton, useListContext } from 'react-admin';

import { Typography, Box, Button, Card } from '@mui/material';

const Empty = () => {
  const { basePath, resource } = useListContext();
  return (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        No products available
      </Typography>
      <Typography variant="body1">
        Create one or import from a file
      </Typography>
      <CreateButton basePath={basePath} />
      <Button onClick={() => { }}>Import</Button>
    </Box>
  );
};

const RandomUserList = (props) => {
  // console.log({ props })
  // console.log('randomUserList:::');

  const dataProvider = useDataProvider();

  const [randomUser, setUser] = useState();

  useEffect(() => {

    const getRandomUser = async () => {
      const res = await dataProvider.httpGet();
      setUser(res.data)
      console.log(randomUser);
    };

    getRandomUser();

  }, []);

  return (
    <div>
      <Title title="random list" />
      <Card>
        <Datagrid data={randomUser} sort={{ field: 'id', order: 'ASC' }}>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="phone" />
          <TextField source="username" />
          <TextField source="website" />
          <TextField source="email" />
          <TextField source="company" />
        </Datagrid>
      </Card>
    </div>
  )
}

export default RandomUserList;