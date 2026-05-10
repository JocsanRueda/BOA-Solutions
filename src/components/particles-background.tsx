import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "./theme-provider";
import { lightParticlesConfig, darkParticlesConfig } from "@/data/particles/particles-config";

export function ParticlesBackGround() {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    }).catch(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      className="particles-background pointer-events-auto"
      id="tsparticles"
      options={theme === "dark" ? darkParticlesConfig : lightParticlesConfig}
    />
  );
}

export default ParticlesBackGround;