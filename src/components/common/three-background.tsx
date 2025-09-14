'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Geometry
    const shapes = [];
    const geometry1 = new THREE.IcosahedronGeometry(1, 0);
    const geometry2 = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
    const geometry3 = new THREE.BoxGeometry(1, 1, 1);
    
    const geometries = [geometry1, geometry2, geometry3];

    // Materials
    const material1 = new THREE.MeshStandardMaterial({ color: 0x9400D3, roughness: 0.5, metalness: 0.7, wireframe: true });
    const material2 = new THREE.MeshStandardMaterial({ color: 0xBF00FF, roughness: 0.3, metalness: 0.8 });

    // Create shapes
    for (let i = 0; i < 20; i++) {
        const geometry = geometries[i % geometries.length];
        const material = i % 2 === 0 ? material1 : material2.clone();
        const shape = new THREE.Mesh(geometry, material);

        shape.position.x = (Math.random() - 0.5) * 10;
        shape.position.y = (Math.random() - 0.5) * 10;
        shape.position.z = (Math.random() - 0.5) * 10;

        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;
        
        const scale = Math.random() * 0.2 + 0.1;
        shape.scale.set(scale, scale, scale);
        
        shapes.push(shape);
        scene.add(shape);
    }
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9400D3, 5, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xBF00FF, 5, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Handle window resize
    const onWindowResize = () => {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.002;
            shape.position.y += Math.sin(elapsedTime + index) * 0.005;
        });
        
        renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometries.forEach(g => g.dispose());
      material1.dispose();
      material2.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}
