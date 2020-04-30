<template>
  <!--以后再做-->
  <ul class="select-icon icon_lists dib-box">
    <li class="dib" v-for="item in data.glyphs" :key="item.icon_id"  @click="select(data.css_prefix_text + item.font_class)">
      <span class="icon iconfont" :class="data.css_prefix_text + item.font_class"></span>
      <div class="name">
        {{item.name}}
      </div>
      <div class="code-name">{{data.css_prefix_text + item.font_class}}</div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'selectIcon',
    props: {
    },
    data () {
      return {
        data: {
          css_prefix_text: '',
          glyphs: []
        }
      }
    },
    computed: {
    },
    methods: {
      getIcon () {
        this.api.getIconJson().then(res => {
          this.data = res
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      select (icon) {
        this.$emit('select', icon)
      }
    },
    mounted: function () {
      this.getIcon()
    }
  }
</script>

<style scoped lang="scss">
  .icon_lists {
    width: 100% !important;
    overflow: hidden;
    *zoom: 1;
  }

  .icon_lists li {
    width: 100px;
    margin-bottom: 10px;
    margin-right: 20px;
    text-align: center;
    list-style: none !important;
    cursor: default;
  }

  .icon_lists li .code-name {
    line-height: 1.2;
  }

  .icon_lists .icon {
    display: block;
    height: 100px;
    line-height: 100px;
    font-size: 42px;
    margin: 10px auto;
    color: #333;
    -webkit-transition: font-size 0.25s linear, width 0.25s linear;
    -moz-transition: font-size 0.25s linear, width 0.25s linear;
    transition: font-size 0.25s linear, width 0.25s linear;
  }

  .icon_lists .icon:hover {
    font-size: 100px;
  }

  .icon_lists .svg-icon {
    /* 通过设置 font-size 来改变图标大小 */
    width: 1em;
    /* 图标和文字相邻时，垂直对齐 */
    vertical-align: -0.15em;
    /* 通过设置 color 来改变 SVG 的颜色/fill */
    fill: currentColor;
    /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
        normalize.css 中也包含这行 */
    overflow: hidden;
  }

  .icon_lists li .name,
  .icon_lists li .code-name {
    color: #666;
  }

  .dib-box .dib {
    vertical-align: top;
    font-size: 12px;
    letter-spacing: normal;
    display: inline-block;
    word-spacing: normal;
    line-height: inherit;
  }
</style>
