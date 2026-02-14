'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function DiamondField() {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { theme } = useTheme();

    // Configuration
    const count = 4000; // Slightly reduced for InstancedMesh performance
    const radius = 6; // Spread them out a bit more

    // Re-run setup when theme changes to adjust colors
    useEffect(() => {
        if (!meshRef.current) return;

        const tempObject = new THREE.Object3D();
        const tempColor = new THREE.Color();
        const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

        for (let i = 0; i < count; i++) {
            // Random spherical position
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random()); // Even distribution inside sphere

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            tempObject.position.set(x, y, z);

            // Random rotation for each diamond
            tempObject.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            // Scale: "Medium" Size
            // Previous "tiny" was 0.015. "Too big" was 0.06.
            // Let's try 0.035 with a bit of variance.
            const scale = Math.random() * 0.02 + 0.02;
            tempObject.scale.set(scale, scale, scale);

            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);

            // Colors
            // Dark Mode: Needs to be BRIGHT -> Cyan (#40C4FF) & White
            // Light Mode: Needs to be VISIBLE -> Electric Blue (#2962FF) & Deep Blue
            if (isDark) {
                if (Math.random() > 0.8) {
                    tempColor.setHex(0x40C4FF); // Cyan
                } else {
                    tempColor.setHex(0xFFFFFF); // White
                }
            } else {
                if (Math.random() > 0.8) {
                    tempColor.setHex(0x2962FF); // Electric Blue
                } else {
                    tempColor.setHex(0x00B0FF); // Light Blue
                }
            }

            meshRef.current.setColorAt(i, tempColor);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    }, [theme]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Whole Cloud Rotation
        meshRef.current.rotation.x -= delta / 50;
        meshRef.current.rotation.y -= delta / 60;

        // Mouse Parallax
        const x = state.mouse.x * 0.15;
        const y = state.mouse.y * 0.15;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x, 0.05);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                {/* Octahedron = Diamond Shape */}
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.8}
                    toneMapped={false}
                />
            </instancedMesh>
        </group>
    );
}

export function ParticleWave() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1.5] }} dpr={[1, 2]}>
                <DiamondField />
            </Canvas>
        </div>
    );
}
