<template>
  <div class="home">
    <van-row type="flex" justify="center">
      <!-- 头部图片 -->
      <el-col :xs="20" :sm="16" :md="14" :lg="12" :xl="12" class="fromBox">
        <van-col class="header" span="24">
          <!-- <image src="../assets/image/top_ing.png"></image> -->
          <img src="../assets/image/top_ing.png" alt="" />
        </van-col>
        <!-- 文字介绍 -->
        <van-row class="introduce">
          <van-col class="introduceCol" :offset="1" :span="22">
            <h3>赛默飞实验室产品和服务调查问卷</h3>
            <span
              >非常感谢您能够参加调查， 提供您的看法与意见，
              希望能够得到您的大力支持与合作。 我们极其重视数据安全，
              绝不会泄露任何您的隐私信息。 现在我们就马上开始吧！</span
            >
          </van-col>
        </van-row>
        <!-- 表单 -->
        <van-form @submit="submit">
          <van-row type="flex" justify="center" class="Sheet">
            <!-- 姓名 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">1. 您的姓名？</span>
            </div>
            <van-field
              v-model="userName"
              name="userName"
              left-icon="smile-o"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <!-- 手机 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">2. 您的手机？</span>
            </div>
            <van-field
              v-model="phone"
              name="phone"
              type="tel"
              :rules="[{ pattern: rulesPhone, message: '请填写正确的手机号' }]"
            >
              <template #left-icon>
                <span class="icon-shoujihao"></span>
              </template>
            </van-field>
            <!-- 邮箱 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">3. 您的邮箱？</span>
            </div>
            <van-field
              v-model="email"
              name="email"
              left-icon="smile-o"
              :rules="[{ pattern: rulesEmail, message: '请填写正确的邮箱' }]"
            >
              <template #left-icon>
                <span class="icon-youxiangrenzheng"></span>
              </template>
            </van-field>
            <!-- 公司 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">4. 您的公司？</span>
            </div>
            <van-field
              v-model="company"
              name="company"
              :rules="[{ required: true, message: '请填写您的公司名称' }]"
            />
            <!-- 单位地址 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">5. 您的单位地址？</span>
            </div>
            <van-field
              v-model="address"
              name="address"
              :rules="[{ required: true, message: '请填写您的单位地址' }]"
            />
            <!-- 职务 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">6. 您的职务？</span>
            </div>
            <van-field
              v-model="position"
              name="position"
              :rules="[{ required: true, message: '请填写您的职务' }]"
            />
            <!-- 行业 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">7. 您的行业？</span>
            </div>
            <van-field
              name="industry"
              class="radioinput"
              :rules="[{ required: true, message: '请选择您的行业' }]"
            >
              <template #input>
                <van-radio-group v-model="industry" @change="changeIndustry">
                  <van-radio name="科研院校">科研院校</van-radio>
                  <van-radio name="生物制药">生物制药</van-radio>
                  <van-radio name="生命科学">生命科学</van-radio>
                  <van-radio name="临床医药">临床医药</van-radio>
                  <van-radio name="食品饮料">食品饮料</van-radio>
                  <van-radio name="环境检测">环境检测</van-radio>
                  <van-radio name="石油化工">石油化工</van-radio>
                  <van-radio class="other" name="其他"
                    >其他
                    <van-field
                      v-if="isCheckIndustry"
                      v-model="otherIndustry"
                      :rules="[{ required: true, message: '请填写您的行业' }]"
                    />
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 角色 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">8. 您的工作角色？</span>
            </div>
            <van-field
              name="jobRole"
              class="radioinput"
              :rules="[{ required: true, message: '请选择您的工作角色' }]"
            >
              <template #input>
                <van-radio-group v-model="jobRole" @change="changeJobRole">
                  <van-radio name="赛默飞公司的现在客户"
                    >赛默飞公司的现在客户</van-radio
                  >
                  <van-radio name="赛默飞公司未来的新客户"
                    >赛默飞公司未来的新客户</van-radio
                  >
                  <van-radio name="仪器的经销商">仪器的经销商</van-radio>
                  <van-radio name="在校学生">在校学生</van-radio>
                  <van-radio class="other" name="其他非直接客户类型"
                    >其他非直接客户类型
                    <van-field
                      v-if="isCheckOtherRole"
                      v-model="otherRole"
                      :rules="[
                        { required: true, message: '请填写您的工作角色' },
                      ]"
                    />
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 兴趣 -->

            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title"
                >9. 您对赛默飞实验室产品和服务的那些产品感兴趣？</span
              >
            </div>
            <van-field
              name="product"
              class="radioinput"
              :rules="[{ required: true, message: '请选择您感兴趣的产品' }]"
            >
              <template #input>
                <van-checkbox-group v-model="product" @change="changeProduct">
                  <van-checkbox shape="square" name="生物安全柜和超净工作台"
                    >生物安全柜和超净工作台</van-checkbox
                  >
                  <van-checkbox shape="square" name="离心机"
                    >离心机</van-checkbox
                  >
                  <van-checkbox shape="square" name="细胞培养设备"
                    >细胞培养设备</van-checkbox
                  >
                  <van-checkbox shape="square" name="冰箱/液氮等低温存储设备"
                    >冰箱/液氮等低温存储设备</van-checkbox
                  >
                  <van-checkbox shape="square" name="温度控制产品"
                    >温度控制产品</van-checkbox
                  >
                  <van-checkbox shape="square" name="加热、搅拌、混匀产品"
                    >加热、搅拌、混匀产品</van-checkbox
                  >
                  <van-checkbox shape="square" name="纯水系统"
                    >纯水系统</van-checkbox
                  >
                  <van-checkbox shape="square" name="移液器及移液器吸头"
                    >移液器及移液器吸头</van-checkbox
                  >
                  <van-checkbox shape="square" name="实验室器材和耗材"
                    >实验室器材和耗材</van-checkbox
                  >
                  <van-checkbox shape="square" name="水质实验室产品"
                    >水质实验室产品</van-checkbox
                  >
                  <van-checkbox shape="square" name="自动化实验设备"
                    >自动化实验设备</van-checkbox
                  >
                  <van-checkbox shape="square" name="化学品"
                    >化学品</van-checkbox
                  >
                  <van-checkbox
                    label-disabled
                    class="other"
                    shape="square"
                    name="其他"
                    >其他
                    <van-field
                      v-if="isCheckOtherProduct"
                      v-model="otherProduct"
                      :rules="[{ required: true, message: '请填写产品名称' }]"
                    />
                  </van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
            <!-- 购买意向？ -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">10. 购买意向？</span>
            </div>
            <van-field
              name="buyIntention"
              class="radioinput"
              :rules="[{ required: true, message: '请选择您的购买意向' }]"
            >
              <template #input>
                <van-radio-group v-model="buyIntention">
                  <van-radio name="三个月内采购">三个月内采购</van-radio>
                  <van-radio name="半年内采购">半年内采购</van-radio>
                  <van-radio name="一年内采购">一年内采购</van-radio>
                  <van-radio name="一年以后采购">一年以后采购</van-radio>
                  <van-radio name="暂时没有预算计划"
                    >暂时没有预算计划</van-radio
                  >
                </van-radio-group>
              </template>
            </van-field>
            <!-- 是否接受邮件 -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title"
                >11. 您是否同意赛默飞通过电子邮件、电话、短信或者其他
                方式向您发送有关赛默飞产品或者服务信息或与您取得联系？</span
              >
            </div>
            <van-field
              name="isReceive"
              class="radioinput"
              :rules="[
                {
                  required: true,
                  message: '请选择您是否同意接收产品或者服务信息',
                },
              ]"
            >
              <template #input>
                <van-radio-group v-model="isReceive">
                  <van-radio name="true">YES</van-radio>
                  <van-radio name="false">NO</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 同意条款？ -->
            <div class="cellItem">
              <span class="asterisk">*</span
              ><span class="title">11. 您是否已阅读条款并确定？</span>
            </div>
            <van-field
              name="Agreest"
              class="radioinput"
              :rules="[
                { required: true, message: '请您确认已阅读并同意此条款' },
              ]"
            >
              <template #input>
                <van-radio-group v-model="Agreest">
                  <van-radio shape="square" name="true"
                    ><span class="isAgree"
                      >请点击查看详细赛默飞<span style="color: blue"
                        >《个人信息保护政策》</span
                      >，并同意赛默飞 按照该政策处理我的个人信息？</span
                    ></van-radio
                  >
                </van-radio-group>
              </template>
            </van-field>
            <!-- <div class="checkBoxList">
                <van-radio-group v-model="Agreest">
                  <van-radio shape="square" name="1"
                    ><span class="isAgree"
                      >请点击查看详细赛默飞<span style="color: blue"
                        >《个人信息保护政策》</span
                      >，并同意赛默飞 按照该政策处理我的个人信息？</span
                    ></van-radio
                  >
                </van-radio-group>
              </div> -->
            <!-- 提交按钮 -->
            <el-col :span="22" class="SheetItem buttonItem">
              <el-button v-if="nosubmit" native-type="submit" type="primary"
                >提交</el-button
              >
              <el-button v-else native-type="submit" loading type="primary"
                >提交中</el-button
              >
            </el-col>
          </van-row>
        </van-form>
      </el-col>
    </van-row>
  </div>
