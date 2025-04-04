<template>
  <div class="file-item">
    <div class="file-checkbox">
      <input type="checkbox" :id="'file-' + file.id" />
    </div>
    <div class="file-thumbnail">
      <img :src="file.url" :alt="file.name" />
    </div>
    <div class="file-details">
      <div class="file-name">{{ file.name }}</div>
      <div class="file-dimension">{{ file.dimmension }}</div>
      <div class="file-size">{{ formatFileSize(file.size) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileItem',
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatFileSize(sizeInBytes) {
      const bytes = parseInt(sizeInBytes);
      if (bytes < 1024) return bytes + ' B';
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      else return (bytes / 1048576).toFixed(1) + ' MB';
    }
  }
}
</script>

<style scoped>
.file-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.file-checkbox {
  margin-right: 15px;
}

.file-thumbnail {
  width: 240px;
  height: 80px;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 5px;
}

.file-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-details {
  display: flex;
  flex: 1;
  align-items: center;
}

.file-name {
  flex: 1;
  font-weight: 500;
}

.file-dimension, .file-size {
  width: 150px;
  text-align: right;
  color: #666;
}
</style>