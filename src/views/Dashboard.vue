<template>
  <div class="dashboard">
    <div class="sidebar">
      <button class="import-btn">Import documents</button>
      <StorageIndicator :usedPercentage="storagePercentage" :total="2" />
      <SearchBar @search="onSearch" />
      <FolderTree 
        ref="folderTree"
        :folders="fileStructure" 
        :currentFolder="currentFolder"
        @folderSelected="selectFolder" 
      />
      <div class="members-section">
        <div class="section-header">
          <span>Members</span>
          <a href="#" class="select-all" @click.prevent="toggleAllMembers">
            {{ allMembersSelected ? 'Deselect all' : 'Select all' }}
          </a>
        </div>
        <div class="member-options">
          <div class="member-option" v-for="member in allMembers" :key="member">
            <input 
              type="checkbox" 
              :id="'member-' + member" 
              :checked="selectedMembers.includes(member)"
              @change="toggleMember(member)" 
            />
            <label :for="'member-' + member">{{ member }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="file-header">
        <div class="file-select">
          <input type="checkbox" id="select-all-files" />
          <label for="select-all-files">Select all</label>
        </div>
        <div class="file-headers">
          <div class="header name">Name</div>
          <div class="header dimension">Dimmension</div>
          <div class="header size">Size</div>
        </div>
      </div>
      <FileList :files="filteredFiles" />
    </div>
  </div>
</template>

<script>
import StorageIndicator from '../components/StorageIndicator.vue';
import SearchBar from '../components/SearchBar.vue';
import FolderTree from '../components/FolderTree.vue';
import FileList from '../components/FileList.vue';

export default {
  name: 'FileDashboard',
  components: {
    StorageIndicator,
    SearchBar,
    FolderTree,
    FileList
  },
  data() {
    return {
      fileStructure: [
        {
          "id": 1,
          "name": "Uploads",
          "children": [
            {
              "id": 10,
              "name": "Images",
              "children": [
                {
                  "id": 101,
                  "name": "Seasandiego.jpg",
                  "url": "https://assets.site-static.com/userFiles/2597/image/2023/CARDIFF_BY_THE_SEA/5-23-2023_1__reasons-why-cardiff-by-the-sea-san-diego-great-place-to-live/9_Reasons_Why_Cardiff-by-the-Sea_San_Diego_.jpg",
                  "type": "image/jpg",
                  "dimmension": "2000x2000",
                  "size": "763300",
                  "photo_by": "Admin"
                },
                {
                  "id": 102,
                  "name": "iMactwin.png",
                  "url": "https://i.insider.com/60e4cb0d22d19400191c957c?width=1000&format=jpeg&auto=webp",
                  "type": "image/png",
                  "dimmension": "2000x2000",
                  "size": "640200",
                  "photo_by": "Apple"
                },
                {
                  "id": 103,
                  "name": "hustlecup.jpg",
                  "url": "https://images.deliveryhero.io/image/fd-ph/LH/kmph-hero.jpg",
                  "type": "image/jpg",
                  "dimmension": "2000x2000",
                  "size": "100400",
                  "photo_by": "Admin"
                },
                {
                  "id": 104,
                  "name": "MS-Surface.jpg",
                  "url": "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OXzi?ver=3a58",
                  "type": "image/jpg",
                  "dimmension": "2000x2000",
                  "size": "113200",
                  "photo_by": "Admin"
                },
                {
                  "id": 105,
                  "name": "Famoustower.jpg",
                  "url": "https://www.worldfamousthings.com/wp-content/uploads/2018/01/Leaning-Tower-of-Pisa-Italy.jpg",
                  "type": "image/jpg",
                  "dimmension": "2000x2000",
                  "size": "547200",
                  "photo_by": "Admin"
                }
              ]
            },
            {
              "id": 20,
              "name": "Document",
              "children": []
            },
            {
              "id": 30,
              "name": "Videos",
              "children": [
                {
                  "id": 301,
                  "name": "GODZILLA MINUS ONE Official Trailer",
                  "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019",
                  "type": "video/mp4",
                  "dimmension": "2000x2000",
                  "size": "763300",
                  "photo_by": "Admin"
                },
                {
                  "id": 302,
                  "name": "Marvel Studios' Loki Season 2 | October 6 on Disney+",
                  "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019",
                  "type": "video/mp4",
                  "dimmension": "2000x2000",
                  "size": "763300",
                  "photo_by": "Admin"
                },
                {
                  "id": 303,
                  "name": "THE BOY AND THE HERON | Official Teaser Trailer",
                  "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019",
                  "type": "video/mp4",
                  "dimmension": "2000x2000",
                  "size": "763300",
                  "photo_by": "Admin"
                }
              ]
            }
          ]
        },
        {
          "id": 2,
          "name": "Sources",
          "children": []
        },
        {
          "id": 3,
          "name": "Shared",
          "children": []
        }
      ],
      currentFolder: 1,
      searchQuery: '',
      selectedMembers: ['Admin'],
      totalStorage: 5 * 1024 * 1024
    };
  },
  computed: {
    allFiles() {
      const files = [];
      const traverseStructure = (items) => {
        if (!items) return;
        items.forEach(item => {
          if (item.children) {
            traverseStructure(item.children);
          } else {
            files.push(item);
          }
        });
      };
      traverseStructure(this.fileStructure);
      return files;
    },
    
    allFolders() {
      const folders = [];
      const traverseStructure = (items) => {
        if (!items) return;
        items.forEach(item => {
          if (item.children) {
            folders.push(item);
            traverseStructure(item.children);
          }
        });
      };
      traverseStructure(this.fileStructure);
      return folders;
    },
    
    currentFolderData() {
      if (!this.currentFolder) return null;
      return this.allFolders.find(f => f.id === this.currentFolder);
    },
    
    currentFolderFiles() {
      if (!this.currentFolder) return this.allFiles;
      
      const folder = this.currentFolderData;
      if (!folder || !folder.children) return [];
      
      if (this.currentFolder === 1) {
        const files = [];
        const traverseFolder = (items) => {
          if (!items) return;
          items.forEach(item => {
            if (item.children) {
              traverseFolder(item.children);
            } else {
              files.push(item);
            }
          });
        };
        
        traverseFolder(folder.children);
        return files;
      }
      
      return folder.children.filter(item => !item.children);
    },
    
    filteredFiles() {
      let files = this.currentFolderFiles;
      
      if (this.selectedMembers.length > 0) {
        files = files.filter(file => 
          this.selectedMembers.includes(file.photo_by)
        );
      }
      
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        files = files.filter(file => 
          file.name.toLowerCase().includes(query)
        );
      }
      
      return files;
    },
    
    allMembers() {
      const members = new Set();
      this.allFiles.forEach(file => {
        if (file.photo_by) {
          members.add(file.photo_by);
        }
      });
      return Array.from(members);
    },
    
    usedStorage() {
      return this.allFiles.reduce((total, file) => {
        return total + (parseInt(file.size) || 0);
      }, 0);
    },
    
    storagePercentage() {
      return Math.round((this.usedStorage / this.totalStorage) * 100);
    },
    
    allMembersSelected() {
      return this.selectedMembers.length === this.allMembers.length;
    }
  },
  mounted() {
    this.$nextTick(() => {
      const folderTreeItemComponents = this.$refs.folderTree.$children;
      if (folderTreeItemComponents && folderTreeItemComponents.length > 0) {
        folderTreeItemComponents.forEach(component => {
          if (component.$props.folder && component.$props.folder.id === 1) {
            component.$children[0].isExpanded = true;
          }
        });
      }
    });
  },
  methods: {
    selectFolder(folderId) {
      this.currentFolder = folderId;
    },
    onSearch(query) {
      this.searchQuery = query;
    },
    toggleMember(member) {
      if (this.selectedMembers.includes(member)) {
        this.selectedMembers = this.selectedMembers.filter(m => m !== member);
      } else {
        this.selectedMembers.push(member);
      }
    },
    toggleAllMembers() {
      if (this.allMembersSelected) {
        this.selectedMembers = [];
      } else {
        this.selectedMembers = [...this.allMembers];
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 300px;
  padding: 20px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.import-btn {
  width: 100%;
  padding: 10px 0;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  font-weight: 500;
}

.select-all {
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.member-options {
  margin-top: 10px;
}

.member-option {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.member-option input[type="checkbox"] {
  margin-right: 10px;
}

.file-header {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.file-select {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.file-select input[type="checkbox"] {
  margin-right: 10px;
}

.file-headers {
  display: flex;
  flex: 1;
}

.header {
  font-weight: 500;
  color: #666;
}

.header.name {
  flex: 1;
}

.header.dimension, .header.size {
  width: 150px;
  text-align: right;
}

.members-section {
  margin-top: 20px;
}
</style>