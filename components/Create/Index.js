import styles from "../Dashboard/Index.module.css"
import { Web3Storage } from 'web3.storage'
import { useState } from "react";
import Image from "next/image";

export default function Create() {

    const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIyOTMzRDhDM2Y5MzkyRjI2MDNjZDZiQUFBZTczRjJhNjNCRjcxYjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3OTk3MjYxOTEsIm5hbWUiOiJBZCBzZXJ2ZXIifQ.bGUQJrYJIA4ugMI_gPUQxHMLPTFuCs0xgkgFK-kBaXw"

    const client = new Web3Storage({ token: API_TOKEN });

    const [file, setFile] = useState("");

    const [filename, setFilename] = useState([])

    const [allfile, setAllfile] = useState({})

    const handleUpload = async () => {

        var fileInput = ipfs_file;

        const rootCid = await client.put(fileInput.files, {
            name: "Advertisement banner",
        });

        console.log(rootCid);

        const res = await client.get(rootCid);
        const files = await res.files();
        console.log(files);
        const url = URL.createObjectURL(files[0]);
        console.log(url);
        setFile(url);
    };
    for (let i = 0; i < allfile.length; i++) {
        // let temp = []
        filename.push(allfile[i].name)
    }
    console.log(filename)

    function uploadFile() {
        document.getElementById('ipfs_file').click()
    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.mainContainer}>
                <div className={styles.dataContainer}>
                    <div>upload files</div>
                    {allfile.length > 0 && (
                        <div>
                            {allfile.length} files choosen
                        </div>
                    )
                    }
                    <input id="ipfs_file" type="file" multiple={true} style={{ display: "none" }} onChange={() => { setAllfile(ipfs_file.files) }} />
                    <button className={styles.button} type="button" onClick={uploadFile}>choose files</button>
                    <button className={styles.button} type="button" onClick={handleUpload}>Submit</button>
                </div>
                <div className={styles.dataContainer}>
                    <Image alt="hi" src={file} width={250} height={250} />
                </div>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div>
            </div>
        </div>
    )
}