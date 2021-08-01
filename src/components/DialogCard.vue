<template>
  <v-card
    :flat="flat"
    :class="{'v-inner-scroll': innerScroll }"
  >
    <slot name="title">
      <v-card-title
        v-if="title"
        :class="titleClass"
      >
        {{ title }}
      </v-card-title>
    </slot>
    <v-card-text>
      <slot />
    </v-card-text>
    <dialog-actions
      v-if="actions"
      ref="actions"
      :actions="actions"
      v-bind="getDialogOptions"
      :handler="handler"
    />
    <slot name="footer" />
  </v-card>
</template>

<script>
import DialogActions from './DialogActions.vue'
import { VCard, VCardTitle, VCardText } from 'vuetify/lib'
import Translatable from '../mixins/translatable'
import defu from 'defu'

export default {
  inheritAttrs: false,
  mixins: [Translatable],
  components: {
    DialogActions,
    VCard,
    VCardTitle,
    VCardText
  },
  props: {
    title: String,
    flat: Boolean,
    innerScroll: Boolean,
    titleClass: [String, Object],
    actions: [Array, Object, Function],
    actionOptions: {
      type: Object,
      default: () => ({
        flat: true
      })
    },
    handler: Function
  },
  computed: {
    getDialogOptions () {
      const actionOptions = this.actionOptions || {}
      return defu({ i18n: this.i18n }, actionOptions)
    }
  },
  methods: {
    trigger (name) {
      this.$refs.actions && this.$refs.actions.trigger(name)
    }
  }
}
</script>
<style lang="scss">
  .v-dialog:not(.v-dialog--fullscreen) {
    .v-card.v-inner-scroll {
      .v-card__text {
        max-height: 70vh;
      }
    }
  }
  .v-card.v-inner-scroll {
    .v-card__text {
      overflow: auto;
      background:
        linear-gradient(white 30%, hsla(0,0%,100%, 0)),
        linear-gradient(hsla(0,0%,100%,0) 10px, white 70%) bottom,
        radial-gradient(at top, rgba(0,0,0,0.2), transparent 70%),
        radial-gradient(at bottom, rgba(0,0,0,0.2), transparent 70%) bottom;
      background-repeat:no-repeat;
      background-size: 100% 30px, 100% 30px, 100% 10px, 100% 10px;
      background-attachment:local, local, scroll, scroll;
    }
  }
  .theme--dark.v-inner-scroll {
    .v-card__text {
      background:
        linear-gradient(#1d1d1d 30%, rgba(255, 255, 255, 0)),
        linear-gradient(hsla(0,0%,100%,0) 10px, #1d1d1d 70%) bottom,
        radial-gradient(at top, rgba(255, 255, 255, 0.2), transparent 70%),
        radial-gradient(at bottom, rgba(255, 253, 253, 0.2), transparent 70%) bottom;
      background-repeat:no-repeat;
      background-size: 100% 30px, 100% 30px, 100% 10px, 100% 10px;
      background-attachment:local, local, scroll, scroll;
    }
  }
</style>
