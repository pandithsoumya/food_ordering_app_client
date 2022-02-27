import React from 'react'

import LoginFormContainer from './LoginFormContainer'
import RegistrationFormContainer from './RegistrationFormContainer'

const initialFormType = 'login'


export default function FormContainer(props){

    const [type,setType] = React.useState(initialFormType)

    const toggleLogin = () => {
        setType('login')
    }

    const toggleRegister = () => {
        setType('register')
    }

    return(
        <React.Fragment>
            {type==='login'?<LoginFormContainer toggleForm={toggleRegister} />:<RegistrationFormContainer toggleForm={toggleLogin} />}
        </React.Fragment>
    )

}