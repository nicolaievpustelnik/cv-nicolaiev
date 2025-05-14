import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import GlitchText from './GlitchText/GlitchText';

export default function Hero3D() {
  const [visible, setVisible] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Podés ajustar el umbral si querés
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mostrar canvas solo si está en viewport (parte superior)
  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY;
      setVisible(offset < 100);
      setShowCanvas(offset < 100); // Monta o desmonta el canvas
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Ejecutar una vez al montar
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = () => {
    const section = document.getElementById('about');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-3d" id="hero">
      {showCanvas && (
        <Canvas
          camera={{ position: [0, 0, isMobile ? 900 : 680], fov: 80 }}
          dpr={isMobile ? 0.75 : 1.5}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Stars 
            radius={200} 
            depth={isMobile ? 20 : 60} 
            count={isMobile ? 5000 : 20000} 
            factor={isMobile ? 2 : 7}
            saturation={0} 
          />
          <OrbitControls
            autoRotate={!isMobile}
            enableZoom={!isMobile}
            enablePan={!isMobile}
            enableRotate={!isMobile}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={50}
            maxDistance={1300}
          />
        </Canvas>
      )}

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
        {!isMobile && (
          <div className="scroll-down">
            Scroll Effect <span className="arrow-icon-home">↕</span> or <span className="arrow-icon-home">↔</span>
          </div>
        )}
        <button className="scroll-button" onClick={scrollToSection}>
          More info
        </button>
      </div>
    </section>
  );
}
