import React, { useState } from 'react';
import './FileUpload.css'
import apiFetch from '../../utils/apiFetch';

const FileUpload = ({ refreshInventory }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        apiFetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert(data);
                refreshInventory();
            })
            .catch(error => console.error('Error uploading file:', error));
    };

    return (
        <div className='fileUpload-outer'>
            <h1>Upload Excel File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
