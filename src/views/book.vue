<template>
  <div>
    <navList></navList>
    <div id="content">
      <form class="form">
        <label for>书号:</label>
        <input type="text" name="bookId" v-model="bookId" />
        <button @click.prevent="onSubmit">添加</button>
      </form>
      <div class="table" lazy="true" v-loading="loading" stripe>
        <template>
          <el-table ref="singleTable" :data="bookList" highlight-current-row style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="封面" width="120">
              <template slot-scope="scope">
                <img :src="scope.row.imgSrc" alt="图片失效" height="50" />
              </template>
            </el-table-column>
            <el-table-column property="title" label="书名" width="300"></el-table-column>
            <el-table-column property="author" label="作者"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>

      <el-dialog title="提示" :visible.sync="delDialog" width="30%">
        <span>您确定要删除该作品吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialog = false">取 消</el-button>
          <el-button type="primary" @click="doDel">确 定</el-button>
        </span>
      </el-dialog>
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
      bookId: "",
      bookList: [],
      count: 10,
      loading: true,
      delDialog: false,
      index: -1,
      selectbookId: -1
    };
  },
  created() {
    this.$toReachBottom.isBottom = false;
    this.getBookList();
  },
  mounted() {
    this.$toReachBottom.scroll(this.getBookList);
  },
  methods: {
    onSubmit() {
      this.$axios.post("/book/addBook", { bookId: this.bookId }).then(res => {
        if (res.data.code == 202) {
          this.$message({
            message: res.data.data,
            type: "warning"
          });
          this.bookId = "";
        }
        if (res.data.code == 200) {
          this.$message({
            message: res.data.data,
            type: "success"
          });
          this.bookId = "";
          this.$toReachBottom.isBottom = false;
        }
      });
    },
    getBookList() {
      this.loading = true;
      this.$axios({
        method: "POST",
        url: "/book/getBooks",
        data: {
          start: this.bookList.length,
          count: this.count
        }
      }).then(res => {
        let result = res.data.data;
        this.loading = false;
        result.forEach(item => {
          this.bookList.push(JSON.parse(item));
        });
        if (result.length < this.count) {
          this.$toReachBottom.isEnd();
        }
      });
    },
    handleDelete(index, row) {
      this.delDialog = true;
      this.index = index;
      this.selectbookId = row.bookId;
    },
    doDel() {
      this.delDialog = false;
      this.bookList.splice(this.index, 1);
      this.$axios
        .post("/book/removeBook", { bookId: this.selectbookId })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: res.data.data,
              type: "success"
            });
          }
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="scss">
.form {
  box-sizing: border-box;
  text-align: right;
  position: fixed;
  top: 0;
  width: 85%;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #cfcfcf;
  padding: 0px 20px;
  z-index: 99;
  background-color: #fff;
  label {
    display: inline-block;
    width: 70px;
    text-align: center;
    color: #afafaf;
  }
  input {
    height: 30px;
    line-height: 30px;
    width: 300px;
    padding: 0px 10px;
    border: 1px solid #afafaf;
    border-radius: 5px;
  }

  input:focus {
    border: 1px solid #1296db;
    outline: none;
  }

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
.table {
  width: 95%;
  margin: 0 auto;
  margin-top: 90px;
  text-align: center;
}
</style>