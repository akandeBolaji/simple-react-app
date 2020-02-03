import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormInput from '../../components/input';
import { signUpStart } from '../../redux/user/actions';
import Button from '../../components/button';
import axios from 'axios';

const Register = ({ onsignupStart }) => {
	const [users, setUser] = useState({
		displayName: '',
		email: '',
		dob: '',
		address: '',
		photo: '',
		password: '',
		confirmPassword: '',
		security1: '',
		security2: '',
		security3: ''
	});
	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setUser({ ...users, [name]: value })
	};

	const [uploading, setUpload] = useState({
		status: null
	})

	//let uploading = null;

	const handlePicture = (e) => {
		setUpload({status: "Uploading image ...."});
		console.log(uploading);
		let file = (e.target.files[0]);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("tags", `codeinfuse, medium, gist`);
		formData.append("upload_preset", "ml_default"); // Replace the preset name with your own
		formData.append("api_key", "559579712395136"); // Replace API key with your own Cloudinary key
		formData.append("timestamp", (Date.now() / 1000) | 0);
		
		// Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
		
		return axios.post("https://api.cloudinary.com/v1_1/dgwxi9sbq/image/upload", formData, {
		  headers: { "X-Requested-With": "XMLHttpRequest" },
		}).then(response => {
			setUpload({status: "Upload Successful"});
			console.log(response.data);
		  const photo = response.data.secure_url;
		  setUser({ ...users, photo: photo });
		  console.log(users);
		 
		})
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		const {
			displayName,
			email,
			password,
			confirmPassword,
			dob,
			address,
			photo,
			security1,
			security2,
			security3,
		} = users;

		if (password !== confirmPassword) {
			alert('passwords don"t match');
			return;
		}
		try {
			onsignupStart(displayName, email, password, dob, address, photo, security1, security2, security3);
			// setUser({
			// 	displayName: '',
			// 	email: '',
			// 	password: '',
			// 	dob: '',
			// 	address: '',
			// 	confirmPassword: '',
			// });
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Wrapper className="container d-block d-md-flex">
			<span>
				<h3 className="text-left mt-5 mt-md-0 mb-4 ">
					Sign up with your email and password
				</h3>
				<div className="row justify-content-center">
					<div className="col-md-12">
						<div className="card">
							<div className="card-body p-0">
								<form
									className="sign-up-form"
									onSubmit={(e) => handleSubmit(e)}
								>
									<FormInput
										type="text"
										name="displayName"
										value={users.displayName}
										onChange={(e) => handleOnChange(e)}
										label="Full Name"
										required
									/>
									<FormInput
										type="email"
										name="email"
										value={users.email}
										onChange={(e) => handleOnChange(e)}
										label="Email"
										required
									/>
									<FormInput
										type="date"
										name="dob"
										value={users.dob}
										onChange={(e) => handleOnChange(e)}
										label="Date of birth"
										required
									/>
									<FormInput
										type="text"
										name="address"
										value={users.address}
										onChange={(e) => handleOnChange(e)}
										label="Address"
										required
									/>
									<FormInput
										type="password"
										name="password"
										minLength="6"
										value={users.password}
										onChange={(e) => handleOnChange(e)}
										label="Password"
										required
									/>
									<FormInput
										type="password"
										name="confirmPassword"
										minLength="6"
										value={users.confirmPassword}
										onChange={(e) => handleOnChange(e)}
										label="Confirm Password"
										required
									/>
									<p style={{marginTop: '2em'}}>Security Questions</p>
									<FormInput
										type="text"
										name="security1"
										value={users.security1}
										onChange={(e) => handleOnChange(e)}
										label="What is your mother's maiden name?"
										required
									/>
									<FormInput
										type="text"
										name="security2"
										value={users.security2}
										onChange={(e) => handleOnChange(e)}
										label="What is your lucky number?"
										required
									/>
									<FormInput
										type="text"
										name="security3"
										value={users.security3}
										onChange={(e) => handleOnChange(e)}
										label="What is your best book ?"
										required
									/>
									<p style={{marginTop: '2em'}}>Set Display Picture</p>
									<div className="group">
										<label htmlFor="display" className="btn btn-info">Display Picture</label>
										<input id="display" type="file" style={{display: 'none'}} className="form-control" onChange={(e) => handlePicture(e)} />
									</div>
									{uploading.status && <div className='group'>{uploading.status}</div>}
									<Button type="submit">Sign Up</Button>
								</form>
							</div>
						</div>
						<Link to="/login" className="d-block mt-4">
							Already Have An Account ?
						</Link>
					</div>
				</div>
			</span>
		</Wrapper>
	);
};
const mapDispatchToProps = (dispatch) => ({
	onsignupStart: (displayName, email, password, dob, address, photo, security1, security2, security3) =>
		dispatch(
			signUpStart({ displayName, email, password, dob, address, photo, security1, security2, security3 })
		),
});

const Wrapper = styled.div`
	min-height: 80vh;
	background: #fff;
	align-items: center;
	justify-content: center;
	h2 {
		font-weight: 300;
	}
	.card {
		border: none;
		box-shadow: none;
		background: #ffffff;
		padding: 0px 0px;
	}
	button {
		padding: 14px 39px;
		border: none;
		border-radius: 50px;
		background: #1f88e5;
		margin-right: 19px;
		margin-top: 2rem;
	}
`;
export default connect(null, mapDispatchToProps)(Register);
