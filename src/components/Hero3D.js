import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import GlitchText from './GlitchText/GlitchText';

export default function Hero3D() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY;
      if (offset < 100) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = () => {
    const section = document.getElementById('about');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-3d" id="hero">
      <Canvas camera={{ position: [0, 0, 680], fov: 80 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Stars 
          radius={300} 
          depth={60} 
          count={20000} 
          factor={7} 
          saturation={0} 
        />
        <OrbitControls
          autoRotate
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          minDistance={50}
          maxDistance={1300}
        />
      </Canvas>

      <div className={`overlay ${visible ? 'fade-in' : ''}`}>
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={false}
          className='custom-class'
        >
          Nicolaiev.Dev
        </GlitchText>
        <p className="hero-subtitle">Software Developer | Back-End & Architecture</p>
        <div className="scroll-down"> Scroll Effect <span className="arrow-icon-home">↕</span> or <span className="arrow-icon-home">↔</span></div>
        <button className="scroll-button" onClick={scrollToSection}>
          More info
        </button>
      </div>
    </section>
  );
}
