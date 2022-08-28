import logo from './logo.svg';
import './App.css';
import style from './App.module.css';
import { React, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import FindPasswordPage from './components/views/FindPasswordPage/FindPasswordPage';
import ResetPasswordPage from './components/views/ResetPasswordPage/ResetPasswordPage';

import Auth from './hoc/auth'

import Header from './components/views/Header/Header'
import LeftNav from './components/views/LeftNav/LeftNav'
import RightNav from './components/views/RightNav/RightNav'

import MainPage from './components/views/MainPage/MainPage'

import LinkStorePage from './components/views/LinkStorePage/LinkStorePage'
import ImageUpload from './components/views/ImageUploadPage/ImageUpload'
import MemoUpload from './components/views/MemoPage/MemoUpload'
import FileUploadPage from './components/views/FileUploadPage/FileUploadPage'

import BookmarkPage from './components/views/BookmarkPage/BookmarkPage'
import TrashPage from './components/views/TrashPage/TrashPage'
import SearchPage from './components/views/SearchPage/SearchPage'
import PersonalProfilePage from './components/views/PersonalProfilePage/PersonalProfilePage'
import TeamProfilePage from './components/views/TeamProfilePage/TeamProfilePage';



function App() {

  return (

    <div className="App">
        <BrowserRouter> 
            <div id={style.wrap}>
            
                  <Routes>

                      <Route element={ < Header /> } >
                      <Route element={ < LeftNav /> } >
                      <Route element={ < RightNav /> } >
                        
                          <Route path="/" element={ < MainPage /> } />
                          <Route path="/linkstore" element={ < LinkStorePage /> } />
                          <Route exact path="/imagestore" element={ < ImageUpload /> } />
                          <Route exact path="/memostore" element={ < MemoUpload /> } />
                          <Route exact path="/filestore" element={ < FileUploadPage /> } />
                          <Route exact path="/search" element={ < SearchPage /> } />
                          <Route exact path="/trash" element={ < TrashPage /> } />
                          <Route exact path="/bookmark" element={ < BookmarkPage /> } />
                          <Route exact path="/personalprofile" element={ < PersonalProfilePage /> } />
                          <Route exact path="/teamprofile" element={ < TeamProfilePage /> } />

                      
                      </Route>
                      </Route>
                      </Route>

                      <Route exact path="/login" element={ Auth(LoginPage, false) } />
                      <Route exact path="/register" element={ Auth(RegisterPage, false) } />
                      <Route exact path="/findpassword" element={ < FindPasswordPage /> } />
                      <Route exact path="/resetpassword" element={ < ResetPasswordPage /> } />
                      

                   </Routes>

            </div>
        </BrowserRouter>
    </div>

  )
  
}

export default App;

