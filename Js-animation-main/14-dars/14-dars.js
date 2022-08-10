var  canvas = document.getElementById('watch');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#28d1fa';
ctx.lineWidth = '17';
ctx.lineCap = 'round';
ctx.shadowColor = '#28d1fa';
ctx.shadowBlur = '15';

function degToRad(degree) {
  var factor = Math.PI/180;
  return degree*factor;
}

function rendertime() {
  
  var now =  new Date();
  var today = now.toDateString();
  var time = now.toLocaleTimeString();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var milliseconds = now.getMilliseconds();
  var newSeconds = seconds+ (milliseconds/1000); 
  
  //background
  
  ctx.fillStyle = '#333333';
  ctx.fillRect(0, 0, 500, 500);
  
  //hours
  ctx.beginPath();
  // if(hours )
  ctx.arc(250, 250, 200, degToRad(270), degToRad((hours*15)-90));
  ctx.stroke();
  //minutes 
  ctx.beginPath();
  ctx.arc(250, 250, 170, degToRad(270), degToRad((minutes*6)-90));
  ctx.stroke();
  //seconds
  ctx.beginPath();
  ctx.arc(250, 250, 140, degToRad(270), degToRad((newSeconds*6)-90));
  ctx.stroke();
  
  // Date
  ctx.font = '25px Arial';
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(today, 160, 250);
  // time
  ctx.font = '25px Arial';
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(time, 190, 280);
  //convert into image
//   var dataUrl = canvas.toDataURL();
//   document.getElementById('watchimg').src = dataUrl;
  
}
setInterval(rendertime, 40);
