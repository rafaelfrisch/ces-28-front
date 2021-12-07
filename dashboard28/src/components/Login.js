import React from 'react';
import { useState } from 'react';
import {baseURL} from '../constants';

export default function Login(){

    const [onMouseOver, setOnMouseOver] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState(null);

    function login(event){
        event.preventDefault();
        fetch(baseURL + 'login', {
            method: 'POST',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
          }).then(res => {
            return res.json();
          }).then(data => {
              if(data.erro != null || data.message == 'Password does not match')
                setWarning("Credenciais incorretas");
              else if(data.message == "Authentication successfully"){
                localStorage.setItem("token", data.token);
                window.location.reload(true);
              }
              else
              setWarning("Algum erro ocorreu.")
          })
    }

    return(
        <div id="loginContainer" style={styles.loginContainer}>
            <div id="formContainer" style={styles.formContainer}>
                <form onSubmit={login}>
                    <h3 style={styles.title}>Login</h3>
                    <div id="inputContainer" style={styles.inputContainer}>
                        <div className="inputSection" style={styles.inputSection}>
                            <p style={styles.inputLabel}>E-mail</p>
                            <input style={styles.input} type="email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>
                        <div className="inputSection" style={styles.inputSection}>
                            <p style={styles.inputLabel}>Senha</p>
                            <input style={styles.input} type="password" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                        </div>
                    </div>
                    {warning !== null ?
                        <span style={styles.warning}>{warning}</span>
                        :
                        null
                    }
                    <div id="loginButton" style={styles.buttonContainer}>
                        <button type="submit" style={onMouseOver ? styles.toggleButton : styles.button} onMouseOver={() => setOnMouseOver(true)} onMouseOut={() => setOnMouseOver(false)}>Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const styles = {
    loginContainer: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#1C8EF9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        height: '40%',
        minHeight: 300,
        width: '20%',
        minWidth: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'relative'
    },
    title: {
        textAlign: 'center',
        padding: 10,
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputSection: {
        marginBottom: 10,
        width: '90%',      
    },
    input: {
        width: '100%',
        border: '1px solid gray',
        borderRadius: 5,
        padding: 4
    },
    inputLabel: {
        marginBottom: 0,
        fontWeight: 'bold'
    },
    buttonContainer: {
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%'
    },
    button: {
        width: '90%',
        border: '0px solid',
        backgroundColor: '#007bff',
        borderRadius: 5,
        minHeight: 40,
        color: 'white',
        fontSize: 17
    },
    toggleButton : {
        width: '90%',
        border: '0px solid',
        backgroundColor: 'blue',
        borderRadius: 5,
        minHeight: 40,
        color: 'white',
        fontSize: 17
    },
    warning: {
        color: 'red',
        fontSize: 14
    }
};