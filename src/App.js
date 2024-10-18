import './App.css';
import { gsap } from "gsap";
import { useEffect, useRef } from 'react';

// GSAP plugin
import { SlowMo } from "gsap/EasePack";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FlipPlugin from './Components/FlipPlugin';
import RevertedAuto from './Components/RevertedAuto';
import { useGSAP } from '@gsap/react';
import ClickEvent from './Components/ClickEvent';

function App() {
  const headerRef = useRef(null)
  const textRef = useRef(null)

  gsap.registerPlugin(SlowMo, TextPlugin, ScrollToPlugin);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -150 },
      { opacity: 1, y: 0, duration: 2, ease: SlowMo.easeOut }
    )
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -150 },
      { opacity: 1, x: 0, duration: 2, ease: TextPlugin.easeOut },
    )
  },{
    scope: [headerRef, textRef],
    revertOnUpdate: true,
  })

  const scrollToSection = (section) => {
    gsap.to(window, {duration: 2, scrollTo: section, ease: "power2"})
  }

  return (
    <div className="App">
      <header id="header" className="App-header relative">
        <div className='absolute top-0' style={{display: "flex", gap: "5"}}>
          <button onClick={() => scrollToSection("#section1")}>Home</button>
          <button onClick={() => scrollToSection("#section2")}>About</button>
          <button onClick={() => scrollToSection("#section3")}>Footer</button>
        </div>
        <h1 ref={headerRef}>Hello GSAP</h1>
        <h1 ref={textRef}>Hello Text</h1>
        <ClickEvent />
      </header>

      <div id='section1' className='h-auto bg-blue-300 py-5'>
        {/* <h2>Home</h2> */}
        <FlipPlugin />
      </div>

      <div id='section2' className='flex flex-col items-center justify-top gap-10' style={{height: "30vh", backgroundColor: "lightgreen"}}>
        <h2>About</h2>
        <RevertedAuto />
      </div>

      <div id='section3' className='h-[10vh] bg-white flex flex-col items-center gap-3'>
        <h2>Footer</h2>
        <div onClick={() => scrollToSection("#header")} className='flex items-center justify-center h-10 w-10 rounded-full bg-orange-300 cursor-pointer'>^</div>
      </div>
    </div>
  );
}

export default App;
