import * as React from 'react';
import { TextField, Grid, Paper, Button, Link, withStyles } from "@material-ui/core";
import { Link as RouterLink, RouteComponentProps, withRouter } from "react-router-dom";
import md5 from 'md5';
import UserContext from '../../contexts/user-context';

type Props = {
  classes: {
    root: string
    paper: string
  }
} & RouteComponentProps<any>
const Login = (props: Props) => {
  const { classes, history } = props;
  const [ name, setName ] = React.useState<string>('');
  const [ password, setPassword ] = React.useState<string>('');
  const {
    onLogin,
  } = React.useContext(UserContext);
  return (
    <Grid className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <form>
        <Paper className={classes.paper}>
          <TextField
            required
            id="username"
            label="Name"
            placeholder="Input user name"
            value={name}
            onChange={e => setName(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            placeholder="Input password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Grid container justify="space-around" alignItems="center">
            <Button variant="contained" 
              color="primary"
              onClick={async () => {
                const succeed = await onLogin(name, md5(password));
                if (succeed) {
                  // history.push('/');
                  window.location.href = `//${window.location.host}`;
                }
              }}
            >
              Sign in
            </Button>
            {/* <Link>
              <RouterLink to="/signup">Sign up</RouterLink>
            </Link> */}
            {/* <Link component={MyLink}>Sign Up</Link> */}
            <RouterLink to="/signup">
              <Button color="inherit">Sign Up</Button>
            </RouterLink>
          </Grid>
        </Paper>
      </form>
    </Grid>
  )
}

export default withStyles(theme => ({
  root: {
    height: '100vh'
  },
  paper: {
    padding: 10
  }
}))(withRouter(Login));