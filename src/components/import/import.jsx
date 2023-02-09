import {React,useState} from 'react';
import axios from 'axios';

import styles from './import.module.css'

import importIcon from './import.svg'
import tickMark from './tickmark.svg'

function ImportUI() {
    const [apiCallMade, setApiCallMade] = useState(false);
    const [file, setFile] = useState(false) ;
    const [fileDraged,setDrag]=useState(false);
    const url=process.env.REACT_APP_API;

const fileUpload = async (csv) => {
    const formData = new FormData();
    formData.append("file", csv);
  
    try {
      if (!apiCallMade) {
      const response = await axios.post(`${url}/contacts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authorization": localStorage.getItem("token")
        },
      });
      
      setApiCallMade(!apiCallMade);
      console.log(response);
      }
      //console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


    const handleDrop = (event) => {
        event.preventDefault();
        
        const file = event.dataTransfer.files[0];
        console.log(file);
         
        if (file.type === "text/csv") {


         
          setDrag(false);

          fileUpload(file);
          setFile(true);
          /////////////////////
          setTimeout(() => {
            
            setFile(false);
          }, 1500);
          /////////////////////
        }
      };
    
      const handleDragOver = (event) => {
        event.preventDefault();
        setDrag(true);
        
      };
      const handleOverlayDrop = (event) => {
        event.preventDefault();
        setDrag(true);
        
      };
     
  return (
    <div className={styles.overlay}  onDragOver={handleDragOver} onDrop={handleDrop}>
        
        {!file ? <div className={fileDraged ? styles.popuoOndrag : styles.popup}  > 
        <img src={importIcon} alt="import icon" className={styles.importIcon}/>
        <button className={styles.cancelBtn}>Cancel</button>
        </div>
        : 
        <div className={styles.popup} >

        <img src={tickMark} alt="import icon" className={styles.tickMark}/>
    
            </div>}
        


        
    </div>
  )
}

export default ImportUI