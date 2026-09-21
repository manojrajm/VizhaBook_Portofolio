import fs from "fs";
import path from "path";

const clientDir = path.resolve("dist/client");
const assetsDir = path.join(clientDir, "assets");

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find((f) => f.endsWith(".css"));
  const jsFiles = files.filter((f) => f.endsWith(".js"));

  const cssTag = cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}">` : "";
  const jsTags = jsFiles.map((f) => `<script type="module" src="/assets/${f}"></script>`).join("\n    ");

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>VizhaBook — Enterprise Digital Moi & Event Management Platform</title>
    <meta name="description" content="VizhaBook is a cloud-based digital Moi and event management platform for weddings and traditional celebrations." />
    <link rel="icon" href="/logo.png" type="image/png" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap" />
    <script>
      window.$_TSR = window.$_TSR || {
        buffer: [],
        initialized: false,
        router: { matches: [], manifest: { routes: {} } }
      };
    </script>
    ${cssTag}
  </head>
  <body>
    <div id="root"></div>
    ${jsTags}
  </body>
</html>`;

  fs.writeFileSync(path.join(clientDir, "index.html"), htmlContent);
  console.log("Successfully generated dist/client/index.html for static site deployment!");
}
