import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

    handleFileUpload = (event) => {

        console.log('handleFileUpload', event.target.files[0]);

        let data = new FormData();
        data.append('userPhoto', event.target.files[0]);
        // data.append('name', 'userPhoto');
        // data.append('description', 'userPhoto');

        axios.post('/api/photo', data)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">
                <input type="file" name="userPhoto" onChange={this.handleFileUpload}/>
            </div>
        );
    }
}

export default App;
