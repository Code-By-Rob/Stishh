import React from 'react';


const CreateAuthor = (props) => {
    const divStyle = {
        height: '100%',
    }
    const formStyle = {
        width: '50%',
        height: '80%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
        borderBottomLeftRadius: '3rem',
        borderBottomRightRadius: '3rem',
    }
    const inputStyle = {
        display: 'block',
        width: '65%',
        height: '1.75rem',
        margin: '.75rem 0',
        fontSize: '1.05rem',
    }
    const submited = () => {
        // write the function that will 
        const username = document.getElementById('username');
        const firstname = document.getElementById('firstname');
        const surname = document.getElementById('surname');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        fetch('/Admin/Create/Author', {
            // create the author here.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                firstname: firstname.value,
                surname: surname.value,
                email: email.value,
                password: password.value,
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    return (
        <>
            <div style={divStyle}>
                <div style={formStyle}>
                    <input style={inputStyle} type="text" name='username' id='username' placeholder='Username' />
                    <input style={inputStyle} type="text" name='firstname' id='firstname' placeholder='First Name' />
                    <input style={inputStyle} type="text" name='surname' id='surname' placeholder='Surname' />
                    <input style={inputStyle} type="email" name="email" id="email" placeholder='Email' />
                    <input style={inputStyle} type="password" name="password" id="password" placeholder='Password' />
                    <button onClick={submited}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default CreateAuthor;