<template>
  <div id="index_wapper" class="wapper">
      <el-row>
        <el-col>
          <el-steps :active="active" simple finish-status="success" style="margin-top: 50px">
            <el-step title="确认订单信息"></el-step>
            <el-step title="支付"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <step1 style="margin-top: 20px" @change-step="handleSetStep" v-if="active === 0"></step1>
          <step2 style="margin-top: 20px" v-if="active === 1"></step2>
          <step3 style="margin-top: 20px" v-if="active === 2"></step3>
        </el-col>
      </el-row>
  </div>
</template>

<script>
  import Step1 from './components/Step1'
  // import Step2 from './components/Step2'
  // import Step3 from './components/Step3'

  export default {
    components: {Step1},
    // components: {Step1, Step2, Step3},
    data() {
      return {
        active: 0,
        orderGoods: [],
      }
    },
    methods: {
      handleSetStep(active) {
        this.active = active
        // if (form) this.form = Object.assign(this.form, form)
      },
    },
  }
</script>
<style>
  .wapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
  }

</style>
