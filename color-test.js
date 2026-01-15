const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// 1. Chargement des fichiers
const html = fs.readFileSync(path.resolve(__dirname, 'folliot.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, 'style.css'), 'utf8');

// 2. Simulation du DOM
const dom = new JSDOM(html);
const { document } = dom.window;

// 3. Injection du CSS dans le document simulé
const styleTag = document.createElement("style");
styleTag.innerHTML = css;
document.head.appendChild(styleTag);

// 4. Récupération de la couleur calculée du body
const bodyStyle = dom.window.getComputedStyle(document.body);
const backgroundColor = bodyStyle.backgroundColor;

// 5. Comparaison (Hex #f5f5f5 = RGB 245, 245, 245)
const expectedColor = "rgb(245, 245, 245)";

console.log(`--- Analyse du style ---`);
console.log(`Couleur attendue : ${expectedColor} (#f5f5f5)`);
console.log(`Couleur trouvée  : ${backgroundColor}`);

if (backgroundColor === expectedColor) {
    console.log("✅ SUCCÈS : La couleur du fond est correcte !");
    process.exit(0);
} else {
    console.error("❌ ERREUR : La couleur du fond ne correspond pas.");
    process.exit(1);
}