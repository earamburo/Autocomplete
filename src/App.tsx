import { useState, useEffect } from 'react';
import './App.css'
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { mockClients } from './mock/clients';


// Fetch the API, mock data in seperate file
// Import Autocomplete from MUI, install MUI library, use Autocomplete docs
// Install other packages, VITE to run server


// Reoriganize client to show up LN, FN, TITLE
//Function format name
// split up name into first and last, mapping using space as identifier, see if there's two name
// check if theres a title 
// Display select user's information below

//Debounce the search input to a 1 second delay so the user can type a bit and not overload search
//Only necessary with heavy search filtering
//Write test
//use case,
// 1. name exists and clicks options, info is shown
// 2. name DNE, no option is show

export const App = () => {

  interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string
  }

  interface Company {
    name: string,
    catchPhrase: string,
    bs: string
  }

  interface Client {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company

  }

  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null)
  const [client, selectedClient] = useState<Client | null>(null);
  const [inputValue, setInputValue] = useState('');



  const fetchClients = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setClients(data);
    }
    catch (err: any) {
      setError(` ${err.message}, An API error occurred we are have to use mock data`);
      const mockData = mockClients;
      setClients(mockData)
    }
  };

  useEffect(() => {
    fetchClients();
  }, [])


  const formatName = (fullName: string) => {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    if (nameParts.length > 2) {
      return (
        `${nameParts[2]}, ${nameParts[1]}, (${nameParts[0]})`
      )
    }
    return (
      `${nameParts[0]}, ${nameParts[1]}`
    )
  }

  return (
    <div>
      <img style={{ width: '200px' }} src="/experient.png"></img>
      <Autocomplete
        value={client}
        onChange={(_, newClient: Client | null) => selectedClient(newClient)}
        inputValue={inputValue}
        onInputChange={(_, newInputValue: string) => {
          setInputValue(newInputValue)
        }}
        options={clients}
        getOptionLabel={(client) => formatName(client?.name)}
        renderInput={(params) => <TextField {...params} label="Name" />}
        sx={{ width: 320 }}

      />
      {client ?
        (
          <Box sx={{ textAlign: 'left', mt: '1em' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{formatName(client?.name)}</Typography >
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{client.address?.street}</Typography >
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{client.address?.suite}</Typography >
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{client.address?.zipcode}</Typography >
          </Box>
        )
        : <><Typography color='error'>{error}</Typography></>
      }
    </div>
  )
};


