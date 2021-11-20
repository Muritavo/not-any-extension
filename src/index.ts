import { existsSync, readdirSync } from "fs";
import { resolve } from "path";
import vs from "vscode";
import KeystrokesObserver from "./modules/KeystrokesObserver";
import Player from "./modules/Player/Player";

const AvailableSounds = readdirSync(resolve(__dirname, "assets", "sounds"));

function randomSelectFile() {
  const select = Math.floor(Math.random() * AvailableSounds.length);
  const fileSelec = AvailableSounds[select] || AvailableSounds[0];
  return fileSelec;
}

export function activate() {
  const player = new Player();
  const instance = new KeystrokesObserver();
  instance.on("any", () => {
    const soundPath = resolve(
      __dirname,
      "assets",
      "sounds",
      randomSelectFile()
    );
    player.play(soundPath, 100);
  });
  vs.workspace.onDidChangeTextDocument((e) => {
    const key = e.contentChanges[0].text;
    instance.onKey(key);
  });
}
export function deactivate() {}
