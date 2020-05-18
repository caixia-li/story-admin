<template>
  <div id="login-box">
    <div class="login">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click.prevent="onSubmit">登录</el-button>
          <el-button>取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      flag:false
    };
  },
  methods: {
    onSubmit() {
        this.$axios.post('/login',{...this.form}).then(res=>{
          console.log(res)
        })
        if(this.form.userName == "admin" && this.form.password == "123456"){
            this.flag = true
        }
        this.$router.push('/book')
    }
  },
  beforeRouteLeave (to, from, next) {
      if(this.flag){
         this.$router.options.meta.isLogin = true;
      }
      next()
  }
};
</script>

<style lang="scss">
#login-box {
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/bg.jpg");
  background-size: 100% 100%;
  .login {
    width: 500px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(129, 126, 126, 0.74);
    border-radius: 20px;
    
    label{
        color: #ffffff;
    }

    .btn{
        text-align: center;
    }
  }
}
</style>