const cp = require("child_process");
const path = require("path");
const player = require("play-sound")();

const _isWindows = process.platform === "win32";
const _playerWindowsPath = path.join(__dirname, "..", "audio", "sounder.exe");

export interface PlayerConfig {
  /**
   * Specify volume of the sounds
   */
  macVol: number;
  winVol: number;
  linuxVol: number;
}

const playerAdapter = (opts: PlayerConfig) => ({
  afplay: ["-v", opts.macVol],
  mplayer: ["-af", `volume=${opts.linuxVol}`],
});

export default class Player {
  _normalizeVolume(volumeBetween100and0: number) {
    return process.platform === "win32"
      ? volumeBetween100and0
      : volumeBetween100and0 / 100;
  }
  play(filePath: string, volume: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (_isWindows) {
        cp.execFile(_playerWindowsPath, [
          "/vol",
          this._normalizeVolume(volume),
          filePath,
        ]);
        resolve();
      } else {
        const _volumeNormalized = this._normalizeVolume(volume);
        player.play(
          filePath,
          playerAdapter({
            linuxVol: _volumeNormalized,
            macVol: _volumeNormalized,
            winVol: _volumeNormalized,
          }),
          (err: any) => {
            if (err) {
              console.error(
                "Error playing sound:",
                filePath,
                " - Description:",
                err
              );
              return reject(err);
            }
            resolve();
          }
        );
      }
    });
  }
}
