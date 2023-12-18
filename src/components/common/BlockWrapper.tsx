import React from 'react';
import { Grid, Typography } from '@mui/material';
import { CSSObject as ICSSObject } from '@emotion/react';
import theme from '../../theme/MainTheme';

interface IBlockWrapper {
  title?: string;
  children?: React.ReactNode;
}

interface ICSS {
  [key: string]: ICSSObject;
}

const css: ICSS = {
  wrapGrid: { pt: 2, pb: 2 },
  title: { pl: 2, pr: 2, pb: 1 },
  line: { height: '1px', background: theme.palette.grey[200] },
  childrenWrap: { pl: 2, pr: 2, pt: 2 },
};

const BlockWrapper = ({ title, children }: IBlockWrapper) => {
  return (
    <Grid container sx={css.wrapGrid}>
      {!!title && (
        <Grid container>
          <Typography component='h1' sx={css.title}>
            {title}
          </Typography>

          <Grid container sx={css.line} />
        </Grid>
      )}

      <Grid container sx={css.childrenWrap}>
        {children}
      </Grid>
    </Grid>
  );
};

export default BlockWrapper;
