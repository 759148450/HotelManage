<template>
    <el-container class="wrap">
        <el-header class="header" style=" display: inline-block;">
            <img src="../assets/hotel.png" style="width: 26px;height: 26px;display:inline-block; vertical-align:middle"/>
            <h1  class="title" >酒店管理系统</h1>
            <h1  class="title" >{{user.userName}}</h1>
          <button @click="logout()">退出</button>
        </el-header>
        <el-container class="content">
            <el-aside width="200px">
                <Menu>
                </Menu>
            </el-aside>
            <el-main style="background:#fff;">
                <MyBreadcrumb style="margin-bottom:20px;"></MyBreadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Menu from '@/components/frame/menu'
    import MyBreadcrumb from '@/components/frame/myBreadcrumb'
    export default {
        name:"index",
        data () {
            return {
              user:[],
            }
        },

      methods:{      //从本地的localStorage中，加载列表
         loadUser(){
             var list = JSON.parse(localStorage.getItem("user") || '[]');
             this.user = list;
           },
        //用户退出，销毁localStorage
          logout(){
            localStorage.removeItem('user');
            localStorage.removeItem('islogin');
            alert("退出成功");
            this.$router.push('/');
          }
           },
      created(){
         var islogin = localStorage.getItem("islogin");
        if(islogin!='1'){
          this.$router.push('/');
        }
        this.loadUser();

      },
      watch:{
        islogin: {
          handler:function(){

          },
          deep:true
        }
      },
      components: {
        Menu,
        MyBreadcrumb
      }
    }
</script>
<style scoped>
    @keyframes in {
        from{transform: translateY(-30px);opacity: 0;}
        to{transform: translateY(0px);opacity: 1;}
    }
    @-webkit-keyframes in{
        from{transform: translateY(-30px);opacity: 0;}
        to{transform: translateY(0px);opacity: 1;}
    }
    .wrap{
        height:100%;
        display: flex;
        flex-direction:column;
       background-color: #373d41;
    }
    .header{
        padding:0;
        padding-left: 3%;
        line-height: 60px;
    }
    .header>.title {
        height:100%;
        animation: in 1s;
        -webkit-animation: in 1s;
       color: #ffffff;
       display: inline-block;
      vertical-align:middle
    }
    .content{
        flex: 1;
    }

</style>
