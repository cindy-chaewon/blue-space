import React, { useRef, useEffect, useState } from 'react';
import style from './Navbar.module.css'
import { Link } from 'react-router-dom';

function Navbar(props) {


  //const fromWhere = !(sessionStorage.getItem('teamName')) ? "내 폴더" : sessionStorage.getItem('teamName')
  // const teamName=sessionStorage.getItem('teamName');
  //const rightArrow = '>'
  const folderName = sessionStorage.getItem('folderName');

  //console.log(props.category);
  return (
    
        <div id={style.contentsHeader}>

            <div id={style.headerName}>
              
              <span id={style.headerName3}>{folderName}</span>
            </div>

            <div id={style.headerSort}>
              <Link to='/linkstore' className={style.sort} id={props.category == 'link' ? style.sortOnCategory : null}>링크</Link>
              <Link to='/filestore' className={style.sort} id={props.category == 'file' ? style.sortOnCategory : null}>파일</Link>
              <Link to='/memostore' className={style.sort} id={props.category == 'memo' ? style.sortOnCategory : null}>메모</Link>
            </div>

        </div>

);  
}


export default Navbar;

// const fromWhere = !(sessionStorage.getItem('fromWhere')) ? "내 폴더" : sessionStorage.getItem('fromWhere')