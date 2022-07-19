<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>镜像仓库</el-breadcrumb-item>
        <el-breadcrumb-item>镜像管理</el-breadcrumb-item>
      </el-breadcrumb></Transition
    >
    <el-card
      style="height: 670px; background-color: #f0f1f3"
      :body-style="{ padding: '0px' }"
    >
      <el-col style="width: 320px">
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <el-select
            v-model="selected"
            placeholder="请选择仓库"
            style="width: 300px; margin-left: 10px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option> </el-select
        ></Transition>
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <div @click="selected = title[0].text">
            <el-card
              id="publicImageCharts1"
              shadow="hover"
              style="height: 180px; width: 300px; margin-top: 5px"
            >
            </el-card></div
        ></Transition>
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <div @click="selected = title[1].text">
            <el-card
              id="publicImageCharts2"
              shadow="hover"
              style="height: 180px; width: 300px"
            >
            </el-card></div
        ></Transition>
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <div @click="selected = title[2].text">
            <el-card
              id="publicImageCharts3"
              shadow="hover"
              style="height: 180px; width: 300px"
            >
            </el-card></div
        ></Transition>
        <el-row style="text-align: center">
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-pagination
              small
              background
              layout="prev, pager, next"
              :page-size="3"
              :total="30"
              :pager-count="5"
            >
            </el-pagination
          ></Transition>
        </el-row>
      </el-col>
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <div style="width: 100%">
          <el-card
            shadow="hover"
            style="height: 650px; margin-left: 10px"
            :body-style="{ padding: '0px' }"
          >
            <el-row>
              <Transition
                appear
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutRight"
              >
                <el-breadcrumb separator=">">
                  <el-breadcrumb-item>镜像仓库</el-breadcrumb-item>
                  <el-breadcrumb-item>镜像管理</el-breadcrumb-item>
                  <el-breadcrumb-item v-if="selected">{{
                    selected
                  }}</el-breadcrumb-item>
                </el-breadcrumb>
              </Transition>
            </el-row>
            <el-row v-if="selected">
              <el-col :span="4" style="margin: 10px">
                <el-input size="mini" placeholder="请输入镜像名称"></el-input
              ></el-col>
              <el-col :span="4" style="margin-top: 10px">
                <el-button type="primary" size="mini" class="el-icon-search"
                  >搜索</el-button
                ></el-col
              >
            </el-row>
            <el-row>
              <el-card
                style="margin-top: 10px; height: 40px"
                :body-style="{ padding: '0px' }"
              >
                <div class="circle" v-if="!isShow" @click="isShow=!isShow">
                  <i
                    class="el-icon-arrow-right"
                    style="margin-top: 4px; margin-left: 4px"
                  ></i>
                </div>
                <div class="circle" v-if="isShow" @click="isShow=!isShow">
                  <i
                    class="el-icon-arrow-down"
                    style="margin-top: 4px; margin-left: 4px"
                  ></i>
                </div>
                <span style="margin-left: 10px">firstImage</span>
              </el-card>
              <el-descriptions style="margin-left: 30px" v-if="isShow">
                <el-descriptions-item label="镜像名称"
                  >firstImage</el-descriptions-item
                >
                <el-descriptions-item label="所属仓库"
                  >default</el-descriptions-item
                >
                <el-descriptions-item label="仓库服务IP"
                  >192.168.0.199</el-descriptions-item
                >
              </el-descriptions>
            </el-row>
            <el-row style="text-align: center" v-if="selected">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
              >
              </el-pagination>
            </el-row>
            <el-result
              style="margin-top: 150px"
              icon="info"
              title="信息提示"
              subTitle="点击左侧镜像仓库查看仓库详细信息"
              v-if="!selected"
            >
            </el-result>
          </el-card></div
      ></Transition>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Images",
  data() {
    return {
      isShow: false,
      Image: [
        [
          { value: 140, name: "总数" },
          { value: 233, name: "已扫描" },
          { value: 128, name: "扫描中" },
          { value: 222, name: "未扫描" },
        ],
        [
          { value: 40, name: "总数" },
          { value: 33, name: "已扫描" },
          { value: 28, name: "扫描中" },
          { value: 22, name: "未扫描" },
        ],
        [
          { value: 4, name: "总数" },
          { value: 3, name: "已扫描" },
          { value: 2, name: "扫描中" },
          { value: 2, name: "未扫描" },
        ],
      ],
      title: [
        {
          text: "公共镜像1",
          left: "center",
          top: "15px",
        },
        {
          text: "公共镜像2",
          left: "center",
          top: "15px",
        },
        {
          text: "公共镜像3",
          left: "center",
          top: "15px",
        },
      ],
      options: [
        {
          value: "公共镜像1",
        },
        {
          value: "公共镜像2",
        },
        {
          value: "公共镜像3",
        },
      ],
      selected: "",
    };
  },
  methods: {
    initEcharts(main, index) {
      let option = {
        title: this.title[index],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          right: "10%",
          top: "33%",
          orient: "vertical",
        },
        series: [
          {
            name: "详细",
            type: "pie",
            radius: [10, 70],
            center: ["25%", "60%"],
            roseType: "radius",
            label: {
              show: false,
            },
            data: this.Image[index],
          },
        ],
      };
      this.$echarts.init(main).setOption(option);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts(document.getElementById("publicImageCharts1"), 0);
      this.initEcharts(document.getElementById("publicImageCharts2"), 1);
      this.initEcharts(document.getElementById("publicImageCharts3"), 2);
    });
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
.el-card {
  margin: 10px;
}
.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 4em;
  background: #99a3bb;
  cursor: pointer;
}
</style>
