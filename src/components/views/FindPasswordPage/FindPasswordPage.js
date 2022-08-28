import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import style from './FindPasswordPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function FindPasswordPage(props) {

  const Dispatch = useDispatch();
  let navigate = useNavigate();

  let PasswordLength = useRef();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");


  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(Password.length<6) {
      PasswordLength.current.style = "visibility: visible"
      return
    }
    let body = {
      email : Email,
      name : Name,
      password : Password
    }
    
    Dispatch(registerUser(body))
    .then(response =>{
      if(response.payload.registerSuccess) {
        navigate('/login')
      } else {
        alert('Register error')
        
      }
    })

}

  return (
    <div id={style.registerPage}>
        <div class={style.leftBlue}>
          <img src="LoginImages/LogoImage.png" id={style.logoImage} alt="LogoImage" />
        </div>

        <div class={style.rightWhite}>
              <div id={style.wrap}>
                  <div id={style.titleContainer}>
                      <div id={style.title1}>
                          비밀번호 찾기
                      </div>
                      <div id={style.title2}>
                          비밀번호를 잊으셨나요?
                      </div>
                      <div id={style.title3}>
                          과제헬퍼에 가입한 이메일을 정확히 입력해 주세요.
                      </div>
                  </div>
              
                  <div id={style.register}>
                      <form onSubmit={onSubmitHandler}>
                          <div id={style.email}>
                              <input type="email" name="email" placeholder="이메일 (로그인 시 필요)" id={style.emailInput} value={Email} onChange={onEmailHandler} />
                              <FontAwesomeIcon icon={faEnvelope} id={style.envelopeIcon} />
                          </div>
                          <div id={style.signIn}>
                              <input type="submit" value="다음" id={style.signInBtn}/>                               
                          </div>
                       </form>
                  </div>
          </div>
      </div>
    </div>
  )
}

export default FindPasswordPage;