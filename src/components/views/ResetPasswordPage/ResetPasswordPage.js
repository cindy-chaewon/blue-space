import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import style from './ResetPasswordPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function ResetPasswordPage(props) {

  const Dispatch = useDispatch();
  let navigate = useNavigate();

  let PasswordLength = useRef();

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(Password.length<6) {
      PasswordLength.current.style = "visibility: visible"
      return
    }
    if(Password != ConfirmPassword) {
      // console.log(mustCheckBox.current.checked);
      return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
    }
    let body = {
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
                        비밀번호 재설정
                    </div>
                    <div id={style.title2}>
                        비밀번호를 변경해 주세요.
                    </div>
                    <div id={style.title3}>
                        영문, 숫자, 특수분자를 함께 사용하면 보다 안전합니다.
                    </div>
                </div>
            
                <div id={style.register}>
                    <form onSubmit={onSubmitHandler}>
        
                        <div id={style.password}>
                            <input type="password" name="password" placeholder="새 비밀번호" id={style.passwordInput} value={Password} onChange={onPasswordHandler} />
                            <FontAwesomeIcon icon={faLock} className={style.lockIcon} />
                            <FontAwesomeIcon icon={faEyeSlash} className={style.eyeSlashIcon} />
                        </div>
                        <div ref={PasswordLength} className={style.passwordLength}>6글자 이상이어야 합니다.</div>
                      {/* 임시 비밀번호 확인 */}
                        <div id={style.confirmPassword}>
                            <input type="password" name="confirm_password" placeholder="새 비밀번호 확인" id={style.confirmPasswordInput} value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                            <FontAwesomeIcon icon={faLock} className={style.lockIcon} />
                            <FontAwesomeIcon icon={faEyeSlash} className={style.eyeSlashIcon} />
                        </div>
                        <div id={style.signIn}>
                            <input type="submit" value="비밀번호 재설정하기" id={style.signInBtn}/>                               
                        </div>
                     </form>
                </div>
          </div>
      </div>
    </div>
  )
}


export default ResetPasswordPage;