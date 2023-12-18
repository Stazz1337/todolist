import React from 'react';
import { Grid } from '@mui/material';
import { CSSObject as ICSSObject } from '@emotion/react';

interface ILayout {
  children?: React.ReactNode;
}

interface ICSS {
  [key: string]: ICSSObject;
}

const css: ICSS = {
  wrapGrid: { height: '100vh', p: 2 },
  childrenWrapGrid: { maxWidth: '900px' },
};

const Layout = ({ children }: ILayout) => {
  return (
    <Grid container justifyContent='center' alignItems='flex-start' sx={css.wrapGrid}>
      <Grid container sx={css.childrenWrapGrid}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
