<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="入住单号" prop="id">
          <el-input  v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="客房编号" prop="currentRoomName">
          <el-input  v-model="ruleForm.currentRoomName" disabled></el-input>
        </el-form-item>
        <el-form-item label="客房类型" prop="roomsTypeName">
          <el-input  v-model="ruleForm.roomsTypeName"  disabled></el-input>
        </el-form-item>
        <el-form-item label="入住人" prop="residents">
          <el-input  v-model="ruleForm.residents" disabled></el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="memberId">
          <el-input  v-model="ruleForm.remarks"  disabled></el-input>
        </el-form-item>
        <el-form-item label="押金金额" prop="deposit">
          <el-input   v-model.number="ruleForm.deposit" disabled ></el-input>
        </el-form-item>
        <el-form-item label="结账金额">
          <el-input   v-model="financial.totalBill" disabled ></el-input>
        </el-form-item>
        <el-form-item label="进账时间" prop="createDate">
          <el-input   v-model.number="ruleForm.createDate" disabled ></el-input>
        </el-form-item>


        </el-form>
  </div>
</template>

<script>
  export default {
      inject:['reload'],
      props:["id"],
    data () {
      return {
          financial:[],//为获取结账房间的结账金额
          ruleForm:{
            id:"",
            currentRoomName:"",
            currentRoomId:"",
            normalPrice:"",
            discountPrice:"",
            deposit:"",
            residents:"",
            credentialsType:"",
            credentialsNum:"",
            phone:"",
            arrivalTime:"",
            leaveTime:"",
            personNum:"",
            memberId:"",
            bookStatus:"",
            memberPrice:"",
            roomsTypeName:"",
            remarks:"",
            createDate:""
          },
        rules: {
        },

      }
    },
    created(){
        if(this.id){
             this.get("orderManage/getOne",(data)=>{
                this.ruleForm=data;
                console.log("订单表所有信息",this.ruleForm);
            },{id:this.id});
        //  根据id查询账单信息
          this.get("checkout/getOne",(data)=>{
            this.financial = data;
            console.log("账单表对应id的结账金额",data.totalBill);
          },{id:this.id});
        }

    },
    components: {

    },
    methods:{

    }
  }
</script>

<style scoped>


</style>
