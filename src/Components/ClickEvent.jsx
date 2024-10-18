import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

const ClickEvent = () => {
    const clickRef = useRef(null)

    const {contextSafe} = useGSAP({scope: clickRef})

    const onClickGood = contextSafe(() => {
        gsap.to('.good', {rotation: 360})
    })

    return (
        <div ref={clickRef}>
          <button onClick={onClickGood} className="good">Click Me</button>
        </div>
    );
};

export default ClickEvent;