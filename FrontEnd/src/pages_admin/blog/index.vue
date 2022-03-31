<template>
  <el-container>
    <el-main>
      <h1 align="center">文章管理</h1>
      <!--搜索功能-->
      <div class="search">
        <el-input
          class="search-input"
          placeholder="根据文章标题或分类搜索"
          v-model="search"
          clearable
        ></el-input>
        <el-button
          class="search-btn"
          type="primary"
          icon="el-icon-search"
          @click="SearchArtcle(search)"
        ></el-button>
        <el-button
          class="delete-btn"
          type="danger"
          icon="el-icon-delete"
          @click="DeleteArtcle"
        ></el-button>
      </div>
      <!--文章展示-->
      <div class="tabel-info">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          highlight-current-row
        >
          <!--多选框-->
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column
            fixed
            label="序号"
            type="index"
            width="80"
          ></el-table-column>

          <!--文章标题-->
          <el-table-column
            prop="title"
            label="标题"
            width="170"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="desc"
            label="简介"
            width="170"
            show-overflow-tooltip
          ></el-table-column>
          <!--文章所属分类-->
          <el-table-column
            prop="category"
            label="分类"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <!--文章标签-->
          <el-table-column
            prop="tag"
            label="标签"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.tag }}</span>
            </template>
          </el-table-column>
          <!--文章封面-->
          <el-table-column label="文章封面" prob="headerPic" show-overflow-tooltip width="130">
            <template slot-scope="scope">
              <div class="demo-image__preview">
                <el-image
                  :src="scope.row.headerPic"
                  style="width: 100px; height: 40px"
                ></el-image>
              </div>
            </template>
          </el-table-column>
          <!--文章添加时间-->
          <el-table-column prop="pubTime" label="发布时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.pubTime | formatDate }}</span>
            </template>
          </el-table-column>
          <!--文章更新时间-->
          <el-table-column prop="upTime" label="更新时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.upTime | formatDate }}</span>
            </template>
          </el-table-column>

          <!--操作-->
          <el-table-column prop="id" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.row.id)"
                type="text"
                size="small"
                >删除</el-button
              >
              <el-button
                @click="handleEdit(scope.row.id)"
                type="text"
                size="small"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->

      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Blogtotal"
        ></el-pagination>
      </div>
      
    </el-main>
  </el-container>
</template>

<script>
import { formatDate } from "@/utils/index";
import axios from "@/utils/axios";
export default {
  inject:['reload'],
  name: "articleNav",
  data() {
    return {
      tableData: [],
      search: "",
      currentPage: 1,
      Blogtotal:0,
      pageSize:10,
    };
  },
  created(){
    this.getAllBlogsCount();
    this.GetBlogsByPage();
  },
    // 组件创建之后
    // 在created这个方法中可以操作后端的数据  数据驱动试图
    // 应用：发起Ajax请求
    
  
  methods: {
    // 编辑文章按钮
    handleEdit(index, row) {
      // console.log(index, row);
    },
    // 删除文章按钮
    handleDelete(articleId) {
      
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确认删除后向后端发起请求删除该数据
          axios.delete("/api/admin/DeleteBlogById", {params: {id: articleId},headers: {'token': window.sessionStorage.getItem("token")}});
          this.reload();
          this.$message({
            type: "success",
            message: "删除成功!",
            
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 模糊搜索文章
    SearchArtcle(value) {
      // console.log(value);
    },
    // 批量删除
    DeleteArtcle() {},
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.GetBlogsByPage()
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
      this.GetBlogsByPage()
    },
  
    getAllBlogsCount(){
        const _this = this;
        // console.log(window.sessionStorage.getItem("token"))
        axios.get("/api/admin/getAllBlogsCount",
          {headers: {'token': window.sessionStorage.getItem("token")}}
        ).then((res) => {
          // 校验后端返回的code
          if (res.data.code === 200) {
            _this.tableData = res.data.total;
            _this.Blogtotal = res.data.total;

          } else if(res.data.code === 204){
            alert("无数据");
          }
        }).catch((err) => {
          // console.log(err);
        });
      },

    GetBlogsByPage(){
      var _this = this;
      // console.log(window.sessionStorage.getItem("token"))
      axios.get("/api/admin/GetBlogsByPage",{
          params: {page: _this.currentPage, limit : _this.pageSize || 1},
          headers: {'token': window.sessionStorage.getItem("token")}}
      ).then((res) => {
        // 校验后端返回的code
        if (res.data.code === 200) {
          _this.tableData = res.data.blogs;

        }else if(res.data.code === 204){
          alert("无数据");
        }
      }).catch((err) => {
        // console.log(err);
      });
  },
  // 日期过滤器 时间戳转换成日期时间
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  // 钩子 组件加载后运行 查询所有分类
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<style lang="less">
@import "./local.less";
</style>