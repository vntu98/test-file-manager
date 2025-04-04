<template>
  <div class="folder-container">
    <div class="folder-header">Folders</div>
    <div class="folder-actions">
      <a href="#" class="new-folder">New folder</a>
    </div>
    <ul class="folder-tree">
      <li v-for="folder in folders" :key="folder.id" class="folder-item">
        <FolderTreeItem 
          :folder="folder" 
          :currentFolder="currentFolder"
          @folderSelected="onFolderSelected" 
        />
      </li>
    </ul>
  </div>
</template>

<script>
import FolderTreeItem from './FolderTreeItem.vue';

export default {
  name: 'FolderTree',
  components: {
    FolderTreeItem
  },
  props: {
    folders: {
      type: Array,
      required: true
    },
    currentFolder: {
      type: Number,
      default: null
    }
  },
  methods: {
    onFolderSelected(folderId) {
      this.$emit('folderSelected', folderId);
    }
  }
}
</script>

<style scoped>
.folder-container {
  margin: 20px 0;
}

.folder-header {
  font-weight: 500;
  margin-bottom: 10px;
}

.folder-actions {
  text-align: right;
  margin-bottom: 10px;
}

.new-folder {
  font-size: 14px;
  color: #666;
  text-decoration: none;
}

.folder-tree {
  list-style: none;
  padding: 0;
  margin: 0;
}

.folder-item {
  margin: 3px 0;
}
</style>