import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameApp } from "../src/components/game/GameApp";
import "../src/styles.css";

const root = document.getElementById("app");

if (!root) throw new Error("Game root is missing");

createRoot(root).render(
  <StrictMode>
    <GameApp />
  </StrictMode>,
);