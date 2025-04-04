<template>
  <div class="storage-container">
    <div class="storage-header">Storage</div>
    <div class="storage-bar">
      <div class="storage-fill" :style="{ width: usedPercentage + '%' }"></div>
    </div>
    <div class="storage-info">{{ usedPercentage }}% used of {{ total }}GB</div>
    <div class="change-plan">
      <a href="#">Change plan</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StorageIndicator',
  props: {
    usedPercentage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.storage-container {
  margin: 20px 0;
}

.storage-header {
  font-weight: 500;
  margin-bottom: 10px;
}

.storage-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.storage-fill {
  height: 100%;
  background-color: #4285f4;
  border-radius: 4px;
}

.storage-info {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.change-plan {
  text-align: right;
  margin-top: 5px;
}

.change-plan a {
  font-size: 14px;
  color: #666;
  text-decoration: none;
}
</style>