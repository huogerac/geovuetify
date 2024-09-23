<template>
  <div>
    <div>
      <div class="box legend"></div>
      <div
        class="box"
        v-for="box in $props.colors"
        :class="{ 'box-selected': box.value == $props.value }"
        :style="{ backgroundColor: box.color }"
      ></div>
      <div class="box legend"></div>
    </div>
    <div style="padding-top: 2px">
      <div class="box legend">Low</div>
      <div class="box" v-for="box in $props.colors">
        {{ box.value }}
      </div>
      <div class="box legend">High</div>
    </div>
  </div>
</template>

<style>
.box {
  width: 28px;
  height: 14px;
  display: inline-block;
  text-align: center;
  font-size: 0.8em;
  vertical-align: bottom;
  border: 1px solid #ebff1c00;
  color: #fff;
}
.box.legend {
  width: 42px;
}

.box-selected {
  border: 1px solid #ebff1c;
}
</style>

<script setup>
const $props = defineProps({
  colors: {
    type: Object,
    required: true
  },
  value: {
    type: Number,
    default: 0
  }
})
</script>
