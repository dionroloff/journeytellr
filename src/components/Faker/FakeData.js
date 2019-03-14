import React, { Component } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
<<<<<<< HEAD
import ImageUploadModal from '../ImageUpload/ImageUpload';
=======
>>>>>>> f71d538b0b8a14385be9cbb42af8bcd61d997d1a
const axios = require('axios');

class ProfilePage extends Component {

    //posts to fakes.router.js
    addFakePeople = (event) => {
        axios.post('/fakes');
    }

    //posts to fakes.router.js
    addFakeStories = (event) => {
        axios.post('/fakes/story');
    }

    //this will post to fakes.router.js
    //and add 50 fake chapters to chapter table
    addFakeChapters = (event) => {
        axios.post('fakes/chapter');
    }



    render() {

        return (
            <div>
                <div>
                    <button onClick={this.addFakePeople}>Add 300 people to the database</button><br />
                    <button onClick={this.addFakeStories}>Add 30 stories to the database</button><br />
                    <button onClick={this.addFakeChapters}>Add 50 chapters to the database</button>
                    <ImageUpload />
                </div>
            </div>
        )
    }

}
export default ProfilePage;