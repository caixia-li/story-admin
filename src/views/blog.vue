<template>
  <div>
    <navList></navList>
    <div id="content">
      <el-table :data="blogList" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="createTime" label="日期" width="180" :formatter="formatter"></el-table-column>
        <el-table-column prop="nickName" label="姓名" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="default" @click="handleDetail(scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="详情" :visible.sync="detailDialog" width="30%">
        <div style="margin-bottom:20px;">{{blogDetail.content}}</div>
        <template v-for="(item,index) in imgList">
          <el-image style="width: 33%;" :src="item" :key="index"></el-image>
        </template>
      </el-dialog>

      <el-dialog title="提示" :visible.sync="delDialog" width="30%">
        <span>您确定要删除该博客吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialog = false">取 消</el-button>
          <el-button type="primary" @click="doDel">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import timeFormate from "../utils/timeFormate";
import navList from "../components/navList";
export default {
  components: {
    navList
  },
  data() {
    return {
      blogList: [],
      count: 20,
      detailDialog: false,
      blogDetail: {},
      imgList: [],
      delDialog: false,
      index: -1,
      doc: -1
    };
  },
  created() {
    this.getBlogList();
  },
  mounted() {
    this.$toReachBottom.scroll(this.getBlogList);
  },
  methods: {
    getBlogList() {
      this.$axios
        .post("/blog/getBlogList", {
          start: this.blogList.length,
          count: this.count
        })
        .then(res => {
          let result = res.data.data;
          if (result.length < this.count) {
            this.$toReachBottom.isEnd();
          }
          result.forEach(item => {
            this.blogList.push(JSON.parse(item));
          });
        });
    },
    formatter(row) {
      return timeFormate(row.createTime.$date);
    },
    handleDetail(row) {
      this.detailDialog = true;
      this.blogDetail = row;
      this.imgList = [];
      this.$axios
        .post("/blog/getImgList", { imgList: row.imgList })
        .then(res => {
          let result = res.data.data;
          result.forEach(item => {
            this.imgList.push(item.download_url);
          });
        });
    },
    handleDelete(index, row) {
      this.delDialog = true;
      this.index = index;
      this.doc = row._id;
    },
    doDel() {
      this.delDialog = false;
      this.blogList.splice(this.index, 1);
      this.$axios
        .post("/blog/removeBlog", {
          doc: this.doc,
          imgList: this.blogList[this.index].imgList
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.data,
              type: "success"
            });
          }
        });
    }
  }
};
</script>

<style>
</style>