import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import NewStoryChapter from './NewStoryChapter.js';
import ContributorPopup from './../Contributor/ContributorPopup.js';
import ImageUpload from './../../ImageUpload/ImageUpload.js';

// ant design import
import { Input, Button } from 'antd';

// initial state values supposed to be used when clearing state
const initialState = { title: '',
                       header_photo: '',
                       caption: '',
                     };

class NewStoryMain extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

    }

    // function for setting local state with user inputs
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    createStory = (event) => {
        // event.preventDefault();

        // seperate files for story, chapter and contributor data sent to the redux saga
        let storyDataToSend = '';
        let chapterDataToSend = this.props.chapter;
        let contributorDataToSend = this.props.contributor;

        // will create different data to send if the story statred as a template
        if(this.props.story.title !== '') {
            storyDataToSend = { title: this.props.story.title,
                                header_photo: this.props.story.placeholder_image,
                                caption: this.props.story.caption,
                                intro: this.props.story.intro,
                                is_template: true,
                              };
        } else {
            storyDataToSend = { title: this.state.title,
                                header_photo: this.state.header_photo,
                                caption: this.state.caption,
                                intro: '',
                                is_template: false,
                              };
        }

        // bundle the story, chapter and contributon files together and create a payload
        let completeDataToSend = { story: storyDataToSend, chapter: chapterDataToSend, contributor: contributorDataToSend };

        // send data to the saga
        this.props.dispatch({ type: 'ADD_NEW_STORY', payload: completeDataToSend });

        // clear the local state - not working properly
        this.setState(initialState);
    } // end createStory

    render() {

        return (
            <div>
                <h2>Create a Story</h2>
                <ChooseTemplate />
                <Input addonBefore="Story title"
                       placeholder={this.props.story.title !== '' ? this.props.story.title : "story title"}
                       allowClear
                       name="title"
                       onChange={this.onInputChange}
                       style={{ width: 340 }} />
                <h4>Image goes here</h4>
                <ImageUpload />
                <Input addonBefore="Add a caption"
                       placeholder={this.props.story.caption !== '' ? this.props.story.caption : "add a caption" }
                       allowClear
                       name="caption"
                       onChange={this.onInputChange} style={{ width: 340 }} />
                <h3>Add Chapters</h3>
                <NewStoryChapter />
                <h3>Add Contributors</h3>
                <ContributorPopup />
                <br />
                <Button type="primary" onClick={this.createStory}>Create Story</Button>
            </div>
        )
    }

}

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
    contributor: reduxStore.contributor.pending,
});

export default connect(mapStoreToProps)(NewStoryMain);