import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Stats } from "@react-three/drei";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from "recoil";
import Clear from "./clear";
import Postprocessing from "./postprocessing";
import Borders from "./borders";
import { useContentsState } from "./states";
import BlockCheck from "./blockCheck";
import Model from "./block";
import SoftKeyboard from "./keyboard";
import { Box } from "@mui/material";
import Header from "./header";

export default function Wordle3D() {
  // input chars
  const contents = useRecoilValue(useContentsState);

  // to use recoil state inside <Canvas>
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <>
      <Clear />
      <SoftKeyboard />
      <Header />
      <Box sx={{ height: "calc(100vh - 150px)" }}>
        <Canvas
          shadows
          gl={{ stencil: false, depth: false, alpha: false, antialias: false }}
          camera={{ position: [0, -3, 10], fov: 50, near: 17, far: 40 }}
        >
          <RecoilBridge>
            <BlockCheck />
            <color attach='background' args={["#111111"]} />
            <ambientLight intensity={2} />
            <Physics
              gravity={[0, -50, 0]}
              defaultContactMaterial={{ restitution: 0.8, friction: 0 }}
            >
              <Borders />
              <group position={[0, 0, -10]}>
                {contents.map((item, index) => (
                  <Model
                    key={index}
                    index={index}
                    boxChar={item}
                    queuePos={index % 5}
                  />
                ))}
              </group>
            </Physics>
            {/* <Stats /> */}
            <Postprocessing />
          </RecoilBridge>
        </Canvas>
      </Box>
    </>
  );
}
