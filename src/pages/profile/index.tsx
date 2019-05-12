import * as React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell, withStyles } from '@material-ui/core';
import UserContext from '../../contexts/user-context';
import BookContext, { Book } from '../../contexts/books-context';
import fetchUtils from '../../utils/fetch-utils';

type Props = {
  classes: {[key: string]: string}
}
const Profile = (props: Props) => {
  const { classes } = props;
  const {
    onMyReservations,
    reservations,
  } = React.useContext(UserContext);
  const {
    books,
    onBooks,
  } = React.useContext(BookContext);
  React.useEffect(() => {
    onMyReservations(fetchUtils.getUser()._id);
    onBooks();
  }, [1]);
  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map(r => {
            const book: Partial<Book> = books.result.find(b => r.book_id === b._id) || {};
            return (
              <TableRow key={r._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.description}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default withStyles(theme => ({
  root: {}
}))(Profile);
