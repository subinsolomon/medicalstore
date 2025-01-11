import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert(data);
            })
            .catch(error => console.error('Error uploading file:', error));
    };

    return (
        <div>
            <h1>Upload Excel File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
