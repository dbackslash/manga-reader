import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useQuery } from 'hooks/ipcQuery';
import { Loader } from 'components/ui';
import MangaCard from 'components/MangaCard';

function DiscoverScreen() {
  const { data: mangas, loading } = useQuery<Manga[]>('topManga');

  return (
    <div>
      <Typography variant="h5" gutterBottom>Popular Manga</Typography>
      <Loader loading={loading} />
      
      <Grid container spacing={3}>
        {mangas?.map(manga => (
          <Grid item key={manga.url} xs={6} md={4} lg={3}>
            <MangaCard manga={manga} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DiscoverScreen;
