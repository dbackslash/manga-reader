import React from 'react';
import { Link as MuiLink, LinkProps } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export function Link(props: Props) {

  return (
    <MuiLink {...props} component={RouterLink} />
  );
}

interface Props extends LinkProps {
  to: string;
}
