import React from 'react';
import InventoryList from './components/InventoryList';
import FileUpload from './components/FileUpload';

const App = () => {
    return (
        <div className="App">
        <FileUpload />
            <InventoryList />
        </div>
    );
};

export default App;
