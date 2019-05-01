<template>
  <div>
    <el-select v-model="value" placeholder="请选择" :ilter-method="selectCourse(value)">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <div class="line"></div>
    <el-table
        :data="tableData"
        border
        style="width: 80%;">
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
    </el-table>
    <empty-state  v-if="false">
        <p slot="tip">暂无数据</p>
    </empty-state>
  </div>
</template>

<script>
import EmptyState from '@/components/common/empty-state.vue';
export default {
 data() {
      return {
          options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        tableData: [{
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
         
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
        
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
         
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }
    },
    components: {
        EmptyState
    },
    methods: {
        selectCourse(val){
            console.log(val)
        }
    }
    
}
</script>

<style scoped lang="less">
.line{
    margin-top: 20px;
}
</style>
