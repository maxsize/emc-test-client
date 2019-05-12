import * as React from 'react';
import { withStyles, Grid, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Book } from '../../../contexts/books-context';
import UserContext from '../../../contexts/user-context';
import {DateFormatInput, TimeFormatInput} from 'material-ui-next-pickers'
import * as moment from 'moment';

type Props = {
  book: Book,
  onReserved: (succeed: boolean) => void,
  classes?: {
    root: string,
    content: string,
    text: string,
  }
}
const Reserve = (props: Props) => {
  const {
    onReserve
  } = React.useContext(UserContext);
  const { book, onReserved, classes } = props;
  const [ open, setOpen ] = React.useState<boolean>(false);
  const [ busy, setBusy ] = React.useState<boolean>(false);
  const [ startDate, setStartDate ] = React.useState<Date>(new Date());
  const [ startTime, setStartTime ] = React.useState<Date>(new Date());
  const [ endDate, setEndDate ] = React.useState<Date>(moment.default().days(7).toDate());
  const [ endTime, setEndTime ] = React.useState<Date>(new Date());
  const [ error, setError ] = React.useState<string>();
  return (
    <React.Fragment>
      <Button color="primary" onClick={() => setOpen(true)}>Reserve</Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setError(undefined);
        }}
        title={`Reserve ${book.title}`}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Reserve {book.title}</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.text}>
            Enjoy the reading.
          </DialogContentText>
          {error && <DialogContentText color="secondary" className={classes.text}>
            {error}
          </DialogContentText>}
          <Grid container direction="row" spacing={16}>
            <Grid item xs={6}>
              <DateFormatInput label="Pick start date" name='date-input' value={startDate} onChange={date => setStartDate(date)} min={new Date()} max={endDate} />
            </Grid>
            <Grid item xs={6}>
              <TimeFormatInput label="Pick start time" name='time-input' value={startTime} onChange={time => setStartTime(time)} />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={16}>
            <Grid item xs={6}>
              <DateFormatInput label="Pick end date" name='date-input' value={endDate} onChange={date => setEndDate(date)} min={startDate} />
            </Grid>
            <Grid item xs={6}>
              <TimeFormatInput label="Pick end time" name='time-input' value={endTime} onChange={time => setEndTime(time)} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" 
            onClick={() => {
              setOpen(false);
              setError(undefined);
            }}>
            Cancel
          </Button>
          <Button color="primary"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              const start_date = startDate.getTime();
              const end_date = endDate.getTime();
              if (end_date - start_date < 60*60*1000) {
                setError('Duration must over than 60 minutes.');
                setBusy(false);
              } else {
                const done = await onReserve({ book_id: book._id, start_date, end_date });
                onReserved(done);
                setOpen(false);
                setBusy(false);
              }
            }}
          >
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default withStyles(theme => ({
  root: {
  },
  content: {
  },
  text: {
    fontSize: 20,
    marginBottom: theme.spacing.unit * 2,
  },
}))(Reserve);