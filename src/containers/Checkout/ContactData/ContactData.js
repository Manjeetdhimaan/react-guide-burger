import React from "react";
import { withRouter } from "../../../hoc/withRouter/withRouter";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
 
class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
                },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
                }
        },
        isLoading: false,
        isValidForm: false
    }


    checkOrderFormValidity = (value, validators) => {
        let isValid = true;
        if (validators){
            if(validators.required) {
                isValid = (value.trim() !== '') && isValid;
            }
    
            if(validators.minLength) {
                isValid = value.trim().length >= validators.minLength && isValid;
            }
    
            if(validators.maxLength) {
                isValid = value.trim().length <= validators.maxLength && isValid;
            }
        }
        
        return isValid;
    }

    orderHandler = (e) => {
        e.preventDefault();
        if (!this.state.isValidForm) {
            console.log('["Form is not Valid"]')
            return;
        }
        const formData = {};
        for ( let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        this.setState({isLoading: true});
        const order = {
            ingredients: this.props.location.state.ingredients,
            price: this.props.location.state.totalPrice,
            orderData: formData
            
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({isLoading: false})
            this.props.navigate('/');
        }).catch(err => {
            this.setState({isLoading: false})
            console.log(err);
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
      
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkOrderFormValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for ( let inputIdentifier in updatedOrderForm ) {
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
        }

        this.setState({orderForm: updatedOrderForm, isValidForm: isFormValid});
    }

    render() {

    const formElementsArray = [];
    for ( let key in this.state.orderForm ) {
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        })
    }

    let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => {
                        return <Input key={formElement.id} elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} 
                            invalid={!formElement.config.valid} 
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    })}
                    <Button btnType="Success" disabled={!this.state.isValidForm}>ORDER</Button>
                </form>
    );

    if (this.state.isLoading) {
        form = <Spinner />
    }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default withRouter(ContactData);