<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,body,#app{
  width: 100%;
  height: 100%;
}

#nav {
  position: fixed;
  top:0;
  left:0;
  width: 15%;
  background-color: #070707;
  padding: 20px;
  height: 100%;

  a{
    display: block;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-decoration: none;
    color: #f0f0f0;
    text-align: center;
  }
  .router-link-exact-active{
    color:#fff;
  }
}

#content{
  position: absolute;
  top:0;
  right: 0;
  width: 85%;
  height: 100%;
}
</style>
