<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'
import { useStore } from 'vuex'

const store = useStore()
const inputValue = ref('')

// 搜索的回调事件
const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    // 触发 historys 变化
    store.commit('search/addHistory', val)
    // 触发 searchText 变化
    store.commit('app/changeSearchText', val)
  }
}
</script>

<template>
  <div class="guide-search w-full">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            :searchText="inputValue"
            v-show="inputValue"
            @itemClick="onSearchHandler"
          ></hint-vue>
          <!-- 最近搜索 -->
          <history-vue
            v-show="!inputValue"
            @itemClick="onSearchHandler"
          ></history-vue>
          <!-- 推荐主题 -->
          <theme-vue v-show="!inputValue"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<style lang="scss" scoped></style>
