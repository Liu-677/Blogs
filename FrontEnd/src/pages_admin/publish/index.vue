<template>

  <el-container>
    
        <el-main>
          
          <h1 align="center">发布文章</h1>
          
          <input class="title-input" v-model="title" placeholder="请输入标题"  type="text" />
          
          <div class="article-input">
              <mavon-editor 
              :previewBackground="`#DCDCDC`"
              :toolbarsBackground="`#DCDCDC`"
              :fontSize="`25px`"
              class="mavonEditor" v-model="md" ref="md"  @imgAdd="$imgAdd" @change="change"></mavon-editor>
          </div>
          
          <div class="category-input">
            <el-select  class="category-select" v-model="category" placeholder="请选择文章分类"  :allow-create="true" :filterable="true"  :popper-append-to-body="false" clearable size="medium">
                <el-option v-for="item in this.options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
          

          <div>
            <input class="tags-input" v-model="tags" placeholder="请输入文章标签 多个标签用分号分隔" >
          </div>
          <div class="back"></div>
          <div class="upload-box">
            <el-upload
              class="upload"
              action=""
              accept="image/jpeg, image/png, image/jpg"
              :on-change="onUploadChange"
              :auto-upload="false"
              :show-file-list="true"
              :file-list="imgList"
              list-type="picture-card"
              :limit=1>
              
            <el-button size="medium" type="info" round>上传文章封面图</el-button>
            
            </el-upload>
          </div>
          <textarea v-model="desc" class="desc" placeholder="请输入文章简介"></textarea>
              
            
          
          <el-button class="submit-btn"  type="success" @click="PublishButton" round>文章发布</el-button>
          <el-button class="save-btn" type="primary" @click="PublishSave" round>保存草稿</el-button>
            
        </el-main>
        
  </el-container>
  
</template>

<script>
// Local Registration
import axios from "@/utils/axios";
import qs from "qs"; // post请求传form-data要转换
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "pulishNav",
  data() {
    return {
      md: "", // 文章内容
      title: "", // 文章标题
      // 文章分类
      options: [],
      desc: "",
      category: "", // 文章分类
      textarea: "",     // 简介
      OssUrl: "", // 图片上传aliyun返回的url
      html: "", // markdown解析成html
      tags: "", // 文章标签
      imgList: []
    };
  },
  methods: {
    // 发布文章
    PublishButton() {
      if (this.md && this.title && this.category) {
        // console.log(this.title,this.category)
        // 获取文章之后的处理逻辑
        axios
          .post(
            "/api/admin/createBlog",
            // 构造请求参数form-data
            qs.stringify({title: this.title,category: this.category,headerPic: this.OssUrl,tag: this.tags,desc: this.desc,content: this.md}),
             {headers: {'token': window.sessionStorage.getItem("token")}})
          .then(function(response) {
            // console.log("res:", response);
            if (response.data.code === 200) {alert("文章发布成功！");}}
            ).catch(function(error) {
              // console.log(error);
              });
      }else{
        alert("文章内容不能不空！");
      }
    },
    // 保存文章
    PublishSave() {
      if (this.md && this.title && this.category) {
        // 获取文章之后的处理逻辑
        axios
          .post(
            "/api/v1/article/create",
            // 构造请求参数form-data
            qs.stringify({
              title: this.title,
              category: this.category,
              ossUrl: this.OssUrl,
              desc: this.desc,
              tags: this.tags,
              status: false,
              md: this.md
            })
          )
          .then(function(response) {
            alert("文章保存为草稿！");
          })
          .catch(function(error) {
            // console.log(error);
          });
      } else {
        alert("文章内容不能不空！");
      }
    },

    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },

    onUploadChange(file){
        const _this=this;
        // console.log(file.name);
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
        var head = _this.title.replace(/\s+/g,"_");
        head = head.replace(/\.+/g,"_");
        axios.post("/api/admin/UpLoadImg",qs.stringify({img:this.result,name:head+"_"+file.name,}),
        {headers: { "token": window.sessionStorage.getItem("token") }})
        .then(function(response) {
            if (response.data.code === 200) {
              _this.OssUrl = response.data.url;
            }else{
              alert("上传失败！");
            }
          })
      };
  },

    
  },
  comments: mavonEditor,
  // 钩子 组件加载后运行 查询所有分类
  created: function() {
    // 组件创建之后
    // 在created这个方法中可以操作后端的数据  数据驱动试图
    // 应用：发起Ajax请求

    axios
      .get("/api/admin/getAllCategory",{headers: {'token': window.sessionStorage.getItem("token")}})
      .then(res => {
        // 校验后端返回的code
        if (res.data.code === 200) {
          this.options = res.data.data;
          // console.log(res.data.data);
        } else if (res.data.code === 204){ 
          alert("无数据");
        }
      })
      .catch(err => {
        // console.log(err);
      });
  }
};

</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<style lang="less" >
@import "./local.less";
</style>