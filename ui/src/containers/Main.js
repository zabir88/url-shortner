import React, {Component} from 'react';
import Form from 'zh-ui-library/dist/Form';

class Main extends Component {
	constructor (props) {
		super(props);
		this.state = {
			formInputs: {
				link: {
					elementType: 'input',
					value: '',
					errorMessage: null,
					elementConfig: {
						type: 'text',
						placeholder: 'Link',
						className: 'form-control'
					}
				},
				slug: {
					elementType: 'input',
					value: '',
					errorMessage: null,
					elementConfig: {
						type: 'text',
						placeholder: 'Slug',
						className: 'form-control'
					}
				},
				submit: {
					elementType: 'input',
					value: 'Submit',
					elementConfig: {
						type: 'submit',
						className: 'btn btn-info btn-lg btn-block'
					}
				}
			}
		}
	}
	
	render() {
		let display = (
			<div className='container text-center' style={{paddingTop: '100px'}}>
				<h1>URL Shortner</h1>
				<br/>
				<Form formStyling={{ maxWidth: '400px', margin: '0 auto'}} formInputs={this.state.formInputs} />
			</div>
		);
		return display
	}
}

export default Main;