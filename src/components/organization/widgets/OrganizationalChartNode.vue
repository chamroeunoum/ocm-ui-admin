<template>
    <div class="node">
      <div class="node-content">
        <h3>{{ node.name }}</h3>
        <p>{{ node.title }}</p>
      </div>
      <div v-if="node.children" class="children">
        <OrganizationalChartNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    node: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .node {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 20px;
  }
  
  .node-content {
    border: 2px solid #42b883;
    border-radius: 8px;
    padding: 10px;
    background: white;
    text-align: center;
    min-width: 160px;
  }
  
  .children {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;
    position: relative;
  }
  
  /* Connector lines */
  .children::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    width: 2px;
    height: 20px;
    background: #42b883;
  }
  
  .node:not(:only-child)::after {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    width: 2px;
    height: 20px;
    background: #42b883;
  }
  </style>