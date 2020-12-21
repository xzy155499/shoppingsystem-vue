<template>

  <div id="home">

    <!-- @click="drawer = true" -->
    <el-container style="height: 100%">
      <!-- 左边区域 -->
      <el-aside :width="isCollapse  ? '62px' : '210px'">
        <el-menu style="height: 969px;" :collapse="isCollapse" :unique-opened="true"
                 @select="handleSelect" :router="true" text-color="#fff" :default-active="activationIndex"
                 :collapse-transition="false" active-text-color="#ffd04b" background-color="#545c64">
          <el-menu-item index="">
            <h2>荣荣在线管理系统</h2>
          </el-menu-item>
          <el-submenu :index="item.id+''" v-for="item in menus" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.childMenu" :key="subItem.path">
              <template slot="title">
                <i class="el-icon-menu" style="font-size: 15px"></i>
                <span>{{ subItem.label }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>

      <el-container>
        <!-- 头部区域 -->
        <el-header>

          <!-- 菜单缩进按钮 -->
          <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="toggleCollapse"></el-button>
            <el-button plain icon="el-icon-refresh-right" size="mini"></el-button>
<!--            <i class="el-icon-menu" @click="toggleCollapse"></i>-->
          </div>
          <div class="time">
            <span>{{ year }}</span>
            <small>年</small>
            <span>{{ month }}</span>
            <small>月</small>
            <span>{{ date }}</span>
            <small>日</small>
            <small>{{ nowTime }}</small>
            <small>{{ Day[new Date().getDay()] }}</small>
          </div>

          <div class="r-content">
            <el-dropdown trigger="click" size="mini">
              <span class="el-dropdown-link">
                <el-avatar :size="40" :src="JSONEmp.photo"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logOut" icon="el-icon-switch-button">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-header>

        <!-- 中间区域 -->
        <el-main>


          <el-tabs v-model="editableTabsValue" type="card" closable="closable" @tab-remove="removeTab"
                   @tab-click="tab_click(editableTabsValue)">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            </el-tab-pane>
          </el-tabs>
          <!-- 路由站位符 -->
          <router-view></router-view>

        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>


  export default {
    name: 'home',
    mounted: function () {
      setInterval(this.nowTimes, 1000);
    },
    data() {
      return {
        JSONEmp: {},
        nowTime: '',
        year: '',
        month: '',
        date: '',
        Day: [
          "周日",
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六",
        ],
        //菜单数据
        menus: [],
        emp_id: JSON.parse(sessionStorage.getItem('emp')).emp_id,
        editableTabsValue: "shoppingsystem/home",
        activationIndex: "0",
        isCollapse: false,
        collapse: true,
        search: '',
        flag: true,
        addDialogVisible: false,
        editableTabs: [{
          title: "首页",
          name: "shoppingsystem/home",
        }],
      }
    },
    methods: {
      //退出
      logOut() {
        sessionStorage.clear();
        this.$alert("退出成功！", "提示", {
          confirmButtonText: 'ok'
        })
        this.$router.push("/shoppingsystem/login");
      },
      //获取后端菜单数据信息
      getMenuData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("emp_id", this.emp_id);
        this.$axios.post("queryAllMenu.action",params).then(function (result) {
          _this.menus = result.data;
        }).catch(function (error) {
          console.log(error)
        })
      },
      //折叠菜单栏
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      //选中tab菜单触发事件
      tab_click(index) {
        this.$router.push("/" + index)
        // 对子菜单的联动
        this.activationIndex = "/" + index;

      },
      //点击菜单项触发事件
      handleSelect(key, keyPath) {
        const keys = key.split("/")[1] + "/" + key.split("/")[2];
        var _this = this;
        for (let s = 0; s < this.editableTabs.length; s++) {

          this.editableTabs.map((tabs) => {
            if (tabs.name == keys) {
              _this.editableTabsValue = keys;
              _this.activationIndex = "/" + keys;
              _this.flag = false;
            }
          })

        }
        var _this = this;
        if (this.flag) {
          this.menus.map((item) => {
            const itemList = item.childMenu;
            itemList.map((res) => {
              if (res.path == keys) {
                _this.editableTabs.push({
                  title: res.label,
                  name: keys,
                  content: res.label,
                });
                _this.editableTabsValue = keys;
                _this.activationInedx = "/" + keys;
              }
            });
          });
        }
        this.flag = true;
      },
      //删除 标签页
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
        this.$router.push("/" + activeName)
      },
      //显示当前时间（年月日时分秒）
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
        let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
        let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
        let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
        let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
        this.nowTime = " " + hh + ":" + mm + ':' + ss;
        this.year = year;
        this.month = month;
        this.date = date;
      },
      nowTimes() {
        this.timeFormate(new Date());
      },
    },
    created: function () {
      this.JSONEmp = JSON.parse(sessionStorage.getItem('emp'));
      var emp = this.JSONEmp;
      if (emp == undefined || emp == null || emp == '') {
        this.$router.push("/shoppingsystem/login");
      }else {
        this.getMenuData();
        this.$router.push("/shoppingsystem/home");
      }
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  /*header容器，一个template必须只能有一个容器*/
  header {
    display: flex; /*弹性布局*/
    height: 100%;
    align-items: center;
    justify-content: space-between; /*不用float浮动布局，采用两边布局*/
  }

  /*左边的菜单拉伸按钮*/
  .l-content {
    display: flex;
    align-items: center;
  }

  /*设置图片的大小，以及圆滑度*/
  .r-content .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-breadcrumb__inner a {
    color: #fff;
  }

  .el-tabs__nav .el-tabs__item:nth-child(1) span {
    display: none;
  }

  .contextmenu li {
    margin: 0;
    padding: 0 22px;
  }

  .contextmenu li:hover {
    background: #f2f2f2;
    cursor: pointer;
  }

  .contextmenu li button {
    color: #2c3e50;
  }

  .el-main {
    text-align: center;
  }

  .el-header {
    border-bottom: 1px solid #E6E6E6;
    text-align: center;
  }
  .time{
    color: #666;
  }
  .time span{
    color: #666;
    font-size: 20px;
  }
</style>


