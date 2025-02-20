<template>
  <!-- 头部图标：PC端 -->
  <div class="hidden pt-2 h-8 xl:block">
    <img
      v-lazy
      class="w-[388px] m-auto rounded-sm"
      src="@/assets/images/maqima.png"
      alt=""
    />
  </div>
  <!-- 头部图标：移动端 -->
  <div class="h-[111px] xl:hidden">
    <img v-lazy src="https://res.lgdsunday.club/login-bg.png" alt="" />
    <img
      v-lazy
      class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
      src="@/assets/images/SeeYouSquare.png"
      alt=""
    />
  </div>
</template>
