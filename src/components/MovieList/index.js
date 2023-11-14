// import { PlayArrow } from "@mui/icons-material";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import {
//     Card,
//     Grid,
//     CardMedia,
//     IconButton,
//     CardHeader,
//     Typography,
//     CardActions,
//     CardContent
// } from "@mui/material";

// import { Link } from "react-router-dom";

// import { useSyncExternalStore } from 'react';
// import { moviesStore } from '../store/movies.js';

// export default function MovieList() {
//     const moviesStoreLocal = useSyncExternalStore(moviesStore.subscribe, moviesStore.getSnapshot);

//     const cardList = moviesStoreLocal.map((item, index) => {
//         return (
//             <Grid key={index} item xs={12} md={4} lg={3} alignItems="stretch">
//                 <Card>
//                     <CardHeader
//                         className="card_header"
//                         title={`Release date: ${item.Year}`}
//                         subheader={`Type: ${item.Type}`}
//                     />
//                     <CardMedia
//                         component="img"
//                         height="194"
//                         image={item.Poster && item.Poster !=="N/A" ? item.Poster : 'http://via.placeholder.com/640x360'}
//                         alt={item.Title}
//                     />
//                     <CardContent>
//                         <Typography className="card_title" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                             {item.Title}
//                         </Typography>
//                     </CardContent>
//                     <CardActions>
//                         <IconButton aria-label="add to favorites">
//                             <FavoriteIcon />
//                         </IconButton>
//                         <Link className='card_link' to={`movie/${item.imdbID}`}>
//                             <PlayArrow />
//                         </Link>
//                     </CardActions>
//                 </Card>
//             </Grid>
//         )
//     })
//     return (
//         <Grid container spacing={2} alignItems="flex-start">
//             {cardList}
//         </Grid>
//     )
// }