import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, TextPlugin);

const RevertedAuto = () => {
    const container = useRef();
    const [isVisible, setIsVisible] = useState(false)

    useGSAP(() => {
        if(isVisible){
            gsap.to('.box', {
                rotation: 360,
                duration: 2,
            })
    
            gsap.fromTo('.box',
                { opacity: 0, x: -350 },
                { opacity: 1, x: 0, duration: 2, ease: TextPlugin.easeOut },
            )
        }
        
    }, {
        scope: container,
        dependencies: [isVisible],
        revertOnUpdate: true
    })

    useEffect(() => {
        const handleIntersection = (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false)
          }
        };
    
        const observer = new IntersectionObserver(handleIntersection, {
          threshold: 1, 
        });
    
        if (container.current) {
          observer.observe(container.current);
        }
    
        return () => {
          if (container.current) {
            observer.unobserve(container.current);
          }
        };
    }, []);

    return (
        <div ref={container}>
            <div className='box rounded-full'>Hello</div>
        </div>
    );
};

export default RevertedAuto;