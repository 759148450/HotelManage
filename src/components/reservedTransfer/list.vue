<template>

  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="22">
          <el-input placeholder="请输入预定单号" v-model="search.id" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>

          <el-select v-model="search.roomTypeid" filterable placeholder="请选择类型信息" style="width: 200px"  @change="findData">
            <el-option
              v-for="item in guestTypes"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input placeholder="请输入房间编号" v-model="search.originalRoomId" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>

          <el-input placeholder="请输入预定人姓名" v-model="search.residents" class="input-with-select" style="width: 200px">
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
        label="入住单号">
      </el-table-column>
      <el-table-column
        prop="originalRoomId"
        label="入住房间编号">
      </el-table-column>
      <el-table-column
        prop="roomsTypeName"
        label="客房类型">
      </el-table-column>
      <el-table-column
        prop="normalPrice"
        label="标准价格">
      </el-table-column>
      <el-table-column
        prop="discountPrice"
        label="折后价">
      </el-table-column>
      <el-table-column
        prop="deposit"
        label="押金">
      </el-table-column>
      <el-table-column
        prop="residents"
        label="入住人">
      </el-table-column>
      <el-table-column
        prop="arrivalTime"
        label="抵店时间">
      </el-table-column>
      <el-table-column
        prop="leaveTime"
        label="离店时间">
      </el-table-column>
      <el-table-column
        prop="personNum"
        label="入住人数">
      </el-table-column>
      <el-table-column
        prop="memberId"
        label="会员编号">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="bookStatus"-->
        <!--label="登记入住"-->
        <!--:formatter="bookStatusformat">-->
      <!--</el-table-column>-->

      <el-table-column label="登记入住">

        <template slot-scope="scope">

          <el-button id="fff" type="text" formatter="bookStatusformat" prop="bookStatus" size="small">按钮</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">详细信息</el-button>

          <el-button type="text" size="small" @click="del(scope.row)">{{deltext(scope.row.active)}}</el-button>
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
  import EditReservedTransfer from '@/components/reservedTransfer/edit'

  export default {
    inject:['reload'],
    name:"reservedTransfer",
    data () {
      return {
        search:{
          id:"",
          originalRoomId:"",
          bookStatus:"",
          residents:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          originalRoomId:"",
          bookStatus:"",
          residents:""
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
        this.get("orderManage/list",(data)=>{
          this.tableData=data;
        },this.queryParams);
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
        });
      },

      bookStatusformat(row, column, cellValue, index){
        if(cellValue==1)
          return "已取消";
        else if(cellValue==2)
          return "已入住";
        else if(cellValue==2)
          return "已退房";
        else if(cellValue==3)
          return "已还房";
      },

      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      // add(){
      //   this.$layer.iframe({
      //     content: {
      //       content: EditReservedTransfer, //传递的组件对象
      //       parent: this,//当前的vue对象
      //       data:{}//props
      //     },
      //     area:['800px','600px'],
      //     title: '添加预定信息',
      //     shadeClose: false,
      //     shade :true
      //   });
      // },
      edit(row){
        this.$layer.iframe({
          content: {
            content: EditReservedTransfer, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '房客详细信息',
          shadeClose: false,
          shade :true
        });
      },

      del(row){
        this.delete("orderManage/del",row.id,row.active);
      },
      deltext(active){
        return active==1?"删除":"恢复"
      }

    }
  }
</script>

<style>
  .el-table .cell {
    text-align: center;
  }
</style>
