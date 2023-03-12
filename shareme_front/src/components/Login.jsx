import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import sharevideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { FcGoogle } from "react-icons/fc";
import { client } from './../client';
//import {createClient} from '@sanity/client'


export default function Login() {
    const navigate = useNavigate();
    const responseGoogle = async (response) =>{        
        const responsedata = decodeJwtResponse(response.credential);    
        localStorage.setItem('users', JSON.stringify(responsedata));    
        const { name, sub, picture } = responsedata;
        const doc = {
            _id: sub,
            _type: 'users',
            userName: name,
            image: picture,
        }

        client.createIfNotExists(doc)
        .then(() =>{
            navigate('/', {replace:true})
            
        });
    }

    function decodeJwtResponse(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
    
        return JSON.parse(jsonPayload);
      }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video 
                    src={sharevideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width="130px" alt="logo" />
                    </div>
                    <div className='shadow-2xl'>
                    <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render = {(renderprops) =>(
                                <button type='button' 
                                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                                    onClick={renderprops.onClick}
                                    disabled={renderprops.disabled}
                                >
                                    <FcGoogle className='mr-4' />Sign In with Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onError={responseGoogle}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
