import * as React from 'react';
import fetchUtils from '../utils/fetch-utils';
import { ID } from './user-context';
import { RouteComponentProps, withRouter } from 'react-router';

export type PageData<T> = {
  total: number
  page: number
  pageSize: number
  result: T[]
}
export type Book = {
  title: string
  description: string
  count: number,
  reserved: number,
} & ID
type ContextType = {
  books: PageData<Book>,
  onBooks: () => Promise<boolean>,
}

const BookContext = React.createContext<Partial<ContextType>>({});

const { post, get } = fetchUtils;

class Provider extends React.Component<RouteComponentProps<any> & any, ContextType> {
  componentWillMount() {
    this.setState({
      books: {
        total: 0,
        page: 1,
        pageSize: 10,
        result: []
      },
      onBooks: this.handleBooks,
    })
  }

  redirect = (response: any) => {
    fetchUtils.invalidToken(response) && this.props.history.push('/login');
  }

  handleBooks = () => new Promise<boolean>(async res => {
    try {
      const books = await get("/api/books");
      this.redirect(books);
      this.setState({ books });
      res(true);
    } catch (error) {
      res(false);
    }
  })

  render() {
    return (
      <BookContext.Provider value={this.state}>
        {this.props.children}
      </BookContext.Provider>
    )
  }
}

export default BookContext;
export const BookContextProvider = withRouter(Provider);