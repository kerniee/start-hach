import React from 'react';

import s from './User.module.scss';

class User extends React.Component {
    render() {
        return (
            <p className={s.redText}>Test text {console.log(this.props)}</p>
        );
    }
}

export default User;
