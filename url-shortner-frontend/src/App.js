import React, { Component } from 'react';
import axios from 'axios';
import Form  from './ui/Form';

class App extends Component {
  constructor(props) {
    super(props)
    axios.defaults.baseURL = 'https://shortyurl-app.herokuapp.com';
    
    this.state = {
      formInputs : {
        url: {
          elementType: 'input',
          errorMessage: null,
          elementConfig: {
            type: 'text',
            value: '',
            placeholder: 'Enter url',
            id: 'url',
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
      },
      tableData: []
    }  
  }
  
  componentDidMount() {
    axios.get('/api/v1/urls.json').then(response => {
      const updateTable = this.state.tableData;
      const data = response.data;
      for(let i of data) {
        updateTable.push(i)
      };     
      this.setState({tableData: updateTable})
    }).catch(serverError => {
      console.log(serverError);
    });
  }

  inputChangeHandler = (event) => {
    const updatedFormInputs = {...this.state.formInputs};
    updatedFormInputs[event.target.id].elementConfig.value = event.target.value
    updatedFormInputs[event.target.id].errorMessage = null;
    updatedFormInputs[event.target.id].elementConfig.className = 'form-control';
    this.setState({formInputs: updatedFormInputs});
  }

  submitDataHandler = (event) => {
    // submit data
    event.preventDefault();
    this.clearFormErrors();
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let finalFormInputs = {...this.state.formInputs}
    if(finalFormInputs['url'].elementConfig.value === '') {
      finalFormInputs['url'].errorMessage = 'cannot be empty'
      finalFormInputs['url'].elementConfig.className = 'form-control is-invalid';
    }
    else if(!pattern.test(finalFormInputs['url'].elementConfig.value)) {
      finalFormInputs['url'].errorMessage = 'not a valid url'
      finalFormInputs['url'].elementConfig.className = 'form-control is-invalid'; 
    }

    let allErrors = Object.values(finalFormInputs).map(i => i.errorMessage);
    allErrors = allErrors.filter(i => i !== null && i !== undefined);

    if (allErrors.length !== 0) {
      this.setState({formInputs: finalFormInputs});
    }
    else {
      let data = {url : {original_url: this.state.formInputs.url.elementConfig.value}}
      axios.post('/api/v1/urls.json', data).then(response => {
        axios.get('/api/v1/urls.json').then(response => {
          const updateTable = {...this.state};
          updateTable.tableData = []
          console.log(updateTable);
          const data = response.data;
          for(let i of data) {
            updateTable.tableData.push(i)
          };     
          this.setState({tableData: updateTable.tableData})
        }).catch(serverError => {
          console.log(serverError)
        })
      }).catch(serverError => {
        console.log(serverError);
      })
    }
  }

  clearFormErrors = () => {
    const clearedFormInputs = {...this.state.formInputs};  
    clearedFormInputs.url.errorMessage = null;
    clearedFormInputs.url.elementConfig.className = 'form-control';
    this.setState({formInputs: clearedFormInputs});
  }

  increaseClickCount = (param, event) => {
    axios.put(`/api/v1/urls/${event.target.id}.json`).then(response => {
    }).catch(serverError => {
      console.log(serverError)
    });
    window.location = param;
  }

  render() {
    let tablebodyEl = this.state.tableData.map((i,j) => {
      return (
        <tr key={j}>
          <th>{j+1}</th>
          <th><a id={i.id} href= '#' onClick={this.increaseClickCount.bind(this, i.original_url)}>{i.shortened_url}</a></th>
          <th>{i.title}</th>
        </tr>
      )
    })
    let display = (
      <div className="container" style={{paddingTop: '50px'}}>
        <h1 className='text-center'>Url Shortner</h1>
        <br/>
        <Form 
          formInputs={this.state.formInputs} 
          changed={this.inputChangeHandler.bind(this)} 
          submit={this.submitDataHandler.bind(this)}
        />
        <br/>
        <br/>
        <h2 className='text-center'>Top 100 Most Visited Website</h2>
        <div className='table-responsive'>
          <table className='table table-hover table-bordered'>
            <thead className='thead-dark'>
              <tr>
                <th>#</th>
                <th>Shortened Url</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {tablebodyEl}
            </tbody>
          </table>
        </div>
      </div>
    )
    return display
  }
}

export default App;
