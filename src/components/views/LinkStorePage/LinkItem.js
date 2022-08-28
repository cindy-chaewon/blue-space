import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {trashLink, bookmarkOff, bookmarkOnLink, changeLink} from '../../../_actions/user_action'
import style from './LinkStorePage.module.css';
import { TimeForToday } from '../../../TimeforToday'

function LinkItem(props) {
    
    const Dispatch = useDispatch();

    const onTrashHandler = () => {
        
        Dispatch(trashLink(props.linkId, props.userId))
        .then(response => {
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in TrashLink");      
            } else {
                console.log("ERROR in TrashLink");
                alert(response.payload.data.message);
            }
        })
        .catch(err => console.log("dispatch", err))
    }    


    const [blueBorder, setBlueBorder] = useState('none');

    const onHover = (event) => {
        setBlueBorder("3px solid #267DFF");
    }
    const onNotHover = (event) => {
        setBlueBorder("none");
    }

    const onBookmarkOffLink = () => {
        Dispatch(bookmarkOff(props.bookmarkId))
        .then(response => { 
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in bookmarkOff");
            } else {
                console.log('ERROR in bookmarkOff');
                alert(response.payload.data.message);
            }
        })
        .catch(err => console.log("dispatch bookmarkoff", err))
    }
    
    const onBookmarkOnLink = () => {
        
        console.log("onbm", props.linkId);
        Dispatch(bookmarkOnLink(props.folderId, props.linkId, props.userId))
        .then(response => { 
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in bookmarkOn");
            } else {
                console.log('ERROR in bookmarkOn');
                alert(response.payload.data.message);
            }
        })
        .catch(err => console.log("dispatch", err))
    }


    const [text, setText] = useState(props.name);
    const [editable, setEditable] = useState(false);

    const editOn = () => {
        setEditable(true); 
    };
    
    const handleChange = (event) => {
        setText(event.currentTarget.value);
       // console.log(text);
      };

    const userId = sessionStorage.getItem('userId')

    let fromToday = TimeForToday(props.uploadDate);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          setEditable(!editable);
          console.log("down by enter")

        //alert(text);
        //alert(props.linkId);

          let body = {
            "name" : text,
            "memberId" : userId
        }
          


            Dispatch(changeLink(body, props.linkId))
            .then(response => { 
                
                if(response.payload.isSuccess) {
                    props.setNoLoop(!props.noLoop);
                    console.log("Success in changeTitle", response);
                } else {
                    console.log('ERROR in changeTitle');
                    //alert(response.payload.data.message);
                }
            })
            .catch(err => console.log("dispatch", err))
            }
      };

    const ref = useRef(null);
    
    const handleClickOutside = (e) => {

//
        if (editable == true && !ref.current.contains(e.target)) {


            setEditable(false)
           // console.log("down by enter")

            let body = {
                "name" : text,
                "memberId" : props.userId
            }

          //  console.log(text);
            Dispatch(changeLink(body, props.linkId))
            .then(response => { 
                if(response.payload.isSuccess) {
                    console.log("Success in changeTitle", response);
                    props.setNoLoop(!props.noLoop);
                    
                } else {
                 //   console.log('ERROR in changeTitle');
                    alert(response.payload.data.message);
                }
            })
            .catch(err => console.log("dispatch", err))
        };
      };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside, true);
      });
    // 제목을 바꿀수 있는 기능 => form 태그 필요함
    


    return ( 
            <div className={style.LinkContainer} onMouseEnter={onHover} onMouseLeave={onNotHover} style={{ border : blueBorder}}>
                
                    <div ref={ref}>
                        {editable ? ( <input type="text" value={text} onChange={handleChange} onKeyDown={handleKeyDown} className={style.link_title} id={style.link_title_input}/>) : 
                            (<span onClick={() => editOn()} className={style.link_title}>{text}</span>)}
                    </div>

                <a href={props.link} target="_blank">

                    <p className={style.page_link}>{ props.link.length>=50 ? props.link.substr(0,50)+"..." : props.link }</p>

                    <span className={style.file_date}>{fromToday}</span>
                </a>
                
                <button className={`${style.star_icon} ${style.button_flex}`}>

                    {props.bookmarkId ? ( <img src="img/common_img/star_filled.svg" alt="star" className={style.twenty_size} onClick={onBookmarkOffLink}/>) : 
                        (<img src="img/common_img/star_line.svg" alt="star" className={style.twenty_size} onClick={onBookmarkOnLink} />)} 

                </button>

                <button className={`${style.trashbin_icon} ${style.button_flex}`} onClick={onTrashHandler}>
                    <img src="img/common_img/trashbin.svg" alt="trashbin" className={style.twenty_size}/>
                </button>
                
            </div>
    )
}

export default LinkItem
