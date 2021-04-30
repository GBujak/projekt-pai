import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, TextField, Typography } from '@material-ui/core';
import React from 'react';

interface Props {

};

export const ReviewService: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Oceń usługę
            </Button>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ocena usługi</DialogTitle>
                <DialogContent>
                    <TextField label="Opis słowny" variant="outlined" fullWidth multiline />
                    <Typography style={{ margin: "1rem 0" }}>Ocena w skali 1 do 5:</Typography>
                    <Slider
                        style={{ display: 'block', width: '70%', margin: 'auto' }}
                        min={1} max={5} step={1} defaultValue={3}
                        valueLabelDisplay="auto"
                        marks
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Anuluj</Button>
                    <Button onClick={handleClose} variant="outlined" color="primary">Wystaw ocenę</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};