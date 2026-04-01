<template>
    <div class="fan-container">
      <canvas ref="fanCanvas" :width="width" :height="height"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AnimatedFan',
    data() {
      return {
        width: 300,
        height: 300,
        rotation: 0,
        animationFrame: null,
        centerX: 150,
        centerY: 150,
        bladeCount: 2,
        speed: 0.05
      }
    },
    mounted() {
      this.initCanvas();
      this.startAnimation();
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      cancelAnimationFrame(this.animationFrame);
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      initCanvas() {
        this.canvas = this.$refs.fanCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
      },
      startAnimation() {
        const animate = () => {
          this.rotation += this.speed;
          this.drawFan();
          this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
      },
      drawFan() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw fan body
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 40, 0, Math.PI * 2);
        this.ctx.fillStyle = '#666';
        this.ctx.fill();
  
        // Draw rotating blades
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.rotation);
  
        for (let i = 0; i < this.bladeCount; i++) {
          this.ctx.rotate((Math.PI * 2) / this.bladeCount);
          this.drawBlade();
        }
  
        this.ctx.restore();
      },
      drawBlade() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -100);
        this.ctx.arc(0, -100, 20, Math.PI, 0);
        this.ctx.lineTo(0, 0);
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fill();
      },
      handleResize() {
        this.width = this.$el.clientWidth;
        this.height = this.$el.clientHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.initCanvas();
      }
    }
  }
  </script>
  
  <style scoped>
  .fan-container {
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 20px;
    display: inline-block;
  }
  
  canvas {
    border: 2px solid #333;
    border-radius: 4px;
  }
  </style>