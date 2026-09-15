// Copies the stylesheet next to the compiled JS so consumers can
// `import "@frens-earth/arcade-ui/styles.css"`.
import { cpSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });
cpSync("src/styles/arcade.css", "dist/arcade.css");
cpSync("src/styles/fonts.css", "dist/fonts.css");
