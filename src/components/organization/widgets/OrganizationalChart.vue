<template>
    <div class="org-chart">
      <OrganizationalChartNode :node="treeData" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import OrganizationalChartNode from './OrganizationalChartNode.vue';
  
  const props = defineProps({
    treeData: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .org-chart {
    padding: 20px;
    overflow-x: auto;
  }
  </style>