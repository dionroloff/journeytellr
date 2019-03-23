import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import { List, Icon, Avatar, Card, Row, Col, Typography, Divider } from 'antd';

import './SearchBar.css';

class ResultListItem extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleClick = () => {
    this.props.history.push(`/existing-story/${this.props.item.story_id}`);
  }
  handleDescription = () => {
    if (this.props.item.intro.length < 100) {
      return this.props.item.intro.substring(0, 100)
    } else if (this.props.item.intro.length) {
      return `${this.props.item.intro.substring(0, 100)}...`
    }
  }

  render() {
    const { title, header_photo, intro, caption, full_name, profile_pic, story_id } = this.props.item;
    const { Meta } = Card;

    // console.log(item.intro.substring(0, 40));
    return (
      <Row type='flex' justify='center'>
        <Col span={18}>
          <List.Item
            key={title}
            extra={<img width={272} alt="logo" src={header_photo} style={{ objectFit: 'contain' }} />}
          >
            {/* these are the contents of the list item */}
            <Row type='flex' align='middle' justify='center'>
              <Col span={24}>
                <Typography.Title level={4} style={{ textDecoration: 'none', textAlign: 'center' }}>
                  <Link to={`/existing-story/${story_id}`} >{title}</Link>
                </Typography.Title>
              </Col>
              <Col span={8}>
                <Avatar size={64} src={profile_pic} />
              </Col>
              <Col span={12}>
                <Typography>
                  {`By ${full_name}`}
                </Typography>
              </Col>

              {intro.length > 80 &&
                <Col span={20}>
                  <Typography.Paragraph>
                    {`${intro.substring(0, 80)}...`}
                  </Typography.Paragraph>
                </Col>
              }
            </Row>
          </List.Item>

        </Col>
        <Divider></Divider>
      </Row>


      // <Row type="flex" align="middle" className='search-story'>
      //   <Col span={12}>            
      //   <List.Item>
      //     <List.Item.Meta
      //       title={item.title}
      //       description={this.handleDescription()}
      //       align="top"

      //     />
      //     {item.content}
      //     </List.Item> {/*end first item */}
      //     <List.Item
      //       key={item.title}
      //       actions={<Icon type="like" text="156" />}
      //     >
      //       <List.Item.Meta
      //       className="list-content"
      //         avatar={<Avatar src={item.profile_pic} />}
      //         description={item.full_name}
      //       />
      //     </List.Item>
      //   </Col>
      //   <Col span={12}>
      //     <Card
      //       onClick={this.handleClick}
      //       hoverable
      //       style={{ width: 200 }}
      //       cover={<img alt="example" src={item.header_photo} />}
      //     >
      //       <Meta
      //         description={item.caption}
      //       />
      //     </Card>
      //   </Col>
      // </Row>
    )
  }
}

export default withRouter(ResultListItem);
