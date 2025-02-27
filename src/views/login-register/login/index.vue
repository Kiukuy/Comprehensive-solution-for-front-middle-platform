<script>
export default {
  name: 'login'
}
</script>

<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import {
  Field as VeeField,
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassowrd } from '../validate'
import SliderCaptchaVue from './slider-captcha.vue'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from '@/libs'
import qqLoginVue from './qq-login.vue'

const store = useStore()
const router = useRouter()

// 控制 sliderCaptcha 展示
const isSliderCaptchaVisible = ref(false)

/**
 * 登录触发
 */
const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true
}

/**
 * 人类行为验证通过
 */
const onCaptchaSuccess = () => {
  isSliderCaptchaVisible.value = false
  // 登录操作
  onLogin()
}

// 用户输入的用户名和密码
const loginForm = ref({
  username: '',
  password: ''
})

// 登录时的 loading
const loading = ref(false)
/**
 * 用户登录行为
 */
const onLogin = async () => {
  loading.value = true
  // 执行登录操作
  try {
    await store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
    router.push('/')
  } catch (error) {
    message('warn', error.message)
  } finally {
    loading.value = false
  }
}

// 跳转到注册界面
const onToRegister = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/register')
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
        <!-- 用户名 -->
        <vee-field
          class="border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base dark:bg-zinc-800 dark:text-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          placeholder="用户名"
          type="text"
          autocomplete="on"
          :rules="validateUsername"
          v-model="loginForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        ></vee-error-message>
        <!-- 密码 -->
        <vee-field
          class="border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base dark:bg-zinc-800 dark:text-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          placeholder="密码"
          type="password"
          autocomplete="on"
          :rules="validatePassowrd"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            @click="onToRegister"
          >
            去注册
          </a>
        </div>
        <!-- 登录按钮 -->
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnim="false"
          :loading="loading"
        >
          登录
        </m-button>
      </vee-form>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <qq-login-vue></qq-login-vue>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
    <!-- 人类行为验证模块 -->
    <slider-captcha-vue
      v-if="isSliderCaptchaVisible"
      @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"
    ></slider-captcha-vue>
  </div>
</template>

<style lang="scss" scoped></style>
