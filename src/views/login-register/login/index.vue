<script>
export default {
  name: 'login'
}
</script>

<script setup>
import {} from 'vue'
import headerVue from '../components/header.vue'
import {
  Field as VeeField,
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassowrd } from '../validate'

/**
 * 登录触发
 */
const onLoginHandler = () => {
  console.log('触发登录')
}
</script>

<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <header-vue></header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onLoginHandler">
        <vee-field
          class="border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base dark:bg-zinc-800 dark:text-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          placeholder="用户名"
          type="text"
          autocomplete="on"
          :rules="validateUsername"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        ></vee-error-message>
        <vee-field
          class="border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base dark:bg-zinc-800 dark:text-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          placeholder="密码"
          type="password"
          autocomplete="on"
          :rules="validatePassowrd"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
          >
            去注册
          </a>
        </div>
        <!-- 登录按钮 -->
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnim="false"
        >
          登录
        </m-button>
      </vee-form>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
