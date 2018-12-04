import React, { Component } from 'react';
import axios from 'axios';
import Form from 'dynamic-ui-components/dist/Form';
import Pagination from 'dynamic-ui-components/dist/Pagination';
import Alert from 'dynamic-ui-components/dist/Alert';
import Spinner from 'dynamic-ui-components/dist/Spinner';

class App extends Component {
  constructor(props) {
    super(props)
        
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
      tableData: [],
      pagination: {
        perPage: null,
        total: null,
        currentPage: 1,
        links: {}
      },
      alert: {
        show: false
      },
      dataLoaded: false
    }  
  }
  
  componentDidMount() {
    axios.get(`/api/v1/urls.json?page=${this.state.pagination.currentPage}`).then(response => {
      
      // Setting number of pages in pagination
      const updatedPagination = {...this.state.pagination};
      updatedPagination.total = response.data.total
      updatedPagination.perPage = response.data.per_page
      let numberOfPages = 0;
      if(updatedPagination.total % updatedPagination.perPage !== 0) {
        numberOfPages = (updatedPagination.total/updatedPagination.perPage) + 1;
      }
      else {
        numberOfPages = updatedPagination.total/updatedPagination.perPage;
      }
      for(let j = 1; j <= numberOfPages; j++ ) {
        updatedPagination.links[j] = {
          id: j,
          active: j === 1 ? true : false
        }
      }
      
      //Setting the data for the table
      let updatedTable = this.state.tableData;
      if(response.data.urls.length !== 0) {
        for(let i of response.data.urls) {
          updatedTable.push(i)
        };  
      };
       
      //updating state    
      this.setState({tableData: updatedTable, pagination: updatedPagination, dataLoaded: true})
    
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
    // form validations and submit data
    event.preventDefault();
    this.clearFormErrors();
    const pattern1 = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    const pattern2 = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let finalFormInputs = {...this.state.formInputs}
    if(finalFormInputs['url'].elementConfig.value === '') {
      finalFormInputs['url'].errorMessage = 'cannot be empty'
      finalFormInputs['url'].elementConfig.className = 'form-control is-invalid';
    }
    else if(!pattern1.test(finalFormInputs['url'].elementConfig.value) || !pattern2.test(finalFormInputs['url'].elementConfig.value)) {
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
          
          // Update the form input
          const updatedFormInputs = {...this.state.formInputs};
          updatedFormInputs.url.elementConfig.value = '';
          
          // Setting number of pages in pagination
          const updatedPagination = {...this.state.pagination};
          updatedPagination.total = response.data.total
          updatedPagination.perPage = response.data.per_page
          let numberOfPages = 0;
          if(updatedPagination.total % updatedPagination.perPage !== 0) {
            numberOfPages = (updatedPagination.total/updatedPagination.perPage) + 1;
          }
          else {
            numberOfPages = updatedPagination.total/updatedPagination.perPage;
          }
          for(let j = 1; j <= numberOfPages; j++ ) {
            updatedPagination.links[j] = {
              id: j,
              active: j === 1 ? true : false
            }
          }
          
          // Update the table
          let updatedTable = this.state.tableData;
          updatedTable = [];
          if(response.data.urls.length !== 0) {
            for(let i of response.data.urls) {
              updatedTable.push(i)
            };
          };
          
          // show flash message
          let udpatedAlert = {...this.state.alert};
          udpatedAlert.show = true;
          
          //update state
          this.setState({formInputs: updatedFormInputs, tableData: updatedTable, pagination: updatedPagination, alert: udpatedAlert, dataLoaded: true})
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

  pageChangedHandler = (event) => {
    const updatedPagination = {...this.state.pagination};
    const updatedPaginationValueArray = Object.keys(updatedPagination.links);
    let currentLinkId = this.state.pagination.currentPage;
    let nextPage = null;
    if (event.target.id === 'back') { 
      if (currentLinkId > 1) {
        nextPage = currentLinkId-1;
      };
    } 
    else if (event.target.id === 'next') {
      if (currentLinkId < updatedPaginationValueArray[updatedPaginationValueArray.length - 1]) {
        nextPage = currentLinkId+1;
      };
    }
    else {
      nextPage = Number(event.target.id);
    };
    axios.get(`/api/v1/urls.json?page=${nextPage}`).then(response => {
      // updating table
      let updatedTable = this.state.tableData;
      updatedTable = []
      if(response.data.urls.length !== 0) {
        for(let i of response.data.urls) {
          updatedTable.push(i)
        };
      };

      // updating pagination
      const updatedPagination = {...this.state.pagination};
      updatedPagination.total = response.data.total     
      updatedPagination.links[currentLinkId].active = false;
      updatedPagination.links[nextPage].active = true;
      updatedPagination.currentPage  = nextPage;
      this.setState({tableData: updatedTable, pagination: updatedPagination, dataLoaded: true})  
    }).catch(serverError => {
      console.log(serverError);
    });
  }

  alertDismissHandler = () => {
    this.setState({alert: {show: false}})
  }

  render() {
    let alert = null;
    if(this.state.alert.show) {
      alert = (
        <Alert bsStyle={'success'} dismiss={this.alertDismissHandler}>
          <p>Shortened url generated!</p>
        </Alert>
      );
    };

    let table = null;
    let pagination = null;
    if(this.state.dataLoaded && this.state.tableData.length !== 0) {
      let tablebodyEl = this.state.tableData.map((i,j) => {
        return (
          <tr key={j}>
            <th><a id={i.id} href= '#' onClick={this.increaseClickCount.bind(this, i.original_url)}>{i.shortened_url}</a></th>
            <th>{i.title}</th>
          </tr>
        )
      });
      table = (
        <div className='table-responsive'>
          <table className='table table-hover table-bordered'>
            <thead className='thead-dark'>
              <tr>
                <th>Shortened Url</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {tablebodyEl}
            </tbody>
          </table>
        </div>
      );
      pagination = (
        <Pagination 
          links={this.state.pagination.links} 
          pageChange={this.pageChangedHandler} 
          position={'right'}  
          perPage={this.state.pagination.perPage} 
          currentPage= {this.state.pagination.currentPage} 
          total={this.state.pagination.total}
        />
      );
    }
    else if(this.state.tableData.length === 0 && this.state.dataLoaded) {
      table = (
        <div className="alert alert-warning">
          Currently there are no shortened urls.
        </div>
      );
    }
    else {
      table = <Spinner size={3}/>;
    };

    let display = (
      <div className="container" style={{paddingTop: '50px'}}>
        <h1 className='text-center'>Url Shortner</h1>
        <br/>
        {alert}
        <Form 
          formInputs={this.state.formInputs} 
          changed={this.inputChangeHandler.bind(this)} 
          submit={this.submitDataHandler.bind(this)}
        />
        <br/>
        <br/>
        <h2 className='text-center'>Top 100 Most Visited Website</h2>
        <br/>
        {table}
        {pagination}
      </div>
    )
    return display
  }
}

export default App;