</template>

<script>
import { formInfo, isRepeat } from "../api/path";
export default {
  name: "Home",
  data() {
    return {
      rulesPhone:
        /^(0|86|17951)?(13[0-9]|15[0-9]|166|17[3678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/, //手机号格式验证
      rulesEmail:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      userName: "", // 姓名
      phone: "", // 手机号码
      email: "", // 邮箱
      company: "", // 公司
      address: "", //地址
      position: "", //职务
      industry: "", //行业
      isCheckIndustry: false, //是否选择其他行业
      otherIndustry: "", // 其他行业
      jobRole: "", // 工作角色
      isCheckOtherRole: false, // 是否选择其他工作角色
      otherRole: "", // 其他工作角色
      product: [], // 感兴趣产品
      isCheckOtherProduct: false, //是否选择其他产品
      otherProduct: "", // 其他产品
      buyIntention: "", // 购买意向
      isReceive: "", //是否接收邮件
      Agreest: "", // 是否已阅读并同意条款
      nosubmit: true,
      openId: this.$cookies.get("openId"),
      // 用户授权登录
    };
  },
  methods: {
    // 其他行业
    changeIndustry(val) {
      if (val == "其他") {
        this.isCheckIndustry = true;
      } else {
        this.isCheckIndustry = false;
      }
    },
    // 其他工作角色
    changeJobRole(val) {
      if (val == "其他非直接客户类型") {
        this.isCheckOtherRole = true;
      } else {
        this.isCheckOtherRole = false;
      }
    },
    // 其他产品
    changeProduct(val) {
      if (val.indexOf("其他") >= 0) {
        this.isCheckOtherProduct = true;
      } else {
        this.isCheckOtherProduct = false;
      }
    },
    submit(val) {
      this.nosubmit = false;
      if (this.isCheckIndustry) {
        val.industry = this.otherIndustry;
      }
      if (this.isCheckOtherRole) {
        val.jobRole = this.otherRole;
      }
      if (this.isCheckOtherProduct) {
        val.product.push(this.otherProduct);
      }
      let data = {
        openId: this.openId, //获取用户openId
        userName: val.userName, // 用户姓名
        phone: val.phone, // 手机号码
        email: val.email, // 邮箱
        company: val.company, // 公司
        address: val.address, // 地址
        position: val.position, // 职务
        industry: val.industry, //行业
        jobRole: val.jobRole, //工作角色
        product: val.product, // 感兴趣的产品
        buyIntention: val.buyIntention, // 购买意向
        isReceive: JSON.parse(val.isReceive), //是否愿意接收邮件
        Agreest: JSON.parse(val.Agreest), //是否已同意并阅读条款
      };
      console.log("data", data);
      formInfo(JSON.stringify(data))
        .then((result) => {
          if (result.code == 200) {
            setTimeout(() => {
              this.$router.push({
                path: "/turntable",
                query: { userFormId: result.data.id },
              });
            }, 1000);
            // isRepeat(result.data.id)
            //   .then((result) => {
            //     console.log(result.data);
            //     if (!result.data) {
            //       setTimeout(() => {
            //         this.nosubmit = true;
            //       }, 1500);
            //     } else {
            //       this.nosubmit = true;
            //       this.$toast({
            //         message: result.msg,
            //       });
            //     }
            //   })
            //   .catch((err) => {});
          }
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="less" scoped>
.fromBox {
  margin-top: 10px;
}
.header {
  background-color: #9741ea;
  height: 15vh;
  white-space: pre-wrap;
  img {
    width: 100%;
    height: 100%;
  }
}
.introduce {
  height: auto;
  background-color: white;
  .introduceCol {
    h3 {
      margin-bottom: 5px;
    }
    span {
      line-height: 1.5;
      font-size: 14px;
    }
  }
}
.other {
  display: flex;
  align-items: flex-start;
}
.Sheet {
  background-color: white;
  padding-top: 40px;
  .SheetItem {
    margin-bottom: 25px;
  }
  .radioinput {
    padding: 10px 0;
    border: 0px;

    /deep/ .van-field__control {
      width: 100%;
      .van-radio-group {
        width: 100%;
      }

      .van-radio-group :not(:last-child) {
        border-bottom: 0;
      }
      .van-checkbox-group {
        width: 100%;

        .van-checkbox {
          border: 1px solid #e0e0e0;
          padding: 6px;
        }
      }
      .van-checkbox-group :not(:last-child) {
        border-bottom: 0;
      }

      .van-radio {
        width: 97%;
        padding: 6px;
        border: 1px solid #e0e0e0;
      }
    }
  }
  .buttonItem {
    text-align: center;
  }
  .checkBoxList {
    div:not(:last-child) {
      border-bottom: 0;
    }
    // .van-radio,
    // .van-checkbox {
    //   padding: 10px;
    //   border: 1px solid #e0e0e0;
    //   /deep/ .van-icon {
    //     width: 1em;
    //     height: 1em;
    //     margin-top: 2px;
    //     line-height: 1;
    //   }
    // }
    // /deep/ .van-radio__label {
    //   font-size: 14px;
    //   font-weight: bold;
    // }
    // /deep/.van-checkbox__label {
    //   font-size: 14px;
    //   font-weight: bold;
    // }
  }
  // .van-button--normal {
  //   padding: 0 45%;
  // }
  .cellItem {
    width: 90%;
    margin: 20px 0 0 0;
    display: flex;
    align-items: flex-start;
    .asterisk {
      color: red;
      margin: 10px 6px 0 0;
    }
    .title {
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      color: rgb(34, 34, 34);
    }
    .isAgree {
      font-size: 14px;
      font-weight: 550;
      color: #999999;
    }
  }
}
.van-cell {
  border: 1px solid #e0e0e0;
  line-height: 16px;
  width: 90%;
  ::after {
    border-bottom: 0;
  }
}
</style>