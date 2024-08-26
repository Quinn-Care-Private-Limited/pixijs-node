import {
  detectMp4,
  detectOgv,
  detectWebm,
  extensions,
  loadTextures,
  loadWebFont,
  ResizePlugin,
} from "pixi.js";
// import { NodeCanvasResource } from "./adapter";

// Remove the default loader plugins
extensions.remove(
  detectMp4,
  detectOgv,
  detectWebm,
  loadTextures,
  loadWebFont,
  ResizePlugin
);

// reset installed resources and remove resize plugin from Application
// extensions.add(NodeCanvasResource);

// Export ES for those importing specifically by name

// Export adapter
export * from "./adapter";
