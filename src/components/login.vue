<template>
  <div>
        <input type="text" v-model="loginForm.userName" placeholder="用户名"/>
        <input type="text" v-model="loginForm.userPwd" placeholder="密码"/>
        <button @click="login()">登录</button>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    data () {
      return {
        loginForm: {
          userName: '',
          userPwd: ''
        },
        user:{},
        rules:{}
      };
    },

    methods: {
      ...mapMutations(['changeLogin']),
      login () {
        if (this.loginForm.userName === '' || this.loginForm.userPwd === '') {
          alert('账号或密码不能为空');
        } else {
          console.log(this.loginForm);
          var params = new URLSearchParams();
          params.append('userName',this.loginForm.userName);
          params.append('userPwd', this.loginForm.userPwd);
          this.axios({
            method: 'post',
            url: '/user/login',
            data: params
          }).then(res => {
            this.user=res.data;
            console.log(res.data);
            if(res.data.userName===this.loginForm.userName){
              console.log(res.data);
              this.$router.push('/index');
              localStorage.setItem('user',JSON.stringify(res.data));
              alert('登陆成功');
            }else{
              alert('账号不存在');
            }
          }).catch(error => {
            alert('账号或密码错误');
            console.log(error);
          });
        }
      }
    }
  };
</script>
