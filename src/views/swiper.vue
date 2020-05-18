<template>
  <div>
    <navList></navList>
    <div id="content">
      <form class="form">
        <button @click.prevent="updateList">跟新列表</button>
      </form>
      <div class="table" lazy="true" stripe v-loading="loading">
        <template>
          <el-table ref="singleTable" :data="swiperList" highlight-current-row style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="图片" width="300">
              <template slot-scope="scope">
                <img :src="scope.row.imgSrc" alt="图片失效" height="50" />
              </template>
            </el-table-column>
            <el-table-column label="书号" property="bookId"></el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import navList from "../components/navList";
export default {
  components: {
    navList
  },
  data() {
    return {
      swiperList: [],
      bookIdList: [],
      loading: true
    };
  },
  created() {
    this.getSwiperList();
  },
  methods: {
    updateList() {
      this.swiperList = [];
      this.bookId = [];
      this.$axios.post("/swiper/updateSwiper").then(res => {
        this.swiperList = res.data.data;
        res.data.data.forEach((item, index) => {
          this.bookIdList[index] = item.bookId;
        });
        this.$message({
          message: "更新完成",
          type: "success"
        });
        this.addBook();
      });
    },
    getSwiperList() {
      this.$axios.post("/swiper/getSwiper").then(res => {
        this.swiperList = res.data.data;
        this.loading = false;
      });
    },
    addBook() {
      this.bookIdList.forEach(item => {
        this.$axios.post("/book/addBook", { bookId: item });
      });
    }
  }
};
</script>

<style lang="scss">
.form {
  box-sizing: border-box;
  text-align: right;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #cfcfcf;
  padding: 0px 20px;
  button {
    outline: none;
    border: none;
    height: 30px;
    line-height: 30px;
    padding: 0px 10px;
    background-color: #1296db;
    color: #fff;
    border-radius: 5px;
    margin-left: 10px;
  }
}
</style>