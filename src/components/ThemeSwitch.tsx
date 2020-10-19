import React from 'react';
import { Grid, Switch } from '@material-ui/core';
import { Brightness1, Brightness2 } from '@material-ui/icons';
import { useAppState } from '../appState';

function ThemeSwitch() {
  const [{ theme }, { setTheme }] = useAppState();

  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>
        <Brightness1 />
      </Grid>
      <Grid item>
        <Switch checked={theme === 'dark'} onChange={e => setTheme(e.target.checked ? 'dark' : 'light')} name="theme" />
      </Grid>
      <Grid item>
        <Brightness2 />
      </Grid>
    </Grid>
  )
}

export default ThemeSwitch;
