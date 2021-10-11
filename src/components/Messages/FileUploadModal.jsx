import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FileUploadModal = ({channel, open, handleClose, sendAMessage, setAttachments}) => {

  const [file, setFile] = useState(null);

  const handleClickUploadFile = async (e) => {
    
    await channel.sendImage(file)
      // .then( r => console.log("send file response", r.file))
      .then( r => setAttachments(r.file))

    handleClose();
  }

  const addFile = (e) => {
    console.log("clicked file upload", e.target.files[0])
    // const files = e.target.files;
    setFile(e.target.files[0])
  }

  

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select file to upload by clicking button.
          </Typography>
          <input type="file" name="file" className="form-control" onChange={(e) => addFile(e)} />
          <Button onClick={(e) => handleClickUploadFile(e)}>Upload File</Button>
        </Box>
      </Modal>
    </div>
  );

}

export default FileUploadModal;
