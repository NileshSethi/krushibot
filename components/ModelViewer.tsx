"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls } from "three-stdlib";

type ModelViewerProps = {
  interactive?: boolean;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ interactive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(0xffffff, 1);
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = interactive;
    controls.enableRotate = interactive;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.screenSpacePanning = false;
    controls.autoRotate = false;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      "/bot.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        // Center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        scene.add(model);

        // Adjust camera to fit model
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;
        camera.position.z = cameraZ;
        camera.updateProjectionMatrix();

        controls.target.copy(center);

        if (interactive) {
          controls.minDistance = maxDim * 0.6;
          controls.maxDistance = maxDim * 4;
          controls.update();
        }

      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    const baseSpeed = 0.3;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      mouseRef.current = { x, y: -y };
    };

    container.addEventListener('pointermove', handlePointerMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = clockRef.current.getElapsedTime();
      const model = modelRef.current;
      if (model) {
        const targetX = mouseRef.current.y * 0.3;
        const targetY = time * baseSpeed + mouseRef.current.x * 0.3;
        model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, targetX, 0.05);
        model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, targetY, 0.05);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={interactive ? "w-full h-full relative cursor-grab active:cursor-grabbing" : "w-full h-full relative"}
      style={{ minHeight: "300px" }}
    />
  );
};

export default ModelViewer;
