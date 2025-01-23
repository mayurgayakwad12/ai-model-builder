import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const initialState = {
    modelName: '',
    modelType: '',
    llmType: '',
    content: '',
  };
  const [formData, setFormData] = React.useState(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    alert('Please check the console for details.');
    handleClose();
    setFormData(initialState);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{
          width: '210px',
          color: '#FFFFFF',
          backgroundColor: '#4F46E5',
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 400,
          height: 50,
        }}
        startIcon={<AddOutlinedIcon />}
        onClick={handleClickOpen}
      >
        Create New Model
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Model
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form className="p-2">
            <div className="mb-4">
              <label htmlFor="modelName" className="block text-gray-700 text-sm font-bold mb-2">
                Model Name
              </label>
              <input
                id="modelName"
                placeholder="Enter Model Name"
                type="text"
                value={formData.modelName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="modelType" className="block text-gray-700 text-sm font-bold mb-2">
                Model Type
              </label>
              <select
                id="modelType"
                value={formData.modelType}
                onChange={handleInputChange}
                className="shadow w-full border-0 bg-[#FFFFFF] rounded-md p-2 focus:outline-none focus:ring-1 transition ease-in-out duration-150"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Model-1">Model-1</option>
                <option value="Model-2">Model-2</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="llmType" className="block text-gray-700 text-sm font-bold mb-2">
                LLM
              </label>
              <select
                id="llmType"
                value={formData.llmType}
                onChange={handleInputChange}
                className="shadow w-full border-0 bg-[#FFFFFF] rounded-md p-2 focus:outline-none focus:ring-1 transition ease-in-out duration-150"
              >
                <option value="" disabled>
                  Neural (recommended)
                </option>
                <option value="llm-1">LLM 1</option>
                <option value="llm-2">LLM 2</option>
                <option value="neural">Neural</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                Content
              </label>
              <textarea
                id="content"
                rows={5}
                placeholder="Enter your content"
                value={formData.content}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              width: '210px',
              color: '#4F46E5',
              backgroundColor: '#E7E6FA',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 400,
              border: 'none',
              height: 40,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              width: '210px',
              color: '#FFFFFF',
              backgroundColor: '#4F46E5',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 400,
              height: 40,
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
