import * as React from 'react';
import { Snackbar, withStyles, SnackbarContent, Icon, colors, IconButton } from '@material-ui/core';
import { CheckCircle, Warning, Error, Info, Close } from "@material-ui/icons";

type MessageProps = {
  variant: 'success' | 'warning' | 'error' | 'info'
  message: React.ReactNode
  onExited: () => void
} & {
  classes?: {
    message: string
    icon: string
    variants: {[key: string]: string},
    close: string
  }
}

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const Message = (props: MessageProps) => {
  const { variant, message, onExited, classes } = props;
  const [ open, setOpen ] = React.useState<boolean>(false);
  const Icon = variantIcon[variant];
  React.useEffect(() => {
    setOpen(true);
  }, [message]);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      onExited={onExited}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classes.icon} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

export default withStyles(theme => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  close: {
    padding: theme.spacing.unit * 2,
  },
  success: {
    backgroundColor: colors.green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: colors.amber[700]
  },
}))(Message);