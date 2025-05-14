import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Html, useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";

// Hook de visibilidad
function useVisibility(ref) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isVisible;
}

export default function Projects3D() {
  const containerRef = useRef(null);
  const isVisible = useVisibility(containerRef);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const dpr = isMobile ? 0.8 : 1.5;

  const projects = [
    {
      img: `${process.env.PUBLIC_URL}/corp.jpeg`,
      title: "CorpSolutions",
      description: "Full stack developer",
      date: "Jul 2019 - Jun 2020",
      web: "https://corpsolutions.com.ar/",
    },
    {
      img: `${process.env.PUBLIC_URL}/banco-comercio.jpeg`,
      title: "Banco de Comercio S.A.",
      description: "Back-end Developer",
      date: "Jun 2020 - Mar 2021",
      web: "https://www.bancodecomercio.com.ar/inicio",
    },
    {
      img: `${process.env.PUBLIC_URL}/accenture.png`,
      title: "Accenture",
      description: "Full stack engineering specialist",
      date: "Apr 2021 - Mar 2024",
      web: "https://www.accenture.com/ar-es",
    },
    {
      img: `${process.env.PUBLIC_URL}/ibm.png`,
      title: "IBM",
      description: "Application Developer",
      date: "Mar 2024 - In progress",
      web: "https://www.ibm.com/account/ar/es/",
    },
  ];

  if (isMobile) {
    return (
      <section id="projects" ref={containerRef}>
        <h2 className="project-title">Projects & Experience</h2>
        <div className="project-list-mobile">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card"
              onClick={() => window.open(project.web, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={project.img}
                alt="project logo"
                width={100}
                height={100}
                style={{ marginBottom: "10px" }}
              />
              <h3>{project.title}</h3>
              <h4>{project.description}</h4>
              <p>{project.date}</p>
              <span style={{ color: "#00ffff", textDecoration: "underline" }}>
                Visit website
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function StarField() {
    const starCount = 2000;
    const geometry = useMemo(() => {
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geom;
    }, []);

    const points = useRef();

    useFrame(() => {
      if (points.current) {
        points.current.position.y -= 0.5;
        if (points.current.position.y < -150) {
          points.current.position.y = 150;
        }
      }
    });

    return (
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.9}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>
    );
  }

  function FireEffect() {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const velocity = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 1] = Math.random() * -0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

      velocity[i * 3 + 1] = -0.1 + Math.random() * -0.3;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(1, 0.5, 0),
      size: 0.15,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);

    useFrame(() => {
      const pos = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += velocity[i * 3 + 1];
        if (pos[i * 3 + 1] < -2) {
          pos[i * 3 + 1] = Math.random() * -0.5;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
    });

    return <primitive object={particles} position={[0, 1, 0]} />;
  }

  function RocketModel() {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/Rocket.glb`);
    const modelRef = useRef();

    useEffect(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          const name = child.name.toLowerCase();
          const material = new THREE.MeshStandardMaterial({
            metalness: 0.4,
            roughness: 0.4,
          });

          if (name.includes("tip") || name.includes("fin") || name.includes("wing")) {
            material.color = new THREE.Color("#ff4d4d");
          } else if (name.includes("window")) {
            material.color = new THREE.Color("#3399ff");
            material.emissive = new THREE.Color("#1a5fcc");
            material.emissiveIntensity = 0.4;
          } else if (name.includes("engine") || name.includes("exhaust") || name.includes("thruster")) {
            material.color = new THREE.Color("#555555");
            material.metalness = 0.6;
            material.roughness = 0.2;
          } else {
            material.color = new THREE.Color("#ffffff");
          }

          child.material = material;
        }
      });
    }, [scene]);

    return <primitive object={scene} ref={modelRef} scale={0.5} position={[0, 0.5, 0]} />;
  }

  function ProjectRing() {
    const groupRef = useRef();
    const radius = 5;

    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.003;
      }
    });

    return (
      <group ref={groupRef}>
        {projects.map((project, i) => {
          const angle = (i / projects.length) * Math.PI * 2;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          return (
            <Html
              key={i}
              position={[x, 0, z]}
              transform
              sprite
              distanceFactor={1.5}
              occlude
              zIndexRange={[100, 0]}
            >
              <div
                className="project-card"
                onClick={() => window.open(project.web, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={project.img}
                  alt="project logo"
                  width={100}
                  height={100}
                  style={{ marginBottom: "10px" }}
                />
                <h3>{project.title}</h3>
                <h4>{project.description}</h4>
                <p>{project.date}</p><br />
                <span style={{ color: "#00ffff", textDecoration: "underline" }}>
                  Visit website
                </span>
              </div>
            </Html>
          );
        })}
      </group>
    );
  }

  return (
    <section id="projects" ref={containerRef}>
      <h2 className="project-title">Projects & Experience</h2>
      <div className="project-effect">
        Use Effect <span className="arrow-icon">↔</span>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 2.5, 7], fov: 50 }}
        dpr={dpr}
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="sunset" background={false} />
        <StarField />
        <RocketModel />
        <FireEffect />
        <ProjectRing />
        <OrbitControls
          enableZoom={false}
          enablePan
          enableRotate
          rotateSpeed={0.4}
          enableDamping
          dampingFactor={0.25}
          screenSpacePanning={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </section>
  );
}
