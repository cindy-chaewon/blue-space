import React, { useState} from 'react';
import style from './Modal.module.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {teamUser} from '../../../_actions/user_action'





const Modal =  (props) => {
    const Dispatch = useDispatch();
    let navigate = useNavigate();
    const {onClose} = props;
    const [Name, setName] = useState("");
    //const [Email, setEmail] = useState("");
    //const [EmailList, setEmailList] = useState([]);

    

    const [emails, setEmails] = useState([]);
    const [inputEmail, setInputEmail] = useState('');
    const [nextId, setNextId] = useState('');

    
    


    const handleChange = e => setInputEmail(e.target.value);

    const handleClick = () => {
        const newList = emails.concat({
            id: nextId,
            name: inputEmail
        });
        setNextId(nextId+1);
        setEmails(newList);
        setInputEmail('');
    }
    
    const handleDelete = id => {
        const newList = emails.filter(email => email.id !== id);
        setEmails(newList);
    };

    const emailList = emails.map((email) => 
        <div key={email.id}>
            <div className={style.EmailListItem}>
                <button className={style.removeemail} onClick={() => handleDelete(email.id)}>삭제</button>
                <div className={style.text}>{email.name}</div>
            </div>
        </div>
    );


    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

  

    const onSubmitHandler =  (event) => {
        event.preventDefault();

        let body = {
            
            creatorId : sessionStorage.getItem('userId'),
            teamName : Name,
            memberEmail : emails    
        }
            
        Dispatch(teamUser(body))
        .then(response =>{

            sessionStorage.setItem('teamname', response.payload.data.result.teamName);


            if(response.payload.data.code === 1000) {

                console.log("확인111", response);
                
            } else {
                console.log("확인222", response);
                alert(response.payload.data.message);
        
            }
        })

    }
    


  return (
    <div className={style.popup} >
        <div className={style.popupdiv}>
            <div className={style.remove} >
                <img src="/img/common_img/removeImg.png" onClick={()=> {onClose(false);}}/>
            </div>
            
            
            <div className={style.nameuser}>
                    <p>팀폴더명</p>
            </div>
                


                <div className={style.nameform}>
                    <form onSubmit={onSubmitHandler}>
                        <div id={style.name}>
                            <input type="name" name="name"  className={style.nametxt} id={style.nameInput} value={Name} onChange={onNameHandler}/>
                        </div>
                        <div id = {style.buttonname}>
                            <input type="submit" value="팀 생성하기" id={style.namebtn} className={style.namebtn}/>
                        </div>

                    </form>
                </div>
                
                <div className={style.line}></div>

                

                <div className={style.emailuser}>
                    <p>이메일로 팀원 초대하기</p>
                </div>
                
             

                <div className={style.EmailTemplate}>
                    <div className={style.content}>
                        <form className={style.EmailInsert}>
                            <input className={style.EmailInsertinput}placeholder="이메일을 입력하세요" value={inputEmail} onChange={handleChange}/>
                            <button type="button"onClick={handleClick} className={style.EmailInsertbtn}>추가</button>
                        </form>

                        <div className={style.EmailList}>
                            {emailList}
                        </div>
                    </div>
                </div>
        </div>
    </div>

  )
}

export default Modal