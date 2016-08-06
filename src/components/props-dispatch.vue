<template>
  <div id="app">
    <h1>vue.js</h1>
    <hello :msg="msg1" @form-child="handit"></hello>
  </div>
</template>

<script>
// 父传子 子传父 优雅实践
import Hello from './components/Hello'

export default {
	data() {
		return {
			msg1: '父传子1',
		}
	},
  components: {
    Hello
  },
  methods: {
  	handit(ev) {
  		this.msg1 = ev;
  	}
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>

<!-- 上面是父组件 下面是子组件 -->

<template>
	<h1>{{ msg }}</h1>
	<button @click="goF">传给父亲</button>
</template>

<script>
	export default {
		data() {
			return {
				childMsg: '子传父'
			}
		},
		props: [ 'msg' ],
		methods: {
			goF() {
				this.$dispatch('form-child',this.childMsg);
			}
		}
	}
</script>
