import request from '@/utils/request'
// 提交表单信息
export function formInfo(data) {
    return request({
        Accept: 'json',
        url: '/form',
        method: 'POSt',
        data
    })
}


// 判断用户是否已提交过表单
export function isRepeat(openId) {
    return request({
        url: `/user/${openId}`,
        method: 'GET',
    })
}


// 获取奖品列表
export function getPrizeList() {
    return request({
        url: '/prize',
        method: 'GET',
    })
}

// 抽取奖品
export function lottery(data) {
    return request({
        url: '/prize',
        method: 'POST',
        data
    })
}


// 添加收货地址
export function saveAddress(data) {
    return request({
        Accept: 'json',
        url: '/form/saveAddress',
        method: 'POST',
        data
    })
}

// 保存用户登录信息
export function saveUserInfo(data) {
    return request({
        Accept: 'json',
        url: '/user',
        method: 'POST',
        data
    })
}



// 是否已抽奖或已领取奖品
export function isWinning(params) {
    return request({
        url: '/prize/isWinning',
        method: 'GET',
        params
    })
}