import React, { useState, useRef } from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import {loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import style from './LoginStyle.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

function LoginPage() {


 
  const Dispatch = useDispatch();
  let navigate = useNavigate();

  let errorMsgRef = useRef();

  const [Email, setEmail] = useState(""); 
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email : Email,
      password : Password 
    }

    Dispatch(loginUser(body))
    .then(response =>{

        sessionStorage.setItem('userId', response.payload.result.memberId);
        sessionStorage.setItem('memberName', response.payload.result.memberName);

        
      if(response.payload.code == 1000) {
        console.log("확인", response);
        navigate("/")
        // console.log(props.showLayout);
        // props.setShowLayout(true);
    } else {
        errorMsgRef.current.style = "visibility: visible"
        // alert('error occur')
        // alert('error on')
        // console.log(errorMsgRef);
        // errorMsgRef[0].style.display = 'block';
        }
    })
    // .then(() => {navigate("/")})
  }

// 폰트랑 Create~ 수정해야함
  return (
    <div id={style.loginPage}>
        <div className={style.leftBlue}>
        <img src="img/LoginImages/LogoImage.png" id={style.logoImage} alt="LogoImage" />
        </div>

        <div className={style.rightWhite}>
            <div id={style.createAccount}>
                <Link to="/register" style = {{fontSize : '18px', fontWeight : '800', color:'#267dff'}}>Create an account</Link>
            </div>
            <div id={style.rightContents}>
                <div id={style.wrap}>

                    <div id={style.loginTitle}>
                        <div id={style.welcome}>
                            <h2>Welcome to Blue Space!</h2>
                        </div>
                        <p>Register your account</p>
                    </div>

                    <div id={style.login}>
                        <form onSubmit={onSubmitHandler}>
                            <div id={style.email}>
                                <input type="email" name="email" placeholder="이메일 (로그인 시 필요)" id={style.emailInput} value={Email} onChange={onEmailHandler}/>
                                <FontAwesomeIcon icon={faEnvelope} id={style.envelopeIcon} />
                                
                            </div>
                            <div id={style.password}>
                                <input type="password" name="password" placeholder="비밀번호" id={style.passwordInput} value={Password} onChange={onPasswordHandler} />
                                <FontAwesomeIcon icon={faLock} id={style.lockIcon} />
                                <FontAwesomeIcon icon={faEye} id={style.eyeIcon} />
                                
                            </div>


                            <div ref={errorMsgRef} className={style.loginError}>아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.</div>

                            
                            <div id={style.buttonLogin}>
                                <input type="submit" value="로그인" id={style.loginBtn} />
                            </div>
                        </form>

                     
                    </div>

                  
                    
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage;