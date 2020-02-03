import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FormInput from '../../components/input';
import { editStart } from '../../redux/user/actions';
import Button from '../../components/button';
import axios from 'axios';

const EditProfile = ({ oneditStart, user, closeModal }) => {
	const [users, setUser] = useState({
		displayName: user.displayName || '',
		email: user.email || '',
		dob: user.dob || '',
		address: user.address || '',
		photo: user.photo || '',
		security1: user.security1 || '',
		security2: user.security2 || '',
		security3: user.security3 || '',
	});
	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setUser({ ...users, [name]: value });
	};

	const [uploading, setUpload] = useState({
		status: null
	})


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
			photo,
			dob,
			address,
			security1,
			security2,
			security3,
		} = users;
		try {
			oneditStart(
				user.id,
				displayName,
				email,
				photo,
				dob,
				address,
				security1,
				security2,
				security3
			);
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Wrapper className="d-block d-md-flex">
			<span>
				<div className="row justify-content-center">
					<div className="col-md-12">
						<div className="card">
							<h3>
								Edit <span onClick={() => closeModal()}>Close</span>
							</h3>
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
										type="text"
										name="photo"
										value={users.photo}
										onChange={(e) => handleOnChange(e)}
										label="Image Url"
										required
									/>
									<p>Security Questions</p>
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

									<p style={{marginTop: '2em'}}>Edit Display Picture</p>
									<div className="group">
										<label htmlFor="display" className="btn btn-info">Display Picture</label>
										<input id="display" type="file" style={{display: 'none'}} className="form-control" onChange={(e) => handlePicture(e)} />
									</div>

									<Button type="submit">Edit Profile</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</span>
		</Wrapper>
	);
};
const mapDispatchToProps = (dispatch) => ({
	oneditStart: (
		id,
		displayName,
		email,
		photo,
		dob,
		address,
		security1,
		security2,
		security3
	) =>
		dispatch(
			editStart({
				id,
				displayName,
				email,
				photo,
				dob,
				address,
				security1,
				security2,
				security3,
			})
		),
});

const Wrapper = styled.div`
	min-height: 80vh;
	background: #fff;
	align-items: center;
	justify-content: center;
	h3 {
		font-weight: 300;
		span {
			float: right;
			color: #1f88e5;
			font-weight: 100;
			font-size: 14px;
			border: 1px solid #1f88e5;
			border-radius: 50px;
			padding: 5px 9px;
			cursor: pointer;
		}
	}
	.card {
		border: none;
		box-shadow: none;
		background: #ffffff;
		padding: 0px 0px;
		width: 32%;
		@media (max-width: 786px) {
			width: 94%;
		}
		padding: 2rem;
		margin: auto;
	}
	button {
		padding: 14px 39px;
		border: none;
		border-radius: 50px;
		background: #1f88e5;
		margin-right: 19px;
		margin-top: 2rem;
	}
	.col-md-12 {
		position: fixed;
		background: #0000008a;
		width: 100%;
		height: 100%;
		top: 0;
		padding: 12rem 0;
		overflow: auto;
		@media (max-width: 786px) {
			padding: 4rem 0 !important;
		}
	}
`;
export default connect(null, mapDispatchToProps)(EditProfile);
