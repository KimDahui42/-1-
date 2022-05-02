const MUSICController = (() => {
  const keyName = [
    'C','C#/Db', 'D', 'D#/Eb', 'E', 'F',
    'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
  const mode = ['', ' Minor', ' Major'];

  const getMax = (array) => {
    let max = -1;
    array.forEach(element => {
      if (element > max)
        max = element;
    });
    return max;
  }

  const getMaxIndex = (array) => {
    const max = getMax (array);
    let indexArr = [];
    array.forEach((element, idx) => {
      if (element == max)
        indexArr.push (idx);
    });
    return indexArr;
  }

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
    },
    getPitches (audioSegments) {
      let pitches = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      audioSegments.forEach ((element) => {
        const idx = getMaxIndex (element.pitches);
        idx.forEach ((el) => {
          pitches[el]++;
        });
      });
      return pitches;
    }
  }
})();

export default MUSICController;