<template>
  <div id="app">
    <vue-particles
      class="bg"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="6"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
	provide(){
		return {
			reload: this.reload
		}
	},
	data(){
		return {
			isRouterAlive:true
		}
	},
	methods:{
		reload(){
			this.isRouterAlive=false
			this.$nextTick(()=>this.isRouterAlive=true)
		}
	},

};
</script>

<style lang="less">
@import "@/assets/styles/index.less";
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  .bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: left / cover fixed no-repeat url("./assets/background.jpg");
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
