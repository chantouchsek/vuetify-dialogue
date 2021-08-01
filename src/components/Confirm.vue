<template>
  <v-card tile>
    <v-toolbar
      v-if="title"
      :dark="Boolean(getColor)"
      :color="getColor"
      dense
      flat
    >
      <v-icon
        v-if="Boolean(getIcon)"
        left
      >
        {{ getIcon }}
      </v-icon>
      <v-toolbar-title>{{ getTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text
      class="body-1 py-2"
      :class="{ 'pt-4': !title }"
      v-html="getText"
    />
    <dialog-actions
      :actions="actions"
      v-bind="getDialogOptions"
    />
  </v-card>
</template>

<script>
import Confirmable from 'vuedl/src/mixins/confirmable'
import Colorable from '../mixins/colorable'
import Iconable from '../mixins/iconable'
import Translatable from '../mixins/translatable'
import DialogActions from './DialogActions.vue'
import { VCard, VCardText, VToolbar, VToolbarTitle, VIcon } from 'vuetify/lib'
import defu from 'defu'

export default {
  components: {
    DialogActions,
    VCard,
    VCardText,
    VToolbar,
    VToolbarTitle,
    VIcon
  },
  layout: ['default', { width: 450 }],
  mixins: [Iconable, Confirmable, Colorable, Translatable],
  props: {
    actionOptions: Object
  },
  computed: {
    getDialogOptions () {
      return defu({ i18n: this.i18n }, ...this.actionOptions)
    },
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
