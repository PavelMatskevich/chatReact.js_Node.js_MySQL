import React, { Component } from 'react';
import './assets/styles/style.scss';

class App extends Component {
	
	state = {
		infoNames: [],
		emailValid: '',
		textValid: '',
		email: '',
		text: ''
	};
	
	componentDidMount() {
			this.getNames();
			//this.getMessagesTheFirst10();
	};
	
	getNames = () => {
		fetch(`http://localhost:3600/`)
		.then(response => response.json())
		.then(response => this.setState({infoNames: response.data}))
		.catch(err => console.error(err))
	};
	
	/*getMessagesTheFirst10 = () => {
		fetch(`http://localhost:3600/api/messages/list/0`)
		.then(response => response.json())
		.then(response => this.setState({infoNames: response.data}))
		.catch(err => console.error(err))
	};*/
	
	addInfo = (e) => {
		e.preventDefault();
		const {emailValid, textValid, email, text} = this.state;
		if (emailValid === true && textValid === true) {
			fetch(`http://localhost:3600/add?email=${email}&text=${text}`)
			.then(this.getNames)
			//.then(this.getMessagesTheFirst10)
			.catch(err => console.error(err))
		}
	};
    
	validateEmail(email) {
		var reg = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/;
		return email.search(reg) != -1;
    };
	
	validateText(text) {
		 var forText = /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/;
		 var checkText = text.search(forText) != -1;
		 return checkText && text.length < 100;
    };
	
	onEmailChange = (e) => {
		var val = e.target.value;
		var valid = this.validateEmail(val);
		this.setState({email: val, emailValid: valid});
	};
	
	onTextChange = (e) => {
		var val = e.target.value;
		var valid = this.validateText(val);
		this.setState({text: val, textValid: valid});
	};
	
	render() {
		const emailColor = this.state.emailValid === true ? "green" : "red";
        const textColor = this.state.textValid === true ? "green" : "red";
		const {infoNames, email, text} = this.state;
		return(
			<div className='wrapper'>
				<div className='chat'>
					<div className='userInfo'>
						{infoNames.map((name) =>  
								<div className='names' key={name.id}>
									<span className='email'>{name.email}:</span>
									<span>{name.text}</span>
								</div>
						)}
					</div>
					<form>
						<p>
						<input 
							type='text' 
							value={email}
							placeholder='Enter your mail'
							onChange={this.onEmailChange}
							style={{borderColor: emailColor}}
							required
						/>
						</p>
						<p>
						<textarea
							cols='43'
							rows='8'
							type='text'
							value={text}
							placeholder='Enter your message'
							onChange={this.onTextChange}
							style={{borderColor: textColor}}
							required
						>
						</textarea>
						</p>
						<button onClick={this.addInfo}>add Info</button>
					</form>
				</div>
			</div>
		)
	}
}

export default App;