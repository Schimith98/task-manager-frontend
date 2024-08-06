import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useModal } from '../../contexts/ModalContext';
import HelpIcon from '@mui/icons-material/Help';

type Props = {
    title: string
    description: string | string [];
}

const InfoModal: React.FC<Props> = ({ title, description }) => {
  const { closeModal } = useModal()

  const handleClose = () => {
    closeModal()
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {typeof description === 'string' ?  description : description.map(el => <>{el}<br/><br/></>)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;