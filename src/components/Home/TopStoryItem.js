import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CardDesigns.css';

//Ant design imports
import { Card, Avatar, Button, Icon } from 'antd';
const { Meta } = Card;

class TopStoryItem extends Component {

    handleReadStory = (event) => {
        console.log('in hRS', this.props);

        this.props.history.push(`/existing-story/${this.props.story_id}`);
    }

    handleLike = (event) => {
        console.log(this.props);

        this.props.dispatch({
            type: 'LIKE_TOP_STORY',
            payload: {
                user_id: this.props.user_id,
                story_id: this.props.story_id
            }
        });
    }

    componentDidMount = (event) => {
        this.props.dispatch({
            type: 'GET_CONTRIBUTORS',
            payload: this.props.story_id
        })
    }

    render() {

        return (
            <div align='center'>
                <Card
                    id='card'
                    bordered={true}
                    style={{ width: 350 }}
                    cover={<img alt="headshot of author" src={this.props.header_photo} />}
                    actions={[<Button type='primary'
                        onClick={this.handleReadStory}>Read
                              </Button>]}
                >
                    <Meta
                        align='center'
                        avatar={<img className="author-avatar" alt="author avatar" src={this.props.profile_pic} />}
                        title={this.props.title}
                    />
                    <br />
                    <h4 align='center'>Story by {this.props.author}</h4>
                    <Button onClick={this.handleLike} >
                        <Icon type='like' />
                    </Button>
                    <p>{this.props.likes} Likes!</p>
                </Card>
                <br />
                <br />
            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail
});

export default connect(mapStateToProps)(TopStoryItem);
// export default TopStoryItem;