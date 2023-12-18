import React from 'react';
import { Grid, Paper } from '@mui/material';
import { CSSObject as ICSSObject } from '@emotion/react';

interface IBody {
  children?: React.ReactNode;
}

interface ICSS {
  [key: string]: ICSSObject;
}

const css: ICSS = {
  wrapGrid: { mt: 2, mb: 2 },
  paper: { width: '100%', minHeight: '80vh' },
};

const Body = ({ children }: IBody) => {
  return (
    <Grid container sx={css.wrapGrid}>
      <Paper sx={css.paper}>{children}</Paper>
    </Grid>
  );
};

export default Body;
