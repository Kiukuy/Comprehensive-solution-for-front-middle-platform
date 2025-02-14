/**
 * 全局注册指令
 */
export default {
  install(app) {
    // vite 5 之前使用 const directives = import.meta.globEager('./modules/*.js')
    // https://cn.vitejs.dev/guide/features#glob-import
    // import.meta.glob('./dir/*.js', { eager: true }) 为同步导入
    const directives = import.meta.glob('./modules/*.js', { eager: true })
    for (const [key, value] of Object.entries(directives)) {
      // 拼接组件注册的 name
      const arr = key.split('/')
      const directiveName = arr[arr.length - 1].replace('.js', '')
      // 完成注册
      app.directive(directiveName, value.default)
    }
  }
}
