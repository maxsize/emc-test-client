import * as React from 'react';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow, AppBar, colors, Typography, Button, Grid, Link } from '@material-ui/core';
import { RouteComponentProps, withRouter, Link as RouterLink } from "react-router-dom";
import BookContext from './../../contexts/books-context';
import Reserve from './reserve';
import fetchUtils from '../../utils/fetch-utils';

type Props = {
  classes: {
    root: string
    topbar: string
    profile: string
  }
} & RouteComponentProps<any>

const Home = (props: Props) => {
  const { classes, history } = props;
  const {
    books,
    onBooks
  } = React.useContext(BookContext);
  React.useEffect(() => {
    if (books.total === 0) onBooks();
  });
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.topbar}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6" color="inherit">Library</Typography>
          <span>
            <RouterLink to="/profile">
              <Button className={classes.profile}
              >
                My Reservations
              </Button>
            </RouterLink>
            <Button color="inherit"
              onClick={() => {
                window.localStorage.setItem('token', undefined);
                history.push('/login');
              }}
            >
              Logout {fetchUtils.getUser().name}
            </Button>
          </span>
        </Grid>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Count</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(books.result || []).map(b => (
            <TableRow key={b._id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.description}</TableCell>
              <TableCell>Total: {b.count}, {b.count - b.reserved} remains</TableCell>
              <TableCell>
                <Reserve book={b} 
                  onReserved={done => {
                    if (done) {
                      onBooks();
                    }
                  }} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default withStyles(theme => ({
  root: {},
  topbar: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
  profile: {
    color: theme.palette.grey[50],
  }
}))(withRouter(Home));