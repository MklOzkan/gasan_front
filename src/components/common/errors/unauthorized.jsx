"use client";
import Image from "next/image";
import React from "react";
import {signOut} from 'next-auth/react';

const UnAuthorized = () => {

	 const handleSignOut = () => {
         signOut({ callbackUrl: '/' });
     };
	
    return (
        <div className="container">
            <div className="row g-5 g-sm-0 align-items-center">
                <div className="col-sm-6">
                    <Image
                        src="/errors/error.png"
                        className="img-fluid"
                        width="500"
                        height={500}
                        alt="Unauthorized"
                    />
                </div>
                <div className="col-sm-6 text-center text-sm-start">
                    <h2>Yetkisiz Erişim</h2>
                    <p>
                        Görünüşe göre zaten giriş yapmışsınız ancak erişim izniniz olmayan bir sayfaya ulaşmaya çalışıyorsunuz. Lütfen önce çıkış yapın ve uygun kimlik bilgileriyle tekrar giriş yapın veya sistem yöneticisiyle iletişime geçin.
                    </p>
                    <button className="btn btn-primary" onClick={handleSignOut}>
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnAuthorized;
