import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Environment } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useTheme } from "../context/ThemeContext";

const TARGET_SIZE = 3;

function Model({ url }) {
    const { scene } = useGLTF(url);

    const cloned = useMemo(() => {
        const clone = scene.clone(true);

        clone.traverse(obj => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });

        const box = new Box3().setFromObject(clone);
        const size = new Vector3();
        const center = new Vector3();
        box.getSize(size);
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = TARGET_SIZE / maxDim;

        clone.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
        clone.scale.setScalar(scale);

        return clone;
    }, [scene]);

    return <primitive object={cloned} />;
}

function Floor({ color }) {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <circleGeometry args={[4, 64]} />
            <meshStandardMaterial color={color} roughness={1} metalness={0} />
        </mesh>
    );
}

const CarViewer = ({ url }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Paleta por theme (el bg de la escena ahora es transparente para mostrar el grid CSS)
    const floorColor = isDark ? '#020617' : '#94a3b8';
    const shadowColor = isDark ? '#000000' : '#334155';
    const hemiSky = isDark ? '#bae6fd' : '#ffffff';
    const hemiGround = isDark ? '#1e293b' : '#cbd5e1';

    // Intensidades — light mode necesita menos drama
    const ambient = isDark ? 0.5 : 1.0;
    const hemiIntensity = isDark ? 0.7 : 0.8;
    const spotIntensity = isDark ? 90 : 65;
    const rimIntensity = isDark ? 50 : 15;
    const fillCyanIntensity = isDark ? 8 : 4;
    const fillWarmIntensity = isDark ? 6 : 3;
    const shadowOpacity = isDark ? 0.7 : 0.45;

    return (
        <Canvas
            shadows
            camera={{ position: [2.6, 1.4, 3.4], fov: 40 }}
            className="w-full h-full"
            dpr={[1, 2]}
            gl={{ alpha: true }}
        >
            <Environment preset="city" environmentIntensity={isDark ? 0.8 : 1.0} />

            <ambientLight intensity={ambient} />
            <hemisphereLight args={[hemiSky, hemiGround, hemiIntensity]} />

            <spotLight
                position={[0, 7, 3]}
                angle={Math.PI / 4.5}
                penumbra={0.6}
                intensity={spotIntensity}
                distance={20}
                decay={1.5}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0005}
                target-position={[0, 0.5, 0]}
            />

            <spotLight
                position={[0, 4, -5]}
                angle={Math.PI / 4}
                penumbra={0.8}
                intensity={rimIntensity}
                distance={15}
                decay={1.5}
                color={isDark ? "#a5b4fc" : "#7dd3fc"}
                target-position={[0, 0.5, 0]}
            />

            <pointLight position={[-4, 1.5, 2]} intensity={fillCyanIntensity} distance={10} color="#7dd3fc" />
            <pointLight position={[4, 1.5, 2]} intensity={fillWarmIntensity} distance={10} color="#fbbf24" />

            <Floor color={floorColor} />

            <Suspense fallback={null}>
                <Model url={url} />
            </Suspense>

            <ContactShadows
                position={[0, 0.001, 0]}
                opacity={shadowOpacity}
                blur={2}
                far={3}
                resolution={512}
                color={shadowColor}
            />

            <OrbitControls
                enablePan={false}
                minDistance={2.5}
                maxDistance={9}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.05}
                autoRotate
                autoRotateSpeed={0.7}
                target={[0, 0.6, 0]}
                makeDefault
            />
        </Canvas>
    );
};

export default CarViewer;
