import gsap from 'gsap';
import React, { useRef, useState } from 'react';
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const FlipPlugin = () => {
    const [isInNewContainer, setIsInNewContainer] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [boxes, setBoxes] = useState([1, 2, 3, 4])
    const containerRef = useRef(null);
    const boxRef = useRef(null);
    const parentRef = useRef(null);
    const newContainerRef = useRef(null);

    // const shuffleBoxes = () => {
    //     const state = Flip.getState(containerRef.current.children);

    //     setBoxes([...boxes.sort(() => Math.random() - 0.5)]);
    //     Flip.from(state, {
    //         duration: 2,
    //         ease: "power1.inOut",
    //         stagger: 0.1,
    //     });
    // };

    const flipContainer = () => {
        // =============== flip ================
        const state = Flip.getState(boxRef.current);
        if (isInNewContainer) {
            parentRef.current.appendChild(boxRef.current);
        } else {
            newContainerRef.current.appendChild(boxRef.current);
        }
        setIsInNewContainer(!isInNewContainer);

        Flip.from(state, {paused: isPause, duration: 1, ease: "power1.inOut", scale: true})

        // ====================== flip fit ===================
        // const state = Flip.getState(boxRef.current);
        // if (isInNewContainer) {
        //     parentRef.current.appendChild(boxRef.current);
        // } else {
        //     newContainerRef.current.appendChild(boxRef.current);
        // }

        // Flip.fit(state, {
        //     duration: 2,
        //     ease: "power1.inOut",
        //     scale: true
        // })
    }

    return (
        <div>
            <h1 className='text-[35px] pt-5 font-bold'>GSAP Flip Plugin Example</h1>
            {/* <button onClick={shuffleBoxes}>Shuffle Boxes</button>

            <div className='box-container' ref={containerRef}>
                {
                    boxes?.map((box) => (
                        <div key={box} className='box' >{box}</div>
                    ))
                }
            </div> */}

            <div className='w-full h-auto flex items-center justify-center mt-10'>
                <div ref={parentRef} className='relative w-[50%] h-[300px] bg-white rounded-lg p-3'>
                    <div ref={boxRef} className='absolute top-3 left-3 bg-black w-[100px] h-[100px] rounded-lg text-white flex items-center justify-center' >Flip</div>

                    <div ref={newContainerRef} className='absolute bottom-3 right-3 w-[200px] h-[200px] bg-blue-200 rounded-lg flex items-end justify-center pb-3'>New Container</div>

                    <button disabled={isPause} onClick={flipContainer} className='bg-purple-300 px-5 py-2 rounded-lg absolute top-3 right-3'>Change Container</button>
                    <button onClick={() => setIsPause(!isPause)} className='bg-purple-300 px-5 py-2 rounded-lg absolute top-3 right-[200px]'>Push Animation</button>
                </div>
            </div>

        </div>
    );
};

export default FlipPlugin;