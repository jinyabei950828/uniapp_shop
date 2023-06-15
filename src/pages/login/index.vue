<script setup>
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"/>
    </view>
    <view class="login">
      <button class="button phone">
		<text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <button>
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
        <view class="tips">
          登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.viewport{
  padding: 20rpx 40rpx;
}

.logo{
  text-align: center;
  image{
    width:220rpx;
    height:220rpx;
    margin-top:15vh;
  }
}

.login{
  // display: flex;
  // flex-direction: column;
  height:60vh;
  padding:40rpx 20rpx 20rpx;
  .button{
    //width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    height: 80rpx;
    border-radius: 72rpx;
    color:#fff;
    .icon{
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }
}

.phone{
  background-color: #28bb9c;
}

.extra{
  flex: 1;
  padding: 70rpx 70rpx 0;
  .caption{
    width:440rpx;
    line-height: 1;
    font-size: 26rpx;
    color:#999;
    position: relative;
    border:1px solid #ddd;
    text{
      transform: translate(-40%);
      background-color:#fff ;
      position: absolute;
      top: -12rpx;
      left: 50%;
    }
  }

  .options{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70rpx;
    button{
      padding: 0;
      background-color:transparent ;
    }
  }


  .icon{
    font-size: 24rpx;
    color:#444;
    &::before{
      width:80rpx;
      height:80rpx;
      margin-bottom:6rpx;
      font-size: 40rpx;
      border:1px solid #444;
      border-radius: 50%;
    }
  }
}

.tips{
  position: absolute;
  bottom:80rpx;
  left:20rpx;
  right:20rpx;
  text-align: center;
  color: #999;
  font-size: 22rpx;
}
</style>