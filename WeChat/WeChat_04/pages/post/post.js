// pages/post/post.js
var dataObj = require("../../data/data.js");

Page({
  data: {

  },
  onLoad:function(){
    this.setData({
      postList: dataObj.postList
    })
  }
})