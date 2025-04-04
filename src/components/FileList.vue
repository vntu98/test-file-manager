<template>
  <div class="file-list">
    <div v-if="files.length === 0" class="no-files">
      Không có tệp nào để hiển thị
    </div>
    <FileItem 
      v-for="file in files" 
      :key="file.id" 
      :file="file" 
    />
  </div>
</template>

<script>
import FileItem from './FileItem.vue';

export default {
  name: 'FileList',
  components: {
    FileItem
  },
  props: {
    files: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.file-list {
  margin-top: 10px;
}
.no-files {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>