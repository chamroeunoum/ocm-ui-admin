<template>
  <div class="org-chart-container">
    <canvas ref="canvas" @mousedown="startPan" @mousemove="pan" @mouseup="stopPan" @wheel="zoom" @click="handleClick" ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';

// Configuration
const NODE_WIDTH = 200;
const NODE_MARGIN = 50;
const NODE_HEIGHT = 60;
const VERTICAL_SPACING = 50;
const HORIZONTAL_SPACING = 50;

const props = defineProps({
  treeData: Object,
});

const canvas = ref(null);
let ctx = null;
let scale = 0.7;
let panning = false;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;
const nodes = ref([])

// Tree layout calculation
const calculateLayout = (node, depth = 0, positions = []) => {
  if (!positions[depth]) positions[depth] = [];
  console.log( depth )
  
  const x = positions[depth].length * (NODE_WIDTH + ( NODE_WIDTH ) + HORIZONTAL_SPACING);
  const y = depth * (NODE_HEIGHT + VERTICAL_SPACING);
  
  node.x = x;
  node.y = y;
  positions[depth].push(node);

  if (node.children) {
    node.children.forEach(child => calculateLayout(child, depth + 1, positions));
  }

  // Center parent above children
  if (node.children && node.children.length > 0) {
    const firstChild = node.children[0];
    const lastChild = node.children[node.children.length - 1];
    node.x = (firstChild.x + lastChild.x) / 2;
  }

  return positions.flat();
};

// Draw functions
const drawNode = (node) => {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // Node rectangle
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#42b883';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(node.x, node.y, NODE_WIDTH, NODE_HEIGHT, 8);
  ctx.fill();
  ctx.stroke();

  // Node text
  ctx.fillStyle = '#333';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(node.name, node.x + NODE_WIDTH/2, node.y + 25);
  ctx.fillText(node.title, node.x + NODE_WIDTH/2, node.y + 45);

  ctx.restore();
};

const drawConnector = (parent, child) => {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  ctx.beginPath();
  ctx.moveTo(parent.x + NODE_WIDTH/2, parent.y + NODE_HEIGHT);
  ctx.lineTo(child.x + NODE_WIDTH/2, child.y);
  ctx.strokeStyle = '#42b883';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
};

const drawConnectorRounded = (parent, child) => {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // Calculate positions
  const parentX = parent.x + NODE_WIDTH/2;
  const parentY = parent.y + NODE_HEIGHT;
  const childX = child.x + NODE_WIDTH/2;
  const childY = child.y;

  // Calculate control point for quadratic curve
  const controlY = parentY + (childY - parentY) * 0.8; // Adjust 0.8 for curve shape
  const controlX = parentX + (childX - parentX) * 0.5;

  // Draw curved line
  ctx.beginPath();
  ctx.moveTo(parentX, parentY);
  ctx.quadraticCurveTo(
    controlX,  // Control point X
    controlY,  // Control point Y
    childX,    // End point X
    childY     // End point Y
  );
  ctx.strokeStyle = '#42b883';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
};

const drawChart = () => {
  if (!canvas.value || !props.treeData) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.save();
  
  // Calculate layout
  nodes.value = calculateLayout(JSON.parse(JSON.stringify(props.treeData)));
  
  // Draw connections first
  nodes.value.forEach(node => {
    if (node.children) {
      node.children.forEach(child => {
        drawConnectorRounded(node, child);
      });
    }
  });

  // Draw nodes on top
  nodes.value.forEach(drawNode);

  ctx.restore();
};

// Pan/Zoom handlers
const startPan = (e) => {
  panning = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
};

const pan = (e) => {
  if (!panning) return;
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  drawChart();
};

const stopPan = () => {
  panning = false;
};

const zoom = (e) => {
  const delta = e.deltaY < 0 ? 1.1 : 0.9;
  scale *= delta;
  drawChart();
};

const handleClick = (e) => {
  const rect = canvas.value.getBoundingClientRect();
  const x = (e.clientX - rect.left - offsetX) / scale;
  const y = (e.clientY - rect.top - offsetY) / scale;

  nodes.value.forEach(node => {
    if (x > node.x && x < node.x + NODE_WIDTH &&
        y > node.y && y < node.y + NODE_HEIGHT) {
      console.log('Clicked node:', node);
    }
  });
};

const animateLayout = () => {
  // Implement smooth transitions using requestAnimationFrame
};

const exportToPNG = () => {
  const link = document.createElement('a');
  link.download = 'org-chart.png';
  link.href = canvas.value.toDataURL();
  link.click();
};

// Lifecycle hooks
onMounted(() => {
  ctx = canvas.value.getContext('2d');
  
  // Set canvas size
  const updateSize = () => {
    canvas.value.width = canvas.value.offsetWidth;
    canvas.value.height = canvas.value.offsetHeight;
    drawChart();
  };
  
  updateSize();
  window.addEventListener('resize', updateSize);
});

watchEffect(drawChart);
</script>

<style scoped>
.org-chart-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fff;
}

canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
}

canvas:active {
  cursor: grabbing;
}
</style>