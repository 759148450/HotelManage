<template>
  <div style="margin-top: 15px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="入住单号" prop="id">
        <el-input  v-model="ruleForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="roomId">
        <el-input  v-model="ruleForm.roomId" disabled></el-input>
      </el-form-item>
      <el-form-item label="房价" prop="roomPrice">
        <el-input  v-model="ruleForm.roomPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="押金" prop="deposit">
        <el-input  v-model="ruleForm.deposit" disabled></el-input>
      </el-form-item>
      <el-form-item label="住宿天数" prop="livedDays">
        <el-input  v-model="ruleForm.livedDays" @keyup.native="getTotalBill"></el-input>
      </el-form-item>
      <el-form-item label="住宿费" prop="livedPrice">
        <el-input  v-model="ruleForm.livedPrice" readonly @keyup.native="getTotalBill"></el-input>
      </el-form-item>
      <el-form-item label="店内消费" prop="roomBill">
        <el-input  v-model="ruleForm.roomBill"  disabled></el-input>
      </el-form-item>
      <el-form-item label="餐费" prop="foodBill">
        <el-input  v-model="ruleForm.foodBill"  @keyup.native="getTotalBill"></el-input>
      </el-form-item>
      <el-form-item label="电话费" prop="telBill">
        <el-input  v-model="ruleForm.telBill"  @keyup.native="getTotalBill"></el-input>
      </el-form-item>
      <el-form-item label="应退押金" prop="rebackDeposit">
        <el-input  v-model="ruleForm.rebackDeposit"></el-input>
      </el-form-item>
      <el-form-item label="实际应收" prop="totalBill">
        <el-input  v-model="ruleForm.totalBill" disabled></el-input>
      </el-form-item>
      <el-form-item label="付款方式" prop="payStyle">
        <el-radio-group v-model="ruleForm.payStyle">
          <el-radio label="现金" :value="0">现金</el-radio>
          <el-radio label="支票" :value="1">支票</el-radio>
          <el-radio label="信用卡" :value="2">信用卡</el-radio>
          <el-radio label="代金卷" :value="3">代金卷</el-radio>
          <el-radio label="其他" :value="4">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="实收" prop="realWages" @keyup.native="getTotalBill">
        <el-input  v-model="ruleForm.realWages" ></el-input>
      </el-form-item>
      <el-form-item label="找零" prop="oddChange">
        <el-input  v-model="ruleForm.oddChange" disabled></el-input>
      </el-form-item>
      <el-form-item label="操作员" prop="user">
        <el-input  v-model="ruleForm.user"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{buttonText}}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    props:["id","currentRoomId", "currentRoomName", "discountPrice", "deposit"],
    data () {
      name:"checkoutadd"
      return {
//        roomBill:"",
        ruleForm:{
          id:this.id,
          currentRoomId:this.currentRoomId,
          roomId:this.currentRoomName,
          roomPrice:this.discountPrice,
          deposit:this.deposit,
          livedDays:"",
          livedPrice:"",
          roomBill:"",
          foodBill:"",
          telBill:"",
          totalBill:"",
          rebackDeposit:this.deposit,
          payStyle:"",
          realWages:"",
          oddChange:"",
          user:"",
          remarks:""
        },
        rules: {
          livedDays: [
            { required: true, trigger: 'blur',message:'请输入住宿天数' }
          ],
          credentialsNum: [
            { required: true, trigger: 'blur',}
          ],
        },
        buttonText:"创建"

      }
    },
    created(){
      this.loadUser();
      this.get("consume/getAllConsume",(data)=>{
        this.consume=data;
        //定义                   
        let roomBill = 0;
        this.consume.forEach((consume) => {
          //遍历dcPrice这个字段，并累加
          roomBill += consume.dcPrice;
        });
        this.ruleForm.roomBill = roomBill; //返回
        console.log("店内附加消费",this.ruleForm.roomBill)
      },{liveId:this.id});
    },

    components: {

    },
    methods:{
      //获取登录用户信息
      loadUser(){
        var list = JSON.parse(localStorage.getItem("user") || '[]');
        this.ruleForm.user=list.userName;
      },
      //实时价格数据监控
      getTotalBill(){
        let livedPrice = this.ruleForm.roomPrice * this.ruleForm.livedDays;//住宿费
        this.ruleForm.livedPrice = livedPrice.toFixed(2);
        //实际应收
        let totalBill = Number(this.ruleForm.roomPrice * this.ruleForm.livedDays)
          + Number(this.ruleForm.roomBill) + Number(this.ruleForm.foodBill) + Number(this.ruleForm.telBill)-Number(this.ruleForm.rebackDeposit);
        console.log(totalBill);
        this.ruleForm.totalBill = totalBill.toFixed(2);
        //找零
        let oddChange = Number(this.ruleForm.realWages) - Number(this.ruleForm.totalBill);
        console.log("找零"+oddChange);
        this.ruleForm.oddChange = oddChange.toFixed(2);
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        let url="checkout/add";
        this.post(formName,url,this.ruleForm);
      }
    }
  }
</script>
<style scoped>
</style>
