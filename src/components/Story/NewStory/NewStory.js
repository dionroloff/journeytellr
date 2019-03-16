import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import ContributorPopup from './../Contributor/ContributorPopup.js';
import ImageUpload from './../../ImageUpload/ImageUpload.js';
import NewStoryChapterModal from './NewStoryChapterModal.js';
import NewStoryChapterList from './NewStoryChapterList.js';

// ant design import
import { Form, Input, Button } from 'antd';
import ChapterList from '../ExistingStory/Chapters/ChapterList.js';


// initial state values supposed to be used when clearing state
const initialState = { title: '',
                       intro: '',
                       header_photo: '',
                       caption: '',
                     };

class NewStory extends Component {
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
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
        // seperate files for story, chapter and contributor data sent to the redux saga
        let storyDataToSend = '';
        let chapterDataToSend = this.props.chapter;
        console.log(`Chapter data: ${chapterDataToSend}`);
        let contributorDataToSend = this.props.contributor;
        console.log(`Contributor data: ${contributorDataToSend}`);

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
                                intro: this.state.intro,
                                is_template: false,
                              };
        }

        // bundle the story, chapter and contributon files together and create a payload
        let completeDataToSend = { story: storyDataToSend, chapter: chapterDataToSend, contributor: contributorDataToSend };

        // send data to the saga
        this.props.dispatch({ type: 'ADD_NEW_STORY', payload: completeDataToSend });

        // clear the local state - not working properly
        this.setState(initialState);
    }
});
    } // end createStory

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.createStory}>
                <h2>Create a Story</h2>
                <Form.Item
                    label="Create a story or choose a template"
                >
                    <ChooseTemplate />
                </Form.Item>
                <Form.Item
                    label="Story title"
                >
                    {getFieldDecorator('title', {
                        required: true, message: 'Please enter a story title!',
                        },
                    )(          
                    <Input allowClear
                           name="title"
                           placeholder={this.props.story.title !== '' ? this.props.story.title : "story title"}
                           onChange={this.onInputChange}
                           style={{ width: 340 }} 
                            />
                )}
                </Form.Item>
                <Form.Item
                    label="Story intro"
                >
                    <Input allowClear
                           name="intro"
                           placeholder={this.props.story.intro !== '' ? this.props.story.intro : "story introduction"}
                           onChange={this.onInputChange}
                           style={{ width: 340 }}
                           value={this.state.intro} />
                </Form.Item>
                <Form.Item
                    label="Select image"
                >
                    <ImageUpload />
                </Form.Item>
                <Form.Item
                    label="Photo caption"
                >
                   <Input allowClear
                          name="caption"
                          placeholder={this.props.story.caption !== '' ? this.props.story.caption : "add a caption" }
                          onChange={this.onInputChange}
                          style={{ width: 340 }} 
                          value={this.state.caption}/>
                </Form.Item>
                <h3>Chapters</h3>
                {/* <NewStoryChapterList /> */}
                {this.props.chapter.length !== 0 ? <ChapterList chapter={this.props.chapter} /> : ''}
                <Form.Item
                    label="Add a chapter"
                >
                    <NewStoryChapterModal />
                </Form.Item>
                <h3>Contributors</h3>
                <Form.Item
                    label="Add contributors"
                >
                    <ContributorPopup />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                            htmlType="submit"
                    >
                        Create Story
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}

const FancyFormComponent = Form.create()(NewStory);

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
    contributor: reduxStore.contributor.pending,
});

export default connect(mapStoreToProps)(FancyFormComponent);