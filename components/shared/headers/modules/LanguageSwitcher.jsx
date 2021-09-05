import React, { Component } from 'react';
import { notification } from 'antd';
class LanguageSwitcher extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        return (
            <div className="language">
                <a href="#">
                   <span className="language-space"> English </span>
                </a>
            </div>
        );
    }
}

export default LanguageSwitcher;
