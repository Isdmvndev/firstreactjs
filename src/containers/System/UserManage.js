import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUser } from '../../services/userService'
import axios from 'axios';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUser();
        console.log(response);
        if (response && response.errCode === 0) {
            this.setState({ arrUsers: response.users }, () => {
                console.log(this.state.arrUsers);
            })
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div>
                <div className="text-center">Manage users1</div>
                <table className='table'>
                    {arrUsers && arrUsers.map((item, index) => {
                        console.log('checkmap:', item, index)
                        return (
                            <tr>
                                <td className='134' >{item.email}</td>
                            </tr>
                        )
                    })}


                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
