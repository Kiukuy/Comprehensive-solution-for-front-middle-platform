<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import {
  Field as VeeField,
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import {
  validateUsername,
  validatePassowrd,
  validateConfirmPassword
} from '../validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constants'

const router = useRouter()
const store = useStore()

// 跳转到登录界面
const onToLogin = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

// 数据源
const regForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

/**
 * 插入规则
 */
defineRule('validateConfirmPassword', validateConfirmPassword)

// loading
const loading = ref(false)

/**
 * 触发注册
 */
const onRegister = async () => {
  loading.value = true
  try {
    const payload = {
      username: regForm.value.username,
      password: regForm.value.password
    }
    // 触发注册
    await store.dispatch('user/register', payload)
    // 注册成功，触发登录
    await store.dispatch('user/login', {
      ...payload,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
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
      <vee-form @submit="onRegister">
        <!-- 用户名 -->
        <vee-field
          class="border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base dark:bg-zinc-800 dark:text-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          placeholder="用户名"
          type="text"
          autocomplete="on"
          :rules="validateUsername"
          v-model="regForm.username"
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
          v-model="regForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <!-- 确认密码 -->
        <vee-field
          class="border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base dark:bg-zinc-800 dark:text-zinc-400 focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="confirmPassword"
          placeholder="确认密码"
          type="password"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="regForm.confirmPassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        ></vee-error-message>
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            @click="onToLogin"
          >
            去登录
          </a>
        </div>
        <div class="text-center">
          <a
            href="https://m.imooc.com/newfaq?id=89"
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300"
            target="__blank"
          >
            注册即同意《慕课网注册协议》
          </a>
        </div>
        <!-- 注册按钮 -->
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnim="false"
          :loading="loading"
        >
          立即注册
        </m-button>
      </vee-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
