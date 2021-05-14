<template>
    <div>
        <!-- Label -->
        <InputLabel :label="label"  :name="name" v-if="label" />

        <!-- Input -->
        <div class="flex items-center relative">
          <div v-if="string_before" class="bg-gray-300 py-3 px-4 flex items-center border-2 border-gray-300 rounded-l-lg border-r">
            {{string_before}}
          </div>
            <input :class="{'border-red-500': error, 'pr-10': icon && right, 'pl-12': icon && !right, 'rounded-r-lg':string_before, 'rounded-lg': !string_before}"
                    :name="name"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 focus:border-viridiant-600 border-2 border-gray-200 py-3 px-4 focus:outline-none focus:bg-white"
                    :id="name"
                    :type="type"
                    :placeholder="placeholder"
                    :value="modelValue"
                    :autocomplete="_autocmoplete"
                    @input="onInput">
            <i v-if="icon !== '' && right == false"
                :data-feather="icon"
                class="absolute left-3 block"></i>
            <i v-if="icon !== '' && right == true"
                :data-feather="icon"
                class="absolute right-3 block"></i>
        </div>

        <!-- Indications -->
        <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
        <p v-if="indication" class="text-gray-600 text-xs italic">{{ indication }}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import InputLabel from './InputLabel.vue';

export default defineComponent({
    components: {
        InputLabel,
    },
    emits: ['update:modelValue'],
    props: {
        label: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        error: {
            type: String,
            default: ""
        },
        indication: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        modelValue: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        },
        right: {
            type: Boolean,
            default: false
        },
        autocomplete: {
            type: Boolean,
            default : false
        },
        string_before: {
          type: String,
          default : ""
        },
    },
    computed: {
        _autocmoplete: function() {
            if (this.autocomplete) {
                return "on";
            }
            return "off";
        }
    },
    methods: {
        onInput(event: InputEvent) {
            this.$emit('update:modelValue', this.string_before + (event.target as HTMLInputElement).value)
        }
    }
})
</script>
