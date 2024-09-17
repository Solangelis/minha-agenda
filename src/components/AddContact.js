import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';

function AddContact({ open, handleClose, handleAddContact }) {
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [phoneLength, setPhoneLength] = useState(0);  
    
    const formatPhoneNumber = (phone) => {
        // Remove todos os caracteres não numéricos
        const cleanPhone = phone.replace(/\D/g, '');

    
        const formattedPhone = cleanPhone
            .replace(/^(\d{2})(\d{5})(\d{0,4})$/, '$1-$2-$3')
            .replace(/-$/, ''); 

        return formattedPhone;
    };

   
    const validate = () => {
        let tempErrors = { name: '', email: '', phone: '' };
        let isValid = true;

        // Validação do nome
        if (!newContact.name) {
            tempErrors.name = 'O nome é obrigatório.';
            isValid = false;
        }

    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newContact.email) {
            tempErrors.email = 'O e-mail é obrigatório.';
            isValid = false;
        } else if (!emailPattern.test(newContact.email)) {
            tempErrors.email = 'Formato de e-mail inválido.';
            isValid = false;
        }

    
        const phonePattern = /^\d{2}-\d{5}-\d{4}$/;
        if (!newContact.phone) {
            tempErrors.phone = 'O telefone é obrigatório.';
            isValid = false;
        } else if (!phonePattern.test(newContact.phone)) {
            tempErrors.phone = 'O telefone deve seguir o formato: (XX)XXXXX-XXXX.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setNewContact({
                ...newContact,
                phone: formattedPhone,
            });
            setPhoneLength(formattedPhone.replace(/\D/g, '').length);  
        } else {
            setNewContact({
                ...newContact,
                [name]: value,
            });
        }
    };


    const handleSave = () => {
        if (validate()) {
            handleAddContact(newContact);
            handleClose();
            setNewContact({ name: '', email: '', phone: '' });
            setPhoneLength(0);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adicionar Novo Contato</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome"
                    name="name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                />
                <TextField
                    margin="dense"
                    label="E-mail"
                    name="email"
                    value={newContact.email}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email} 
                    required
                    type="email"
                />
                <TextField
                    margin="dense"
                    label="Telefone"
                    name="phone"
                    value={newContact.phone}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone} 
                    required
                />
                
                <Typography variant="body2" color="textSecondary">
                    {`Faltam ${11 - phoneLength} dígitos para completar o número (XX-XXXXX-XXXX)`}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancelar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddContact;
