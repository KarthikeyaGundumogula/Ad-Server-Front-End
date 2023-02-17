import { useState } from "react";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import styles from "./Index.module.css"

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'rgb(200,155,123)',
    },
    '& label': {
        color: 'rgb(204,90,113)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(200,155,123)',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: 'rgb(204,90,113)',
    },
});

function Docs() {
    const [businessName, setBusinessName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div className={styles.main}>
            <div className={styles.formContainer}>
                <h1 className={styles.title} >Edit Business Details</h1>
                <form className={styles.form}>
                    <CssTextField
                        id="standard-basic"
                        // label="Outlined"
                        variant="standard"
                        value={businessName}
                        onChange={e => setBusinessName(e.target.value)}
                        placeholder="First name"
                        type="text"
                        label="Bussiness Name"
                        required
                    />
                    <CssTextField
                        id="standard-basic"
                        // label="Outlined"
                        variant="standard"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email Id"
                        type="email"
                        label="Email Id"
                        required
                    />
                    <CssTextField
                        id="standard-basic"
                        // label="Outlined"
                        variant="standard"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeholder="User Name"
                        type="text"
                        label="User Name"
                        required
                    />
                    <button className={styles.button} type="submit">Submit</button>
                </form>
            </div>
        </div>

    );
}
export default Docs;