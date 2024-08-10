// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });
function loadinganimation() {
    gsap.from("#center1",{
        scale: 0.9,
        opacity:0,
        delay:0.1,
        duration:0.5,
        // stagger:0.2
    })
    gsap.from("#left1 h1",{
        y:4,
        opacity:0,
        delay:0.5,
        duration:0.8,
        stagger:0.2
    })
    gsap.from("#left1 h3",{
        y:4,
        opacity:0,
        delay:0.5,
        duration:0.8,
        stagger:0.2
    })
    gsap.from("#right1",{
        scale: 0.9,
        opacity:0,
        delay:0.3,
        duration:0.5,
        // stagger:0.2
    })
        
    gsap.from("#center2",{
        scale: 0.9,
        opacity:0,
        delay:0.5,
        duration:0.5,
        // stagger:0.2
    })
        gsap.from("#right2 h1",{
            y:4,
            opacity:0,
            delay:0.9,
            duration:0.8,
            stagger:0.2
        })
        gsap.from("#right2 h3",{
            y:4,
            opacity:0,
            delay:0.9,
            duration:0.8,
            stagger:0.2
        })
        gsap.from("#left2",{
            scale: 0.9,
            opacity:0,
            delay:0.7,
            duration:0.5,
            stagger:0.2
        })
       
    
}
loadinganimation()

