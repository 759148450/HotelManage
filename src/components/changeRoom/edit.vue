<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原房间编号" prop="originalRoomName">
          <el-input   v-model="ruleForm.originalRoomName" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="现房间类型" prop="roomTypeId">
          <el-select v-model="ruleForm.roomTypeId" placeholder="请选择" disabled>
            <el-option v-for="entry in guestTypes" :label="entry.typeName" :value="entry.id" :key="entry.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现房间编号" prop="currentRoomName">
          <el-input   v-model="ruleForm.currentRoomName"></el-input>
        </el-form-item>
        <el-form-item label="标准价" prop="normalPrice">
          <el-input   v-model="ruleForm.normalPrice"></el-input>
        </el-form-item>
        <el-form-item label="折后价" prop="discountPrice">
          <el-input   v-model="ruleForm.discountPrice"></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input  v-model="ruleForm.deposit"></el-input>
        </el-form-item>
        <el-form-item label="入住人" prop="residents">
          <el-input   v-model="ruleForm.residents"></el-input>
        </el-form-item>
<!--        <el-form-item label="证件类别" prop="credentialsType">-->
<!--          <el-form-item label="证件类型" prop="credentialsType" v-if="ruleForm.credentialsType==0">-->
<!--            <el-input value="身份证" disabled></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="证件类型" prop="credentialsType" v-if="ruleForm.credentialsType==1">-->
<!--            <el-input value="护照" disabled></el-input>-->
<!--          </el-form-item>-->
<!--          <el-select v-model="ruleForm.credentialsType" placeholder="请选择">-->
<!--            <el-option label="居民身份证" :value="1"></el-option>-->
<!--            <el-option label="士官证" :value="2"></el-option>-->
<!--            <el-option label="护照" :value="3"></el-option>-->
<!--            <el-option label="港澳通行证" :value="4"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="证件类型:" prop="credentialsType" >
          <el-radio-group v-model="ruleForm.credentialsType" disabled>
            <el-radio  label="1">身份证</el-radio>
            <el-radio label="2">护照</el-radio>
            <el-radio label="3">港澳通行证</el-radio>
            <el-radio label="4">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="证件号码" prop="credentialsNum">
          <el-input  v-model="ruleForm.credentialsNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input   v-model="ruleForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="抵店时间" prop="arrivalTime">
          <el-date-picker
            v-model="ruleForm.arrivalTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions0"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离店时间" prop="leaveTime">
          <el-date-picker
            v-model="ruleForm.leaveTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions1"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入住人数" >
        <el-input-number v-model="ruleForm.personNum" @change="handleChange" :min="1" :max="10">
        </el-input-number>
          </el-form-item>
        <el-form-item label="操作员" prop="userId">
          <el-input   v-model="ruleForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="memberId">
          <el-input  v-model="ruleForm.memberId"></el-input>
        </el-form-item>
        <el-form-item label="会员价" prop="memberPrice">
          <el-input   v-model="ruleForm.memberPrice"></el-input>
        </el-form-item>
        <el-form-item label="提供早餐" prop="breakfast">
          <el-select v-model="ruleForm.breakfast" placeholder="请选择" >
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定时叫醒" prop="timedWakeup">
          <el-input  v-model="ruleForm.timedWakeup"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input   v-model="ruleForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{buttonText}}</el-button>
        </el-form-item>

        </el-form>
  </div>
</template>

<script>
  export default {
      inject:['reload'],
      props:["id"],
    data () {
        name:"orderlistedit"
      /*验证手机号*/
      let checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error("电话号码不能为空"))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以在前面加了一个+实现隐式转换
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error("电话号码格式不正确"))
            }
          }
        }, 100)
      };
      /*验证身份证号*/
      let checkcredentialsNum = (rule, value, callback) => {
        const credentialsNumReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!value) {
          return callback(new Error("身份证不能为空"))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以在前面加了一个+实现隐式转换
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"))
          } else {
            if (credentialsNumReg.test(value)) {
              callback()
            } else {
              callback(new Error("身份证号格式不正确"))
            }
          }
        }, 100)
      };
      return {
        guestTypes:[],
          ruleForm:{
            id:"",
            originalRoomName:"",
            currentRoomName:"",
            bookStatus:2,
            roomTypeId:"",
            normalPrice:"",
            discountPrice:"",
            deposit:"",
            residents:"",
            credentialsType:"",
            credentialsNum:"",
            phone:"",
            arrivalTime:"",
            leaveTime:"",
            personNum:1,
            userId:"",
            memberId:"",
            memberPrice:"",
            breakfast:"",
            timedWakeup:"",
            remarks:"",
            active:"",
            createDate:""
          },
        buttonText:"创建",
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.ruleForm.leaveTime != "") {
              return  time.getTime() >(new Date(this.ruleForm.leaveTime).getTime())- 8.64e7||Date.now()>time.getTime() ;
            }else{
              return time.getTime()<Date.now();
            }
          },
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.ruleForm.arrivalTime !== "") {
              return time.getTime() < (new Date(this.ruleForm.arrivalTime).getTime())+24 * 3600 * 1000;
            }else{
              return time.getTime()<Date.now();
            }
          }
        },
        rules: {
          /*验证手机号*/
          phone: [
            { required: true, trigger: 'blur',validator: checkPhone }//设置全局变量
          ],
          credentialsNum: [
            { required: true, trigger: 'blur',validator: checkcredentialsNum }]


        }

      }
    },
    created(){
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
        });
        // this.get("orderManage/getAllGoodsType",(data)=>{
        //   this.goodsTypes=data;
        // });
        if(this.id){
             this.get("orderManage/getOne",(data)=>{
               data.originalRoomName=data.currentRoomName;
               data.currentRoomName="";
                this.ruleForm=data;
                console.log(this.ruleForm);
            },{id:this.id});
            this.buttonText="提交"
        }
    },
    components: {

    },
    methods:{
        handleChange(value) {
          console.log(value);
        },
        resetForm(formName){
             this.$refs[formName].resetFields();
        },
        submitForm(formName){
            let url="";
            if(this.id){
              url="orderManage/change";
              this.post(formName,url,this.ruleForm);
            }
        }
    }
  }
</script>

<style scoped>


</style>
