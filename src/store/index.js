import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileStructure: [],
    currentFolder: null,
    searchQuery: '',
    selectedMembers: ['Admin'],
    totalStorage: 2 * 1024 * 1024
  },
  mutations: {
    setFileStructure(state, data) {
      state.fileStructure = data;
    },
    setCurrentFolder(state, folderId) {
      state.currentFolder = folderId;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    toggleMember(state, member) {
      if (state.selectedMembers.includes(member)) {
        state.selectedMembers = state.selectedMembers.filter(m => m !== member);
      } else {
        state.selectedMembers.push(member);
      }
    },
    selectAllMembers(state, members) {
      state.selectedMembers = [...members];
    },
    clearMemberSelection(state) {
      state.selectedMembers = [];
    }
  },
  getters: {
    allFiles(state) {
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
      traverseStructure(state.fileStructure);
      return files;
    },
    
    allFolders(state) {
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
      traverseStructure(state.fileStructure);
      return folders;
    },
    
    currentFolderData(state, getters) {
      if (!state.currentFolder) return null;
      return getters.allFolders.find(f => f.id === state.currentFolder);
    },
    
    currentFolderFiles(state, getters) {
      if (!state.currentFolder) return getters.allFiles;
      
      const folder = getters.currentFolderData;
      if (!folder || !folder.children) return [];
      
      return folder.children.filter(item => !item.children);
    },
    
    filteredFiles(state, getters) {
      let files = getters.currentFolderFiles;
      
      if (state.selectedMembers.length > 0) {
        files = files.filter(file => 
          state.selectedMembers.includes(file.photo_by)
        );
      }
      
      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase();
        files = files.filter(file => 
          file.name.toLowerCase().includes(query)
        );
      }
      
      return files;
    },
    
    allMembers(state, getters) {
      const members = new Set();
      getters.allFiles.forEach(file => {
        if (file.photo_by) {
          members.add(file.photo_by);
        }
      });
      return Array.from(members);
    },
    
    usedStorage(state, getters) {
      return getters.allFiles.reduce((total, file) => {
        return total + (parseInt(file.size) || 0);
      }, 0);
    },
    
    storagePercentage(state, getters) {
      return Math.round((getters.usedStorage / state.totalStorage) * 100);
    }
  }
});