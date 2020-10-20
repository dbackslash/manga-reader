import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useQuery } from 'hooks/ipcQuery';
import { Loader } from 'components/ui';
import MangaCard from 'components/MangaCard';

function FavoritesScreen() {
  const { data: favorites, loading } = useQuery<MangaDocument[]>('getFavorites');

  return (
    <div>
      <Typography variant="h5" gutterBottom>Favorite Manga</Typography>
      <Loader loading={loading} />
      
      <Grid container spacing={3}>
        {favorites?.map(mangaDoc => (
          <Grid item key={mangaDoc._id} xs={6} md={4} lg={3}>
            <MangaCard manga={mangaDoc.manga} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FavoritesScreen;
