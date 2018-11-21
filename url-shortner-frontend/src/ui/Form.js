import React from 'react';
import Aux from '../hoc/Aux';

const form = (props) => { 
  const formElementsArray = [];
  let inputElement = [];

  for (let key in props.formInputs) {
    formElementsArray.push(props.formInputs[key])
  };

  if(props.sort) {
    formElementsArray.sort((a,b) => a.order - b.order);
  };

  formElementsArray.forEach(formElement => {
    switch (formElement.elementType) {
      case('input'):
        if(formElement.elementConfig.type === 'submit') {
          inputElement.push(
            <input {...formElement.elementConfig} /> 
          );
        }
        else if(formElement.elementConfig.type === 'checkbox') {
          inputElement.push(formElement.label === undefined ? null : <label>{formElement.label}</label>);
          inputElement.push(
            formElement.elementConfig.options.map((option, i) => {
              return (
                <div className= 'form-group' key={i}>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input {...formElement.elementConfig} defaultChecked={option.defaultChecked} value={option.value} onChange={props.changed} /> 
                      {option.displayValue}
                    </label>
                  </div>
                </div>
              )
            })   
          );
        }
        // else if(formElement.elementConfig.type === 'radio') {
        //   inputElement.push(
        //     <div>
        //       <label>{formElement.elementConfig.label}</label>
              
        //       <label className="form-check-label">
        //         <input {...formElement.elementConfig} value={formElement.value} id={formElement.id} onChange={props.changed} /> 
        //         {formElement.elementConfig.displayValue}
        //       </label>
        //     </div>
        //   );
        // }
        else {
          inputElement.push(
            <div className='form-group'>
              { formElement.label === undefined ? null : <label>{formElement.label}</label> }
              <input {...formElement.elementConfig} onChange={props.changed} />
              {formElement.errorMessage === undefined ? null : <div className='text-center text-danger'>{formElement.errorMessage}</div>}
            </div> 
          );
        }
        break;
      case('textarea') : 
        inputElement.push(
          <div className='form-group'>
            { formElement.label === undefined ? null : <label>{formElement.label}</label> }
            <textarea {...formElement.elementConfig} onChange={props.changed} />
            {formElement.errorMessage === undefined ? null : <div className='text-center text-danger'>{formElement.errorMessage}</div>}
          </div>
        );
        break;
      case ('select'): 
        inputElement.push(
          <div className='form-group'>
            { formElement.label === undefined ? null : <label>{formElement.label}</label> }
            <select {...formElement.elementConfig} onChange={props.changed}>
              { formElement.options.map((option, i) => (                
                <option key={i} value={option.value} disabled={option.disabled ? true : false}>
                  {option.displayValue}
                </option>))
              }
            </select>
            {formElement.errorMessage === undefined ? null : <div className='text-center text-danger'>{formElement.errorMessage}</div>}
          </div>
        );
        break;
      case ('button'):
        inputElement.push(
          <button {...formElement.elementConfig} onClick={formElement.cancelHandler}>{formElement.elementConfig.value}</button>
        )
        break;
      default :
        inputElement.push(<div />);
        break;
    }
  });

  return (
    <form style={props.formStyling} onSubmit={props.submit} >
      { inputElement.map((el, i) => (
          <Aux key={i}>
            {el}
          </Aux>
        ))
      }
    </form>
  )
}

export default form;