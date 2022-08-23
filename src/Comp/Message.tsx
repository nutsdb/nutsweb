import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

//@ts-ignore
export default class Message extends React.Component {
  //@ts-ignore
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //@ts-ignore
  handleClickOpen (event){
    event.stopPropagation();
    this.setState({ open:true });
  };

  //@ts-ignore
  handleClose(event) {
    event.stopPropagation();
    this.setState({ open:false });
  };


  render() {
    // @ts-ignore
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          Value
        </Button>

        <BootstrapDialog
          onClose={this.handleClose}
          aria-labelledby='customized-dialog-title'
          open={this.state.open}
        >

          <BootstrapDialogTitle id='customized-dialog-title' onClose={(event:MouseEvent)=>{
            return this.handleClose(event);}}>
            {this.props.children}
          </BootstrapDialogTitle>
          <DialogContent dividers sx={{ m: 25 }}>
            <Typography>
              Value
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }

}
