"use strict";(()=>{var e={};e.id=912,e.ids=[912],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},28634:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>g,originalPathname:()=>q,patchFetch:()=>f,requestAsyncStorage:()=>x,routeModule:()=>l,serverHooks:()=>d,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>m});var o={};r.r(o),r.d(o,{GET:()=>c,POST:()=>c});var s=r(95419),a=r(69108),n=r(99678),i=r(81355),u=r.n(i);let p={providers:[(0,r(10375).Z)({clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID??"",clientSecret:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET??"",authorization:{params:{prompt:"consent",access_type:"offline",response_type:"code"}}})]},c=u()(p),l=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/auth/[...nextauth]/route",pathname:"/api/auth/[...nextauth]",filename:"route",bundlePath:"app/api/auth/[...nextauth]/route"},resolvedPagePath:"/Users/harshitha/Staff-Assistance/app/api/auth/[...nextauth]/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:x,staticGenerationAsyncStorage:h,serverHooks:d,headerHooks:g,staticGenerationBailout:m}=l,q="/api/auth/[...nextauth]/route";function f(){return(0,n.patchFetch)({serverHooks:d,staticGenerationAsyncStorage:h})}},10375:(e,t)=>{t.Z=function(e){return{id:"google",name:"Google",type:"oauth",wellKnown:"https://accounts.google.com/.well-known/openid-configuration",authorization:{params:{scope:"openid email profile"}},idToken:!0,checks:["pkce","state"],profile:e=>({id:e.sub,name:e.name,email:e.email,image:e.picture}),style:{logo:"/google.svg",bg:"#fff",text:"#000"},options:e}}},95419:(e,t,r)=>{e.exports=r(30517)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,355],()=>r(28634));module.exports=o})();