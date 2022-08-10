// With the help of Zevan's canvas tutorial vidss https://codepen.io/ZevanRosser 

window.onload = function() {

    var canvas = document.createElement("canvas"),
      c = canvas.getContext("2d"),
      particles = {},
      particleIndex = 0;
    particleNum = 10;
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    document.body.appendChild(canvas);
  
    function Particle() {
      this.x = canvas.width / 12;
      this.y = canvas.height / 12;
      this.vx = Math.random() * 1000;
      this.vy = Math.random() * 1000;
      this.gravity = 0.3;
      particleIndex++;
      particles[particleIndex] = this;
      this.id = particleIndex;
      this.life = 0;
      this.maxLife = Math.random() * 50 + 50;
    }
  
    Particle.prototype.draw = function() {
      this.x += this.vx;
      this.y += this.vy;
  
      if (Math.random() < 0.1) {
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
      }
  
      this.life++;
      if (this.life >= this.maxLife) {
        delete particles[this.id];
      }
      c.fillStyle = "rgba(255,255,255,1)";
      c.fillRect(this.x, this.y, 10, 10);
    };
  
    setInterval(function() {
      c.globalCompositeOperation = "source-over";
      c.fillStyle = "rgba(0,0,0,0.2)";
      c.fillRect(0, 0, canvas.width, canvas.height);
  
      for (var i = 0; i < particleNum; i++) {
        new Particle();
      }
      c.globalCompositeOperation = "lighter";
      for (var i in particles) {
        particles[i].draw();
      }
    }, 30);
  
  };