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

            <h1 className={styles.title}>Documentation</h1>
            <div className={styles.text}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</div>
        </div>

    );
}
export default Docs;