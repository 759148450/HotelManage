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
      <el-table-column
        prop="deposit"
        label="付款金额">
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
  import EditOrderlist from '@/components/orderlist/edit'
  import DetailOrderlist from '@/components/orderlist/details'
  import AddOrderlist from '@/components/orderlist/add'
  export default {
    inject:['reload'],
    name:"orderlist",
    data () {
      return {
        search:{
          id:"",
          originalRoomId:"",
          currentRoomId:"",
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
          personNum:"",
          userId:"",
          memberId:"",
          memberPrice:"",
          breakfast:"",
          timedWakeup:"",
          remarks:"",
          active:"",
          createDate:"",
          roomsTypeName:"",
          originalRoomName:"",
          currentRoomName:""
          // rooms:"",
          // leaguer:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          originalRoomId:"",
          currentRoomId:"",
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
          roomsTypeName:"",
          leaveTime:"",
          personNum:"",
          userId:"",
          memberId:"",
          memberPrice:"",
          breakfast:"",
          timedWakeup:"",
          remarks:"",
          active:"",
          createDate:"",
          originalRoomName:"",
          currentRoomName:""
          // rooms:"",
          // leaguer:""
        },
        tableData:{},
        guestTypes:{}
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
        this.get("orderManage/financial",(data)=>{
          console.log(data)
          this.tableData=data;
        },this.queryParams);
      },

      bookStatusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "押金";
        else if(cellValue==1)
          return "已取消";
        else if(cellValue==2)
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
            content: DetailOrderlist, //传递的组件对象
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
