<template>
  <v-alert
    style="margin: 0; min-width: 300px"
    @input="$emit('submit')"
    :dismissible="dismissible"
    :type="color"
    :icon="getIcon"
    :outlined="outlined"
    :prominent="prominent"
    :text="flat"
    :border="border"
    :tile="getTitle"
    :dense="dense"
    :colored-border="coloredBorder"
  >
    <div class="d-flex align-center">
      <div class="mr-2" v-html="getText" />
      <dialog-actions :actions="actions" />
    </div>
  </v-alert>
</template>
<script>

import DialogActions from './DialogActions.vue'
import Iconable from '../mixins/iconable'
import Translatable from '../mixins/translatable'
import { VAlert } from 'vuetify/lib'

export default {
  components: { DialogActions, VAlert },
  mixins: [Iconable, Translatable],
  layout: ['notification', { showClose: false }],
  props: {
    color: {
      type: String,
      default: 'info'
    },
    actions: {
      type: [Array, Object],
      default: () => ({})
    },
    text: {
      type: [String, Function],
      default: ''
    },
    outlined: Boolean,
    prominent: Boolean,
    dismissible: {
      type: Boolean,
      default: true
    },
    flat: Boolean,
    border: String,
    tile: Boolean,
    dense: Boolean,
    coloredBorder: Boolean
  },
  computed: {
    getText () {
      if (typeof this.text !== 'function') {
        return this.getTranslate(this.text)
      }
      return typeof this.text === 'function' ? this.text() : this.text
    },
    getTitle () {
      return this.getTranslate(this.title)
    }
  }
}
</script>
