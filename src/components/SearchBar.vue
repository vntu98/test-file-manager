<template>
  <div class="search-container">
    <div class="search-header">Search</div>
    <div class="search-box">
      <input 
        type="text" 
        placeholder="e.g. image.png" 
        v-model="searchQuery" 
        @input="onSearchInput" 
      />
      <button class="search-btn">
        <i class="search-icon">🔍</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    onSearchInput() {
      this.$emit('search', this.searchQuery);
    }
  }
}
</script>

<style scoped>
.search-container {
  margin: 20px 0;
}

.search-header {
  font-weight: 500;
  margin-bottom: 10px;
}

.search-box {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.search-box input {
  flex: 1;
  padding: 10px 15px;
  border: none;
  outline: none;
  font-size: 14px;
}

.search-btn {
  background: none;
  border: none;
  padding: 0 15px;
  cursor: pointer;
  color: #666;
}
</style>