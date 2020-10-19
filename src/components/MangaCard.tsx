import React from 'react';
import { makeStyles, Card, CardMedia, Typography, CardContent, Chip, Grid, IconButton, CardHeader } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { useQuery, callIpcQuery } from 'hooks/ipcQuery';

function MangaCard({ manga }: Props) {
  const classes = useStyles();
  const { data: mangaDoc, refetch } = useQuery<MangaDocument>('getMangaMeta', manga);

  const handleFav = async () => {
    await callIpcQuery('favManga', manga, mangaDoc);
    refetch();
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={manga.cover}
        title={manga.title}
      />
      <div className={classes.details}>
        <CardHeader
          action={
            <IconButton
              aria-label="add to favorites"
              className={mangaDoc?.favorite ? classes.fav : ''}
              onClick={handleFav}
            >
              <Favorite />
            </IconButton>
          }
          title={manga.title}
          subheader={manga.authors.join(', ')}
        />
        <CardContent className={classes.content}>
          <Typography>
            {manga.numChapters} Chapters. ({manga.status})
          </Typography>
          <Typography>
            {manga.type}
          </Typography>
          <Grid container spacing={1}>
            {manga.genres.map(genre => (
              <Grid item key={genre}>
                <Chip
                  key={genre}
                  label={genre}
                  // variant="outlined"
                  color="primary"
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

interface Props {
  manga: Manga;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    width: 200,
  },
  content: {
    // flex: '1 0 auto',
  },
  fav: {
    color: 'red',
  }
}));

export default MangaCard;
