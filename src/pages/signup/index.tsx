import * as React from 'react';
import { Link as RouterLink, RouteComponentProps, withRouter } from "react-router-dom";
import { withStyles, Grid, Paper, TextField, Button } from '@material-ui/core';
import UserContext from '../../contexts/user-context';
import md5 from 'md5';

type Props = {
  classes: {[key: string]: string}
} & RouteComponentProps<any>
const Signup = (props: Props) => {
  const { classes } = props;
  const {
    onSignup
  } = React.useContext(UserContext);
  const [ name, setName ] = React.useState<string>();
  const [ pwd, setPwd ] = React.useState<string>();
  const [ repwd, setRepwd ] = React.useState<string>();
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <h2>Sign up</h2>
        <TextField
          required
          label="Name"
          id="username"
          placeholder="Input name"
          value={name}
          margin="normal"
          fullWidth
          onChange={e => setName(e.target.value)}
        />
        <TextField
          required
          type="password"
          label="Password"
          id="password"
          placeholder="Input password"
          value={pwd}
          margin="normal"
          fullWidth
          onChange={e => setPwd(e.target.value)}
        />
        <TextField
          required
          type="password"
          label="Re-Password"
          id="re-password"
          placeholder="Input password again"
          value={repwd}
          margin="normal"
          fullWidth
          error={repwd !== pwd}
          helperText={repwd !== pwd ? 'Passwords are not match.' : undefined}
          onChange={e => setRepwd(e.target.value)}
        />
        <Button variant="contained" 
          color="primary"
          onClick={async () => {
            if (pwd === repwd) {
              const succeed = await onSignup(name, md5(pwd));
              if (succeed) {
                props.history.push('/login');
              }
            }
          }}
        >
          Sign Up
        </Button>
      </Paper>
    </Grid>
  )
}

export default withStyles(theme => ({
  root: {
    height: '100vh'
  },
  paper: {
    padding: theme.spacing.unit
  }
}))(withRouter(Signup));
