import React, { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = props => {
  const [ formInputsValidity, setFormInputsValidity ] = useState({
    name: true,
    street: true,
    city: true,
    postal: true
  })
  // (could use 'touched' state like in previous example)

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = event => {
    event.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostal = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalIsValid = isFiveChars(enteredPostal)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid
    })

    const formIsValid = 
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalIsValid && 
    enteredCityIsValid

    if (!formIsValid) {
      return
    }
    // submit the cart data
  }

  const inputs = [
    { id: 'name', text: 'Name', ref: nameInputRef, error: formInputsValidity.name },
    { id: 'street', text: 'Street', ref: streetInputRef, error: formInputsValidity.street },
    { id: 'postal', text: 'Postal Code', ref: postalCodeInputRef, error: formInputsValidity.postal },
    { id: 'city', text: 'City', ref: cityInputRef, error: formInputsValidity.city },
  ]

  const displayInputs = inputs.map(input => {
    const { id, text, ref, error } = input
    return (
      <div className={ classes.control} key={ id }>
        <label htmlFor={ id }>{ text }</label>
        <input type="text" id={ id } ref={ ref } />
        { !error && <p>Please enter a valid { text }!</p>}
      </div>
    )
  })
  
  return (
    <form className={ classes.form } onSubmit={ confirmHandler }>
      { displayInputs }
      <div className={ classes.actions }>
        <button type='button' onClick={ props.onCancel }>
          Cancel
        </button>
        <button className={ classes.submit }>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout

      // <div className={ classes.control}>
      //   <label htmlFor="name">Your Name</label>
      //   <input type="text" id='name' />
      // </div>
      // <div className={ classes.control}>
      //   <label htmlFor="street">Street</label>
      //   <input type="text" id='steet' />
      // </div>
      // <div className={ classes.control}>
      //   <label htmlFor="postal">Postal Code</label>
      //   <input type="text" id='postal' />
      // </div>
      // <div className={ classes.control}>
      //   <label htmlFor="city">City</label>
      //   <input type="text" id='city' />
      // </div>