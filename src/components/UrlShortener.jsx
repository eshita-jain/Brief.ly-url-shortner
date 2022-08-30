import React from 'react'
import "./UrlShortener.css";
import {useState,useEffect} from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WindowRounded } from '@mui/icons-material';
import photoshop from "./bg.jpg";

const UrlShortener = () => {
    const [url,setUrl] = useState({});
    const [shortUrl,setShortUrl] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [data,setData] = useState([]);

    useEffect(() => {
      const getdata= async()=>{
         let res = await fetch(`https://url-shortner-mock12.herokuapp.com/api/url/prevoius`,{
             method:"GET",
           });
           let data = await res.json();
           setData(data);
      }
      getdata();
   }, []); 
   console.log(data);

    //closing success popup for signup
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (e)=>{
      let data = e.target.name;
          setUrl({
          ...url,
          [data]: e.target.value,
          [data]: e.target.value,
      });
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      // console.log(url);
      axios.post(`https://url-shortner-mock12.herokuapp.com/api/url/shorten`, url, {
            headers: { "Content-Type": "application/json" },
          }).then((responce) => {
            const { data } = responce;
            setShortUrl(data);
            setOpen(true);
          });
      
    }

  return (
    <>
    <div className='mock11cont'>
    <div className='mock11main'>
    <h1>Brief.ly</h1>
    <p>Enter Your Url</p>
    <form onSubmit={handleSubmit}>
    <input type="text" id="fname" name="longUrl" placeholder="Your url.." onChange={handleChange}/>
    <input type="text" id="fname" name="custom" placeholder="customize it (optional) " onChange={handleChange}/>
    <input type="submit" value="Submit"/>
     </form>
    <div>
    <p>Shortend url</p>
    <a target="_blank" href={shortUrl.longUrl}>{shortUrl.shortUrl}</a>
    </div> <br></br>
    <div>
    {/* <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Previous links</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {data && data.map((e)=>{
            return(
              <>
              <div>
                <p>Short-url : {e.shortUrl}</p>
                <p>Date : {e.date}</p>
              </div>
              </>
            )
           })}
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
    </div>
    </div>
    {/* popup for url shortening success */}
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">Url Shortned - valid for 1 hour</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default UrlShortener