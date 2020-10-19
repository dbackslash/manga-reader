import React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export function Loader({ loading }: Props) {
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  )
}

interface Props {
  loading: boolean;
}
