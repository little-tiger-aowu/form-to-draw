<template></template>

<script>
import { saveUserInfo, isWinning, isRepeat } from "../api/path";
export default {
  data() {
    return {
      openId: this.$route.query.openId || "", //获取openid
      avatar: this.$route.query.avatar || "",
      nickName: this.$route.query.nickname || "",
    };
  },
  created() {
    this.getOpenId();
  },
  methods: {
    getOpenId() {
      if (this.openId) {
        this.$cookies.set("openId", this.openId);
        this.$cookies.set("avatar", this.avatar);
        this.$cookies.set("nickName", this.nickName);
        this.getAuthorize();
      } else {
        // window.location.href =
        //   "http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=http://192.168.0.109:8080/";
        window.location.href =
          "http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=http://thermo-form-lottery.bt.synconize.com/";
      }
    },

    // 用户登录
    getAuthorize() {
      let data = {
        openId: this.openId,
        wxHeadPortrait: this.avatar,
        wxNickname: this.nickName,
      };
      saveUserInfo(JSON.stringify(data))
        .then((result) => {
          if (result.code == 200) {
            this.isRepeatFrom();
          }
        })
        .catch((err) => {});
    },
    // 判断用户是否已填写表单
    isRepeatFrom() {
      isRepeat(this.openId)
        .then((result) => {
          console.log("是否已填写表单", result);
          if (result.code == 200) {
            this.isGetPrize(result.data.id);
          } else {
            this.$router.replace("/Home");
          }
        })
        .catch((err) => {});
    },
    // 判断用户是否已抽取奖品
    isGetPrize(id) {
      let params = {
        openId: this.openId,
      };
      isWinning(params)
        .then((result) => {
          console.log("是否已抽取奖品", result);
          if (result.data.flag != 2) {
            this.$router.replace({
              path: "/turntable",
              query: { userFormId: id, peizeInfo: result.data },
            });
          } else {
            this.$router.replace({
              path: "/turntable",
              query: { userFormId: id },
            });
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
</style>