//Moves the ball up or down
const changeBallPosition = (elem, propVal, easingVal, durationVal) => {
    Velocity(elem, {
      translateY: propVal
    }, {
      easing: easingVal,
      duration: durationVal
    });
  };
  
  //Brings about the squashed appearance of the ball
  //and resumes the ball's natural shape after hitting
  //the floor
  const changeBallWidth = (elem, propVal, easingVal, durationVal) => {
    Velocity(elem, {
      scaleX: propVal
    }, {
      easing: easingVal,
      duration: durationVal
    });
  };
  
  //Velocity calls inside a timer using the functions above
  let animationFrameID;
  
  const launchBall = (elem) => {
    changeBallPosition(elem, '130px', 'easeInQuart', 300);
    changeBallWidth(elem, 1.2, 'linear', 50);
    changeBallWidth(elem, 1, 'linear', 50);
    changeBallPosition(elem, '-10px', 'easeOutQuart', 300);
    changeBallWidth(elem, 1, 'linear', 50);
    animationFrameID =requestAnimationFrame( () => {
        launchBall(elem);
    });
     
  };
      
      /*() => {
        launchBall(elem);
      });*/
  
  const removeAnimFrame = () => {
    if (animationFrameID) {
      cancelAnimationFrame(animationFrameID);
    }
  }
  
  const ball = document.querySelector('.ball'),
    btnStop = document.querySelector('.btn-stop'),
    btnPlay = document.querySelector('.btn-play');
  
  btnPlay.addEventListener('click', function() {
    launchBall(ball);
    this.disabled = true;
    btnStop.disabled = false;
  });
  
  btnStop.addEventListener('click', function() {
    removeAnimFrame();
    Velocity(ball, 'stop', true);
    this.disabled = true;
    btnPlay.disabled = false;
  });