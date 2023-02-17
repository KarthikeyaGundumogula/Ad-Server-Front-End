import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
    // const [open, setOpen] = React.useState(false);

    // const handleClick = (props) => {
    //     setOpen(props);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.closeHandle(false)
        // setOpen(false);
    };

    return (
        <Snackbar open={props.open} autoHideDuration={5500} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                you have successfully created Ad
            </Alert>
        </Snackbar>
    );
}