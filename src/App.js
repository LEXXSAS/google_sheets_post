import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import { FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

function App() {
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [sheet, setSheetData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
      axios.get(`https://script.google.com/macros/s/AKfycbzk7EFMfLxgsGruJDUC4f0wfS9sEhF1lhba5V1RKUxfyZnXZ6wCG63baFve0i0c0tD0ug/exec`)
      .then(response => {
        let users = response.data.users.slice(1);
        setData(users);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  
  useEffect(() => {
    if (sheet === null) {
      return
    } else {
      let n = sheet.slice(1)
      setData(n);
    }
  }, [sheet])

  const handleSubmit = (event) => {
    event.preventDefault();
    // let Name = event.target.Name.value;
    // let Message = event.target.Name.value;

    const data = {
      Name: userName,
      Message: userMessage
    }

    axios.post('https://sheet.best/api/sheets/dbb6289a-58f8-4f5a-87a5-be954f7ec33f', data).then((response) => {
    // console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
    setUserName('');
    setUserMessage('');

      axios.get(`https://script.google.com/macros/s/AKfycbzk7EFMfLxgsGruJDUC4f0wfS9sEhF1lhba5V1RKUxfyZnXZ6wCG63baFve0i0c0tD0ug/exec`)
      .then(response => {
        let users = response.data.users.slice(1);
        setData(users);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const handleDelete = (id) => {
    axios.delete(`https://sheet.best/api/sheets/dbb6289a-58f8-4f5a-87a5-be954f7ec33f/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      axios.get(`https://script.google.com/macros/s/AKfycbzk7EFMfLxgsGruJDUC4f0wfS9sEhF1lhba5V1RKUxfyZnXZ6wCG63baFve0i0c0tD0ug/exec`)
      .then(response => {
        let users = response.data.users.slice(1);
        setData(users);
      })
      .catch(error => {
        console.log(error);
      })
    })
  }

  return (
    <div className="App">
      <div style={{marginTop: '5rem'}}>
      <FormControl component="form" onSubmit={handleSubmit} sx={{border: '1px solid rgba(0, 0, 0, 0.2)'}}>
        <TextField label="Enter name" variant="outlined"
          onChange={(e) => setUserName(e.target.value)}
          style={{ width: "250px", margin: "5px" }}
          type="text"
          name="Name"
          value={userName}
          id="Name"
          placeholder="Enter name"
        />
       <TextField label="Enter message" variant="outlined" multiline rows={3}
          onChange={(e) => setUserMessage(e.target.value)}
          style={{ width: "250px", margin: "5px" }}
          type="text"
          name="Message"
          value={userMessage}
          id="Message"
          placeholder="Enter message"
        />
        <Button style={{ width: "250px", margin: "5px" }} variant="contained" type="submit">Submit</Button>
        {/* <Button onClick={getData} style={{ width: "250px", margin: "5px" }} variant="contained" type="button">Get Data</Button> */}
      </FormControl>
      </div>
      <div>
        
          {/* <caption style={{textAlign: 'left'}}> */}
          <h4 style={{marginBottom: '0.3rem'}}>Data from Google:</h4>
          {/* </caption> */}
          <br />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Message</TableCell>
            <TableCell align="right">Buttons</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(data !== null) ? data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="left">"{row.Message}"</TableCell>
              <TableCell align="right"><Button onClick={(e) => handleDelete(index)} variant="outlined">Delete</Button></TableCell>
            </TableRow>
          )) : <TableRow><TableCell><h4>Загрузка данных...</h4></TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>

      </div>
    </div>
  );
}

export default App;
