import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

import FormCheckoutUserInformation from '~/components/shared/FormCheckoutUserInformation';


class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);
        this.state = { id_user: props.id_user };
    }

    render() {
        return <FormCheckoutUserInformation id_user={this.state.id_user} />;
    }
}

// export default FormCheckoutInformation;

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(
    withAuth(FormCheckoutInformation, AccessLevel.USER_ACCESS_LEVEL)
);

