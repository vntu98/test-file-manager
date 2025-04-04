<template>
  <div>
    <div 
      class="folder-row" 
      :class="{ 'active': isActive }"
      @click="selectFolder(folder.id)"
    >
      <span class="expand-icon" @click.stop="toggleExpanded">
        {{ isExpanded ? '▼' : '►' }}
      </span>
      <span class="folder-icon">📁</span>
      <span class="folder-name">{{ folder.name }}</span>
      <span class="folder-count" v-if="fileCount > 0">{{ fileCount }}</span>
    </div>
    <ul v-if="isExpanded && folder.children && folder.children.length" class="subfolder-list">
      <li v-for="child in folderChildren" :key="child.id" class="folder-item">
        <FolderTreeItem 
          :folder="child" 
          :currentFolder="currentFolder"
          @folderSelected="$emit('folderSelected', $event)" 
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FolderTreeItem',
  props: {
    folder: {
      type: Object,
      required: true
    },
    currentFolder: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isExpanded: this.folder.id === 1
    }
  },
  computed: {
    isActive() {
      return this.folder.id === this.currentFolder;
    },
    folderChildren() {
      return this.folder.children ? this.folder.children.filter(child => child.children) : [];
    },
    fileCount() {
      return this.folder.children ? this.folder.children.filter(child => !child.children).length : 0;
    }
  },
  methods: {
    toggleExpanded(event) {
      this.isExpanded = !this.isExpanded;
      event.stopPropagation();
    },
    selectFolder(id) {
      this.$emit('folderSelected', id);
    }
  },
  watch: {
    currentFolder(newVal) {
      if (newVal === this.folder.id && !this.isExpanded) {
        this.isExpanded = true;
      }
    }
  }
}
</script>

<style scoped>
.folder-row {
  display: flex;
  align-items: center;
  padding: 8px 5px;
  border-radius: 4px;
  cursor: pointer;
}

.folder-row:hover {
  background-color: #f5f5f5;
}

.folder-row.active {
  background-color: #e3f2fd;
}

.expand-icon {
  margin-right: 5px;
  font-size: 12px;
  width: 12px;
  cursor: pointer;
}

.folder-icon {
  margin-right: 8px;
}

.folder-name {
  flex: 1;
}

.folder-count {
  background-color: #e0e0e0;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.subfolder-list {
  list-style: none;
  padding-left: 25px;
  margin: 0;
}
</style>