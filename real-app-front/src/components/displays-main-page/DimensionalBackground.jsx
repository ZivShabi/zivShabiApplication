import { useEffect, useRef } from "react";
import * as THREE from "three";

const DigitalBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        scene.background = null;
        renderer.setClearColor(0x000000, 0);

        const material = new THREE.PointsMaterial({
            color: 0xff5733,
            size: 8,
            blending: THREE.AdditiveBlending,
        });

        const points = [];
        const particles = [];
        const numParticles = 100;

        for (let i = 0; i < numParticles; i++) {
            const x = Math.random() * window.innerWidth - window.innerWidth / 2;
            const y = Math.random() * window.innerHeight - window.innerHeight / 2;
            const z = Math.random() * 500 - 250;
            points.push(new THREE.Vector3(x, y, z));
            particles.push(
                new THREE.Points(
                    new THREE.BufferGeometry().setFromPoints([points[i]]),
                    material
                )
            );
        }

        particles.forEach((particle) => scene.add(particle));

        camera.position.z = 500;

        const animate = () => {
            requestAnimationFrame(animate);

            particles.forEach((particle, i) => {
                const time = Date.now() * 0.001 + i;

                points[i].x += Math.sin(time) * 3;
                points[i].y += Math.cos(time) * 3;
                points[i].z += Math.sin(time * 0.5) * 2;
                particle.position.set(points[i].x, points[i].y, points[i].z);

                particle.material.color.setHSL((time % 1), 0.5, 0.5);
            });

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="digital-background" />;
};

export default DigitalBackground