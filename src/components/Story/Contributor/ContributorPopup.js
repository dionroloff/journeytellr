import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorForm from './ContributorForm';
import ContributorList from './ContributorList';

import { Modal, Button, } from 'antd';

class ContributorPopup extends Component {
    state = {
        loading: false,
        visible: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        const { visible, loading } = this.state;
        const footer = [];
        //some logic here to only show footer on edit page
        if(false){
            footer.push( <Button key="back"
                            onClick={this.handleCancel}>
                            Return</Button>);
            footer.push( <Button key="submit"
                            type="primary"
                            loading={loading}
                            onClick={this.handleOk}
                            icon='usergroup-add'>
                            Send Invites</Button>);
        }
        let ContributorBtnName;
        //some logic to change button name based on edit/view and  
        // whether there are many contributors, none, or one
        if('no contributors' === 'no contributors' && 'edit' === 'edit'){
            ContributorBtnName = 'Add Contributor(s)'
        } else if(1 === 1 && 'view' === 'view'){
            ContributorBtnName = 'One Contributor'
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    {ContributorBtnName}</Button>
                <Modal
                    visible={visible}
                    title="Adding Contributors"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={footer}
                >
                    <ContributorForm />
                    <ContributorList />
                </Modal>
            </div>
        );
    }
}

export default connect()(ContributorPopup);