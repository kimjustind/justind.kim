import{g as t,S as o}from"./ScrollTrigger.Stdd2ew2.js";t.registerPlugin(o);t.to("#intro",{scrollTrigger:{scrub:!0,trigger:"#fifth",start:"top bottom",end:"top center"},opacity:0,y:-300});t.from("#fifth",{scrollTrigger:{scrub:!0,trigger:"header",start:"center center",end:"center top"},opacity:0,x:-300});t.from("#sixth",{scrollTrigger:{scrub:!0,trigger:"#fifth",start:"center center",end:"bottom top"},opacity:0,rotation:45,x:300});window.addEventListener("load",()=>{const r=t.timeline();r.from("#first",{opacity:0,duration:1,x:-100}),r.from("#second",{opacity:0,duration:1,x:-100}),r.from("#third",{opacity:0,duration:.5,x:-100}),r.from("#fourth",{opacity:0,duration:.5,x:-100})});
