import React, { useEffect } from 'react';
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-google';



function MyReCaptcha(props) {
    
    let {isVerified} = props;

    useEffect(()=>{
        loadReCaptcha()
    })

    return (
        <ReCaptcha
            // ref={(el) => {this.captchaDemo = el;}}
            render="explicit"
            style="height:60%; transform:scale(0.77);-webkit-transform:scale(0.77);transform-origin:0 0;-webkit-transform-origin:0 0;"
            sitekey="6LfRouYUAAAAAKb9HJShSaIsqJnCRqfSIChKy-Nd"
            onloadCallback={()=>{
                // console.log('loaded');
            }}
            verifyCallback={()=>{
                isVerified(true);
            }}
        />

    )
}

export default MyReCaptcha;