import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddContact from '../components/AddContact';
import EditContact from '../components/EditContact';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

function Agenda() {
    const [contacts, setContacts] = useState([]);
    const [openAdd, setOpenAdd] = useState(false); 
    const [openEdit, setOpenEdit] = useState(false); 
    const [editContact, setEditContact] = useState(null); 

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch('http://localhost:5000/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error('Error fetching contacts:', error));
    };

    const handleAddContact = (newContact) => {
        fetch('http://localhost:5000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContact),
        })
            .then(response => response.json())
            .then(addedContact => {
                setContacts([...contacts, addedContact]);
            })
            .catch(error => console.error('Error adding contact:', error));
    };

    const handleEditClick = (contact) => {
        setEditContact(contact);
        setOpenEdit(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEdit(false); 
        setEditContact(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditContact({
            ...editContact,
            [name]: value,
        });
    };

    const handleSaveEdit = () => {
        fetch(`http://localhost:5000/contacts/${editContact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editContact),
        })
            .then(response => response.json())
            .then(updatedContact => {
                setContacts(contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact)));
                handleCloseEditDialog();
            })
            .catch(error => console.error('Error updating contact:', error));
    };

    const handleDeleteContact = (contactId) => {
        fetch(`http://localhost:5000/contacts/${contactId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setContacts(contacts.filter(contact => contact.id !== contactId));
            })
            .catch(error => console.error('Error deleting contact:', error));
    };

    const handleOpenAddDialog = () => {
        setOpenAdd(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAdd(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Contact List
            </Typography>

            <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
                Add Contact
            </Button>

            {contacts.length > 0 ? (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.map(contact => (
                                <StyledTableRow key={contact.id}>
                                    <StyledTableCell>{contact.name}</StyledTableCell>
                                    <StyledTableCell>{contact.email}</StyledTableCell>
                                    <StyledTableCell>{contact.phone}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEditClick(contact)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteContact(contact.id)} style={{ marginLeft: '10px' }}>
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No contacts available</Typography>
            )}

          
            <AddContact
                open={openAdd}
                handleClose={handleCloseAddDialog}
                handleAddContact={handleAddContact}
            />

          
            <EditContact
                open={openEdit}
                handleClose={handleCloseEditDialog}
                contact={editContact}
                handleInputChange={handleInputChange}
                handleSave={handleSaveEdit}
            />
        </Container>
    );
}

export default Agenda;