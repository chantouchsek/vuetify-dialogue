export default {
  props: {
    i18n: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    hasI18n () {
      return typeof this.i18n !== 'undefined'
    }
  },
  methods: {
    getTranslate (text) {
      if (this.hasI18n && text) {
        return this.i18n.te(text) ? this.i18n.t(text) : text
      }
      return text
    }
  }
}
