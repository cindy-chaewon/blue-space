import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';


export default function(SpecificComponent, Option, AdminRoute = null) {

    // null : 아무나 출입가능, true : 로그인한 유저만 출입이 가능, false : 로그인한 유저는 출입불가능 
    // Admin만 들어가고 싶으면 3번째 인자에 true라고 주면됨(지금은 안쓰면 기본값 null)
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();
        let navigate = useNavigate();
        useEffect(() => {

            dispatch(auth())
            .then(response => {
                console.log(response.payload.data.isAuth)

                // 분기 처리

                // 로그인 안한 상태
                if(!response.payload.data.isAuth) {  
                    if(Option) {
                        // console.log("navigate('/login')")
                        navigate('/login')
                    }
                }
                // 로그인 한 상태
                else {
                    if(AdminRoute && !response.payload.data.isAdmin) // admin이 아닌데, admin만 들어갈 수 있는데 페이지에 들어갈려고할 경우
                    {
                        // console.log("navigate('/login')")
                        navigate('/')
                    }
                    else {
                        if(!Option) {
                            // console.log("navigate('/login')")
                            navigate('/')   // 
                        }
                    }
                }
            })
            // backend가 준 정보가 response안에 들어 있음
            



        }, [])

        return (
            <SpecificComponent />
        )
    }

    return(
        < AuthenticationCheck />
    )
}