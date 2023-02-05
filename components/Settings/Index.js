import { useState } from "react";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import styles from "./Index.module.css"

function Setting() {
    const [businessName, setBusinessName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'rgb(189, 165, 238)',
        },
        '& label': {
            color: 'rgb(189, 165, 238)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(189, 165, 238)',
        },
        '& .MuiStandardInput-root': {
            '& fieldset': {
                borderColor: 'rgb(189, 165, 238)',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(189, 165, 238)',
            },
        },
    });

    return (
        <div className={styles.main}>
            <div className={styles.formContainer}>
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
                        placeholder="First name"
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
                    {/* <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                name="email"
                required
            /> */}
                    {/* <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                required
            /> */}
                    <button className={styles.button} type="submit">Submit</button>
                </form>
            </div>
        </div>

    );
}
export default Setting;