import{g as t,S as e}from"./ScrollTrigger.Stdd2ew2.js";t.registerPlugin(e);window.addEventListener("load",()=>{const r=t.timeline();r.from("#first",{opacity:0,duration:1,x:-100}),r.from("#second",{opacity:0,duration:1,x:-100}),r.from("#secondhalf",{opacity:0,duration:.5,x:-100}),r.from("#third",{opacity:0,duration:.5,x:-100}),r.from("#fourth",{opacity:0,duration:.5,x:-100})});t.to("#intro",{scrollTrigger:{scrub:!0,trigger:"#fifth",start:"top bottom",end:"top center"},opacity:0,y:-300});t.from("#fifth",{scrollTrigger:{scrub:!0,trigger:"header",start:"center center",end:"center top"},opacity:0,x:-300});t.from("#sixth",{scrollTrigger:{scrub:!0,trigger:"#fifth",start:"center center",end:"bottom top"},opacity:0,x:-300});t.from("#seventh",{scrollTrigger:{scrub:!0,trigger:"#sixth",start:"center center",end:"bottom top"},opacity:0,x:-300});t.from("#eighth",{scrollTrigger:{scrub:!0,trigger:"#seventh",start:"center center",end:"bottom top"},opacity:0,x:-300});t.from("#ninth",{scrollTrigger:{scrub:!0,trigger:"#eighth",start:"center center",end:"bottom top"},opacity:0,x:-300});t.from("#tenth",{scrollTrigger:{scrub:!0,trigger:"#tenth",start:"top center",end:"center center"},opacity:0,y:300});document.getElementById("tenth").addEventListener("click",()=>{t.to("#tenth",{duration:1,rotation:360})});
