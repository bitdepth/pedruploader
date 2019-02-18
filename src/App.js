import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

    state = {
        caption: '',
        photos: []
    }

    componentDidMount() {
        axios.get('/api/photos')
            .then(response => this.setState({photos: response.data}))
            .catch(error => console.log(error));
    }

    handleFileUpload = (event) => {
        let data = new FormData();
        data.append('userPhoto', event.target.files[0]);
        data.append('caption', this.state.caption);

        axios.post('/api/photo', data)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    updateCaption = (event) => {
        this.setState({
            caption: event.target.value
        });
    };

    getFilePath = fileName => `/uploads/${fileName}`;

    render() {
        return (
            <div className="App">
                <div>
                    <label>Caption</label>
                    <input type="text" value={this.state.caption} name="caption" onChange={this.updateCaption}/>
                </div>
                <div>
                    <label>upload file</label>
                    <input type="file" name="userPhoto" onChange={this.handleFileUpload}/>
                </div>

                {this.state.photos.map(photo => (
                    <figure key={photo._id}>
                        <img src={this.getFilePath(photo.fileName)} />
                            <figcaption>{photo.caption}</figcaption>
                    </figure>
                ))}

            </div>
        );
    }
}

export default App;
