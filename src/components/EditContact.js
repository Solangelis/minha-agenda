import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

function EditContact({ open, handleClose, contact, handleInputChange, handleSave }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    name="name"
                    value={contact?.name || ''}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    value={contact?.email || ''}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Phone"
                    name="phone"
                    value={contact?.phone || ''}
                    onChange={handleInputChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditContact;