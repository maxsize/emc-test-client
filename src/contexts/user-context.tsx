import * as React from 'react';
import fetchUtils from '../utils/fetch-utils';
import Message from '../components/message';
import { RouteComponentProps, withRouter } from 'react-router';

export type ID = { _id: string };
export type User = {
  name: string
  password: string
} & ID
export type Reservation = {
  user_id,
  book_id,
  start_date,
  end_date,
} & ID
type ReserveParam = {
  book_id: string
  start_date: number,
  end_date: number,
}
type ContextType = {
  reservations: Reservation[]
  onLogin: (name: string, password: string) => PromiseLike<boolean>
  onReserve: (param: ReserveParam) => PromiseLike<boolean>
  onMyReservations: (user_id: string) => PromiseLike<boolean>
  onSignup: (name: string, pwd: string) => PromiseLike<boolean>
} & {
  messageProps?: MessageProps
}
type MessageProps = {
  variant: 'success' | 'warning' | 'error' | 'info'
  message: React.ReactNode
}
const success = 'success';

const UserContext = React.createContext<Partial<ContextType>>({});

const { post } = fetchUtils;
class Provider extends React.Component<RouteComponentProps<any> & any, ContextType> {
  redirect = (response: any) => {
    fetchUtils.invalidToken(response) && this.props.history.push('/login');
  }

  handleLogin = (username: string, password: string) => new Promise<boolean>(async res => {
    try {
      const result = await post("/api/user/login", { username, password });
      this.redirect(result);
      window.localStorage.setItem('token', JSON.stringify(result));
      res(true);
    } catch (error) {
      res(false);
    }
  })

  handleReserve = ({ book_id, start_date, end_date }: ReserveParam) => new Promise<boolean>(async res => {
    try {
      const { code, message } = await post(`/api/books/${book_id}/reserve`, { start_date, end_date });
      this.redirect({ code });
      res(code === success);
      if (code !== success) {
        this.setState({
          messageProps: {
            variant: 'error',
            message,
          }
        })
      } else {
        this.setState({
          messageProps: {
            variant: 'success',
            message,
          }
        })
      }
    } catch (error) {
      res(false);
    }
  })

  handleMyReserve = (user_id: string) => new Promise<boolean>(async res => {
    try {
      const { code, data } = await post(`api/user/${user_id}/reservations`, {});
      this.redirect({ code });
      if (code === success) {
        this.setState({ reservations: data });
        res(true);
      } else {
        res(false);
      }
    } catch (error) {
      res(false);
    }
  })

  handleSignup = (name: string, password: string) => new Promise<boolean>(async res => {
    try {
      const { code, message } = await post('api/user', { name, password });
      this.redirect({ code });
      res(code === success);
      this.setState({
        messageProps: {
          variant: code as any,
          message
        }
      })
    } catch (error) {
      res(false);
    }
  })

  state: ContextType = {
    reservations: [],
    onLogin: this.handleLogin,
    onReserve: this.handleReserve,
    onMyReservations: this.handleMyReserve,
    onSignup: this.handleSignup,
  }

  render() {
    const { messageProps } = this.state;
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
        {messageProps && <Message {...messageProps} onExited={() => this.setState({ messageProps: undefined })} />}
      </UserContext.Provider>
    )
  }
}

export default UserContext;
export const UserContextProvider = withRouter(Provider);
