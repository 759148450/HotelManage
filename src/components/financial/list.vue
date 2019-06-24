<template>
  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="22">
          <el-input placeholder="请输入房间编号" v-model="search.currentRoomName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>

        </el-col>
      </el-row>
    </div>

    <el-table
      :data="tableData.list"
      border
      style="width: 100%;">
      <el-table-column
        prop="id"
        width="100"
        label="入住单号">
      </el-table-column>
      <el-table-column
        prop="currentRoomName"
        label="房间编号">
      </el-table-column>

      <el-table-column
        prop="roomsTypeName"
        label="客房类型">
      </el-table-column>
      <el-table-column
        prop="residents"
        label="入住人">
      </el-table-column>
      <el-table-column
        prop="memberId"
        label="会员编号">
      </el-table-column>
      <!--暂时显示押金-->
      <el-table-column
        prop="deposit"
        label="付款押金">
      </el-table-column>
      <el-table-column
        prop="orderForm.totalBill"
        label="结账金额">
      </el-table-column>
      <el-table-column
        prop="orderForm.payStyle"
        label="进账方式">
      </el-table-column>

      <el-table-column
        prop="bookStatus"
        label="进账类型"
        :formatter="bookStatusformat">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="进账时间">
      </el-table-column>
      <el-table-column label="操作" width="70">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.total"
      :current-page="this.queryParams.pageNo"
      :page-size="this.queryParams.pageSize"
      @current-change="changePageNo">
    </el-pagination>
  </div>
</template>

<script>
  import DetailFinancial from '@/components/financial/detail'
  export default {
    inject:['reload'],
    name:"orderlist",
    data () {
      return {
        search:{
          currentRoomName:"",

        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          currentRoomName:"",
        },
        tableData:{},
        orderForm:{}
      }
    },
    created(){
      this.getData();
    },
    watch:{
      queryParams:{
        handler:function(){
          this.getData();
        },
        deep:true
      }
    },
    mounted(){},
    methods:{
      getData(){
        //查询所有0、2、3、4状态的
        this.get("orderManage/financial",(data)=>{
          console.log("订单表所有信息",data);
          this.tableData=data;
        },this.queryParams);
        //查询结账（只有3退房状态才会结账）信息
        this.get("orderManage/orderForm",(data)=>{
          console.log("结账信息",data);
          this.orderForm=data;
        });
      },

      bookStatusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "押金";
        else if(cellValue==1)
          return "已取消";
        else if(cellValue==2)
          return "押金";
        else if(cellValue==4)
          return "押金";
        else if(cellValue==3)
          return "结账";
      },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailFinancial, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '入住信息详情',
          shadeClose: false,
          shade :true
        });
      },
    }
  }
</script>

<style>
  .el-table .cell {
    text-align: center;
  }
</style>
