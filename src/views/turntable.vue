<template>
  <div id="turntable">
    <LuckyWheel
      ref="myLucky"
      width="300px"
      height="300px"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    />
    <!-- 弹出层 -->
    <div>
      <van-dialog v-model="show" title="标题">
        <span>123456</span>
      </van-dialog>
    </div>
    <!-- 奖品弹出层 -->
    <van-overlay :show="showOverlay" @click="show = false">
      <div class="overlayItem">
        <img :src="lotteryPrize.picture" alt="" />
        <span>{{ lotteryPrize.name }}</span>
        <div class="bottonBox">
          <van-button @click="addressShow = true" type="primary"
            >添加地址</van-button
          >
          <van-button @click="clockOverlay()" type="info">关闭弹窗</van-button>
        </div>
      </div>
    </van-overlay>
    <!-- 填写地址 -->
    <van-dialog
      @confirm="confirm"
      v-model="addressShow"
      title="收货地址"
      show-cancel-button
    >
      <van-field
        border
        v-model="addressValue"
        label="地址"
        placeholder="请输入您的收货地址"
      />
    </van-dialog>
  </div>
</template>

<script>
import { getPrizeList, lottery, saveAddress } from "../api/path";
export default {
  data() {
    return {
      show: false,
      prizeImg: {},
      addressShow: false,
      addressValue: "",
      blocks: [
        {
          padding: "18px",
          imgs: [
            {
              src: require("../assets/image/wheel-borde.png"),
              width: "100%",
              height: "100%",
            },
          ],
        },
      ],
      prizes: [], // 抽奖内容区设置
      buttons: [
        { radius: "50px", background: "#ef3035" },
        { radius: "45px", background: "#ef1d55" },
        {
          radius: "40px",
          background: "#f0695a",
          pointer: true,
          fonts: [{ text: "开始\n抽奖", top: "-20px" }],
        },
      ], // 抽奖按钮设置
      userFormId: this.$route.query.userFormId,
      index: 0, // 中奖产品下标
      showOverlay: false, // 弹窗遮罩层
      lotteryPrize: [], // 抽中物品
      openId: this.$cookies.get("openId"),
      isLuckyDraw: true,
    };
  },
  created() {
    this.prizeList();
    let fromInfo = this.$route.query;
    if (fromInfo.peizeInfo) {
      if (fromInfo.peizeInfo.prize) {
        this.lotteryPrize = fromInfo.peizeInfo.prize;
        this.showOverlay = true;
        this.isLuckyDraw = false;
      }
    }
  },
  methods: {
    // 添加地址
    confirm() {
      let data = {
        consigneeAddress: this.addressValue,
        id: this.userFormId,
      };
      saveAddress(JSON.stringify(data))
        .then((result) => {
          if (result.code == 200) {
            this.$toast({
              message: result.msg,
            });
          }
        })
        .catch((err) => {});
    },
    // 获取抽奖奖品列表
    prizeList() {
      getPrizeList()
        .then((result) => {
          console.log(result);
          for (let i = 0; i < result.data.length; i++) {
            let prizelist = {
              id: result.data[i].id,
              fonts: [{ text: result.data[i].name, fontSize: 13, top: "10%" }],
              background: i % 2 === 0 ? "#eef0ff" : "#fbf7f4",
              imgs: [
                {
                  src: result.data[i].picture,
                  width: "40%",
                  height: "40%",
                  top: "45%",
                },
              ],
            };
            this.prizes.push(prizelist);
          }
        })
        .catch((err) => {});
    },
    // 点击抽奖按钮会触发star回调
    startCallback() {
      // 调用抽奖组件的play方法开始游戏
      if (this.isLuckyDraw) {
        this.$refs.myLucky.play();
        // 获取中奖信息
        let data = {
          userFormId: this.userFormId,
          openId: this.openId,
        };
        lottery(data)
          .then((result) => {
            this.isLuckyDraw = false;
            this.lotteryPrize = result.data;
            for (let i = 0; i < this.prizes.length; i++) {
              if (result.data.id == this.prizes[i].id) {
                console.log(this.prizes[i]);
                this.index = i;
              }
            }
          })
          .catch((err) => {});
      } else {
        this.$toast({
          message: "您已抽取过奖品",
        });
      }

      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(this.index);
      }, 3000);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      this.showOverlay = true;
    },
    clockOverlay() {
      this.showOverlay = false;
      // this.$router.go(-2);
      // this.$router.replace("/Home");
    },
  },
};
</script>

<style lang="less" scoped>
#turntable {
  height: 100vh;
  width: 100%;
  background-image: url("../assets/image/gift-bgimg.png");
  background-size: 100% 100%;
  div {
    margin: 0 auto;
    padding-top: 50%;
  }
  .title {
    height: 13vh;
    padding-top: 30px;
    display: flex;
    justify-content: center;
    // background-image: url("../assets/image/top_ing.png");
    background-size: cover;
    font-family: "XBT";
    font-size: 8vw;
    color: #293adc;
    span {
      width: 70%;
      text-align: center;
    }
  }
  .title1 {
    display: flex;
    padding-top: 10px;
    justify-content: center;
    color: #999;
    font-size: 3vw;
  }
}
.van-button__content {
  padding-top: 0 !important;
}
.van-dialog {
  padding-top: 0 !important;
}
.overlayItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  img {
    margin-bottom: 30px;
    margin-top: 90px;
    width: 40%;
  }
}
.bottonBox {
  width: 70%;
  display: flex;
  justify-content: space-between;
  padding-top: 30px !important;
}
.van-field {
  padding-top: 10px !important;
}
/deep/ .van-field__label {
  width: 2.2em !important;
}
</style>