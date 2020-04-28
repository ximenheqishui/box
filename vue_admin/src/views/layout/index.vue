<template>
  <el-container class="layout">
    <Aside />
    <el-container direction="vertical" style="position: relative">
      <Header />
      <tags-view />
      <el-main class="main" @scroll.native="mainScroll" ref="mainScroll">
        <transition name="fade" mode="out-in">
          <keep-alive :max="40" :include="cachedViews">
              <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </el-main>
<!--      <Footer />-->
    </el-container>
  </el-container>
</template>
<script>
  import Aside from '@/views/layout/aside/aside.vue'
  import Footer from '@/views/layout/footer/footer.vue'
  import Header from '@/views/layout/header/header.vue'
  import TagsView from '@/views/layout/TagsView.vue'
  export default {
    props: {
    },
    components: {
      // Footer,
      Header,
      Aside,
      TagsView
    },
    computed: {
      cachedViews () {
        return this.$store.state.tagsView.cachedViews
      },
      key () {
        return this.$route.fullPath
      }
    },
    data () {
      return {
      }
    },
    methods: {
      mainScroll () {
        this.$route.meta.mainScroll = this.$refs.mainScroll.$el.scrollTop
      }
    },
    mounted () {
    },
    destroyed () {
    }
  }
</script>
<style lang="scss" type="text/scss"  scoped>
  @import "../../assets/styles/mixin";
  .layout {
    height: 100%;
    min-width: 800px;
    .el-main{
      box-sizing: border-box;
      height: 0;
      @include scrollBar('#d3dce6','#99a9bf');
    }
  }
</style>
