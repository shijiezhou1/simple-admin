import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';
import Posts from 'components/posts';
import Querybuilder from "components/querybuilder";
import { Container } from "@mui/material";

export default () => (
    <Card>
        <Title title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        <Posts />
        <Container><Querybuilder /></Container>
    </Card>
);