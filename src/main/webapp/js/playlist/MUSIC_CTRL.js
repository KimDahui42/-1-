const MUSICController = (()=> {
  const keyName = [
    'C','C#/Db', 'D', 'D#/Eb', 'E', 'F',
    'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
  const mode = ['', ' Minor', ' Major'];
  return {
    getKeyName (index) {
      return keyName[index];
    },
    getMode (index) {
      return mode[index];
    },
    getKey (key, mode) {
      const first = this.getKeyName (key);
      const second = this.getMode (mode + 1);
      return first + second;
    }
  }
})();

export default MUSICController;