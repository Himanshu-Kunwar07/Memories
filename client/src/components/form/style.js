import {makeStyles} from '@mui/styles';

export default makeStyles((theme)=> (
    {
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
        paper: {
            padding: theme.spacing(2),
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            
        },
        fileInput: {
            width: '97%',
            margin: '10px 0',
        },
        buttonSubmit: {
            marginBottom: 10,
        },
    }
))