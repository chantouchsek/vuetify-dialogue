import Vuedl from 'vuedl/src/index'
import DialogLayout from './components/DialogLayout.vue'
import Confirm from './components/Confirm.vue'
import Toast from './components/Toast.vue'
import Alert from './components/Alert.vue'
import SnackbarLayout from './components/SnackbarLayout.vue'
import Prompt from './components/Prompt.vue'
import Loading from './components/Loading.vue'
import DialogActions from './components/DialogActions.vue'
import DialogCard from './components/DialogCard.vue'
import NotificationLayout from 'vuedl/src/components/NotificationLayout.vue'
import defu from 'defu'

function getTranslate (i18n, property, key) {
  if (typeof i18n === 'undefined') {
    return key
  }
  return i18n.te(`${property}.${key}`) ? i18n.t(`${property}.${key}`) : key
}

function install (Vue, options = {}) {
  if (install.installed) return
  install.installed = true
  if (!options.container) {
    options.container = '[data-app=true]'
  }
  const property = options.property || '$dialog'
  const { i18n } = options.context || {}
  const cancelText = getTranslate(i18n, property, 'cancel')
  const okText = getTranslate(i18n, property, 'ok')
  const actionsFn = defu(options.actions, {
    false: cancelText,
    true: {
      text: okText,
      color: 'primary'
    }
  })
  const actionOptions = options.actionOptions || { flat: false }
  Vue.use(Vuedl, options)
  const manager = Vue.prototype[property]
  manager.layout('default', DialogLayout)
  manager.layout('snackbar', SnackbarLayout)
  manager.layout('notification', NotificationLayout)
  Vue.component('DialogActions', DialogActions)
  Vue.component('DialogCard', DialogCard)
  Vue.component('dialog-actions', DialogActions)
  Vue.component('dialog-card', DialogCard)
  manager.component('confirm', Confirm, defu(options.confirm, {
    i18n,
    actionOptions,
    actions: actionsFn,
    waitForResult: true
  }))
  manager.component('warning', Confirm, defu(options.warning, {
    i18n,
    type: 'warning',
    waitForResult: true,
    actions: actionsFn,
    actionOptions: actionOptions
  }))
  manager.component('error', Confirm, defu(options.error, {
    i18n,
    type: 'error',
    waitForResult: true,
    actions: ['Close'],
    actionOptions: actionOptions
  }))
  manager.component('info', Confirm, defu(options.info, {
    i18n,
    type: 'info',
    waitForResult: true,
    actions: ['Ok'],
    actionOptions: actionOptions
  }))
  manager.component('toast', Toast, defu(options.toast, {
    i18n,
    waitForResult: true,
    actionOptions: actionOptions
  }))
  manager.component('loading', Loading, defu(options.loading, { i18n, waitForResult: false }))
  manager.withLoading = function (options, callback) {
    return manager.loading(options).then(dlg => {
      callback()
        .then(res => {
          dlg.close()
          return res
        })
        .catch(e => {
          dlg.close()
          throw e
        })
    })
  }
  manager.message = {
    info: (message, options) => manager.toast({ text: message, color: 'info', ...options }),
    error: (message, options) => manager.toast({ text: message, color: 'error', ...options }),
    success: (message, options) => manager.toast({ text: message, color: 'success', ...options }),
    warning: (message, options) => manager.toast({ text: message, color: 'warning', ...options })
  }
  manager.component('notification', Alert, defu(options.notification, { i18n, waitForResult: true }))
  manager.notify = {
    info: (message, options) => manager.notification({ text: message, color: 'info', ...options }),
    error: (message, options) => manager.notification({ text: message, color: 'error', ...options }),
    success: (message, options) => manager.notification({ text: message, color: 'success', ...options }),
    warning: (message, options) => manager.notification({ text: message, color: 'warning', ...options })
  }

  manager.component('prompt', Prompt, defu(options.prompt, {
    i18n,
    waitForResult: true,
    actions: actionsFn
  }))
}

const Plugin = { install }

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}

export default Plugin
