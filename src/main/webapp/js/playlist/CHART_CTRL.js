const CHARTController = (() => {
  let chart, context;
  
  const clearChart = () => {
    context.clearRect(0, 0, chart.width, chart.height);
    context.beginPath();
  }

  const drawCircle = (radius) => {
    context.beginPath();
    context.strokeStyle = "white";
    context.arc(150, 150, radius, 0, 2 * Math.PI, false);
    context.stroke();
  }

  const drawBackground = () => {
    drawCircle(100);
    drawCircle(80);
    drawCircle(60);
    drawCircle(40);
    drawCircle(20);
    context.beginPath();
    context.strokeStyle = "white";
    context.moveTo(250, 150);
    context.lineTo(50, 150);
    context.moveTo(150, 250);
    context.lineTo(150, 50);
    context.stroke();
    context.strokeText("1", 150, 50);
    context.strokeText("0.8", 150, 70);
    context.strokeText("0.6", 150, 90);
    context.strokeText("0.4", 150, 110);
    context.strokeText("0.2", 150, 130);
    context.strokeText("0", 150, 150);
    context.strokeText("Danceabiltiy", 130, 30);
    context.strokeText("Energy", 260, 150);
    context.strokeText("Acousticness", 130, 270);
    context.strokeText("Valence", 10, 150);
  }

  const _drawPath = (dance, energy, acoustic, valence) => {
    context.beginPath();
    context.strokeStyle = 'rgba(30, 215, 96, 1)'; //#1ed760
    context.fillStyle = 'rgba(30, 215, 96, 0.5)';
    context.moveTo(150, 150 - 100 * dance);
    context.lineTo(150 + 100 * energy, 150);
    context.lineTo(150, 150 + 100 * acoustic);
    context.lineTo(150 - 100 * valence, 150);
    context.closePath();
    context.stroke();
    context.fill();
    
  }


  return {
    init () {
      chart = document.getElementById("chart-canvas");
      context = chart.getContext("2d");
      clearChart();
      drawBackground();
    },

    drawPath (dance, energy, acoustic, valence) {
      _drawPath (dance, energy, acoustic, valence);
    }

  }
})();

export default CHARTController;