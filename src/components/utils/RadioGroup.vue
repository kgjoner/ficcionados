<template>
  <div class="radio-group">
    <label v-for="(option, index) in options" :key="index"
      class="radio-group__label"
    >{{option.label}}
      <input
        class="radio-group__input"
        type="radio"
        :name="name"
        :value="option.value"
        :checked="value === option.value"
        @change="emitValueChange"
      />
      <span class="radio-group__custom-box"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioGroup',
  props: ['name', 'options', 'value'],
  methods: {
    emitValueChange(e) {
      this.$emit('input', e.target.value)
    }
  },
}
</script>

<style>
.radio-group {
	padding: 50px 20px 0px 50px;
}

.radio-group__label {
	position: relative;
	padding-left: 30px;
	margin-right: 35px;
	margin-bottom: 12px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	color: #4c4c4c;
}

.radio-group__input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

.radio-group__custom-box {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	background-color: #d2d2d2;
	border-radius: 2px;
}

.radio-group__custom-box:after {
	content: '';
	position: absolute;
	display: none;
  left: 9px;
	top: 3px;
	width: 8px;
	height: 16px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}

.radio-group__label:hover .radio-group__custom-box {
	background-color: #c2c2c2;
}

.radio-group__input:checked ~ .radio-group__custom-box {
	background-color: #1d7fd8;
}

.radio-group__input:checked ~ .radio-group__custom-box:after {
	display: block;
}
</style>