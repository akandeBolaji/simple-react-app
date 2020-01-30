import React from 'react';
import Dropzone from 'react-dropzone'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = (file) => {
            const { user } = this.state;
            this.setState({
                user: {
                    ...user,
                    photo: file[0].path
                }
            });
            console.log(this.state)
        };
        this.onChangeHandler=event=>{
            const { user } = this.state;
            this.setState({
                user: {
                    ...user,
                    photo: event.target.files[0]
                }
            });
            console.log(event.target.files[0])
        
        }
        this.state = {
            user: {
                photo: null,
                fullName: '',
                phoneNo: '',
                address: '',
                email: '',
                password: '',
                dob: '',
                security1 : {
                    question: '',
                    answer: ''
                },
                security2 : {
                    question: '',
                    answer: ''

                },
                security3 : {
                    question: '',
                    answer: ''

                },

            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        //console.log(this.state.user.security[0].question);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
           
        });
    }

    handleSecurity1 = (event) => {
         const { name, value } = event.target;
         console.log(name, value)
         const  {security1}  = {...this.state.user};
         if (name == 'question') {
            security1.question = value
         }
         else {
             security1.answer = value
         }
         this.setState({
             security1
         });
    }

    handleSecurity2 = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        const  {security2}  = {...this.state.user};
        if (name == 'question') {
           security2.question = value
        }
        else {
            security2.answer = value
        }
        this.setState({
            security2
        });
   }

   handleSecurity3 = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    const  {security3}  = {...this.state.user};
    if (name == 'question') {
       security3.question = value
    }
    else {
        security3.answer = value
    }
    this.setState({
        security3
    });
}

    handleSubmit(event) {
        event.preventDefault();
        console.log('submit?')
        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.fullName && user.email && user.phoneNo && user.password && user.photo && user.address && user.dob) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">Full Name</label>
                        <input type="text" className="form-control" name="fullName" value={user.fullName} onChange={this.handleChange} />
                        {submitted && !user.fullName &&
                            <div className="help-block">Full Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email Address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.phoneNo ? ' has-error' : '')}>
                        <label htmlFor="phoneNo">Phone Number</label>
                        <input type="text" className="form-control" name="phoneNo" value={user.phoneNo} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Phone Number is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.address ? ' has-error' : '')}>
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" name="address" value={user.address} onChange={this.handleChange} />
                        {submitted && !user.address &&
                            <div className="help-block">Address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.dob ? ' has-error' : '')}>
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="text" className="form-control" name="dob" value={user.dob} onChange={this.handleChange} />
                        {submitted && !user.dob &&
                            <div className="help-block">Date of Birth is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && (!user.security1.question || !user.security1.answer) ? ' has-error' : '')}>
                        <label htmlFor="question1">Security Question 1</label>
                        <input type="text" className="form-control" placeholder="Enter Question here" name="question" value={user.security1.question} onChange={this.handleSecurity1} />
                        <input type="text" className="form-control" placeholder="Enter Answer here" name="answer" value={user.security1.answer} onChange={this.handleSecurity1} />
                        {submitted && (!user.security1.question || !user.security1.answer) &&
                            <div className="help-block">Security question 1 and answer is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && (!user.security2.question || !user.security2.answer) ? ' has-error' : '')}>
                        <label htmlFor="question2">Security Question 2</label>
                        <input type="text" className="form-control" placeholder="Enter Question here" name="question" value={user.security2.question} onChange={this.handleSecurity2} />
                        <input type="text" className="form-control" placeholder="Enter Answer here" name="answer" value={user.security2.answer} onChange={this.handleSecurity2} />
                        {submitted && (!user.security2.question || !user.security2.answer) &&
                            <div className="help-block">Security question 2 and answer is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && (!user.security3.question || !user.security3.answer) ? ' has-error' : '')}>
                        <label htmlFor="question3">Security Question 3</label>
                        <input type="text" className="form-control" placeholder="Enter Question here" name="question" value={user.security3.question} onChange={this.handleSecurity3} />
                        <input type="text" className="form-control" placeholder="Enter Answer here" name="answer" value={user.security3.answer} onChange={this.handleSecurity3} />
                        {submitted && (!user.security3.question || !user.security3.answer) &&
                            <div className="help-block">Security question 3 and answer is required</div>
                        }
                    </div>
                    <label>Display Picture </label>
                    <div className={'form-group' + (submitted && !user.photo ? ' has-error' : '')}>
                        <label htmlFor="image" className="btn btn-info">Select Image</label>
                        <input type="file" style={{visibility: 'hidden'}}  multiple="" id="image" name="image" onChange={this.onChangeHandler}/>
                        {this.state.user.photo && <span style={{color: 'green'}}>{this.state.user.photo.name}</span>}
                        {submitted && !user.photo &&
                            <div className="help-block">Please upload profile image</div>
                        }
                    </div>

                    <div className="form-group">
                        <button onClick={this.handleSubmit} className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };