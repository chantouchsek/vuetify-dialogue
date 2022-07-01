<template>
  <v-card-actions v-if="actionlist && Object.keys(actionlist).length">
    <v-spacer v-if="!actions.spacer" />
    <template v-for="action in actionlist">
      <v-spacer
        v-if="action.key === 'spacer'"
        :key="action.key"
      />
      <dialog-action
        v-else
        :key="action.key"
        v-bind="getActionProps(action)"
        :action-key="''+action.key"
        :loading="!passive && isActionInLoading(action)"
        :class="{'loading': loadingAction === action.key}"
        :disabled="isActionDisabled(action) || (!passive && Boolean(loadingAction))"
        @click="onActionClick(action)"
      />
    </template>
  </v-card-actions>
</template>

<script>
import Actionable from 'vuedl/src/mixins/actionable'
import Translatable from '../mixins/translatable'
import DialogAction from './DialogAction.vue'
import { VSpacer, VCardActions } from 'vuetify/lib'

export default {
  components: { DialogAction, VSpacer, VCardActions },
  mixins: [Actionable, Translatable],
  props: {
    component: [String, Object],
    color: String,
    flat: Boolean,
    rounded: Boolean,
    outlined: Boolean,
    depressed: Boolean,
    elevation: [Number, String],
    passive: Boolean,
    block: Boolean,
    large: Boolean,
    small: Boolean
  },
  computed: {
    nestedProps () {
      return [
        'color',
        'flat',
        'rounded',
        'outlined',
        'depressed',
        'elevation',
        'icon',
        'block',
        'small',
        'large',
        'x-small',
        'x-large'
      ]
    }
  },
  methods: {
    getActionProps (action) {
      const res = {
        component: action.component || this.component,
        text: this.getTranslate(action.text)
      }
      this.nestedProps.forEach(key => {
        if (action[key] || this[key]) {
          res[key] = action[key] === undefined ? this[key] : action[key]
        }
      })
      return res
    }
  }
}
</script>
