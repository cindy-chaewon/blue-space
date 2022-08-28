import React from 'react'
import style from './Header.module.css'

function Notice_contents() {
  return (

    <div className={style.notice_contents}>
        <img src="/img/teamProfile_yellow.svg" className={style.circle} />

        <div className={style.notice_description}>
            <p className={style.notice_what}>000님이 파일이름 을(를) UMC 웹런칭 - 과제헬퍼 폴더에 추가했습니다</p>
            <p className={style.notice_when}>오후 4:05</p>
        </div>
    </div>
    
  )
}

export default Notice_contents