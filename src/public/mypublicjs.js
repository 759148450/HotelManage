import axios from 'axios'
import { Message,Loading,MessageBox } from 'element-ui';
export default {
  get:function(url,callback,params={}){
    let myloading= Loading.service();
     axios.get(url,{
      params:params
    }).then((result)=>{
      callback(result.data);
    }).catch(err=>{
      Message({
        showClose: true,
        message: err,
        type: 'error'
      });
    }).finally(()=>{
      myloading.close();
    })
  },
  post:function(url,paramsdata,callback,config={}){
    let formData=new FormData();
    for(let j in paramsdata){
      formData.append(j,paramsdata[j]);
    }
    let myloading= Loading.service();
     axios.post(url,formData,config).then(result=>{
      Message({
        message: "success",
        type:"success"
      });
      callback(result.data);
    }).catch(err=>{
      Message({
        showClose: true,
        message: err,
        type: 'error'
      });
    }).finally(()=>{
      myloading.close();
    })
  },
  merge:function(source,target){
    for(let k in source){
      target[k]=source[k];
    }
  },
  del:function(id,status,callback){
    let _selt=this;
    let isDel=status==1?0:1;
    let txt=status==1?"确定要删除该数据吗？":"确定要恢复该数据吗";
    MessageBox.confirm(txt,'提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      callback(id,isDel);
    }).catch(()=>{});
  }
}
