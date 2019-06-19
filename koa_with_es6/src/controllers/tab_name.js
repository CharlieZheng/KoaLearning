const {query} = require("../data_source/base/query.js")
let getTabList = async (ctx, next) => {
    let result = await query(`select * from tab_name`)

    // ------ 找个时间把这段代码优化一下，现在是 O(n^2) 的时间复杂度「开始」
    let curParentTab
    for (let i = result.length - 1; i >= 0; i--) {
        let item = result[i]
        if (item['parent_tab_id']) {
            if (!curParentTab || curParentTab ['tab_id'] != item['parent_tab_id']) {


                let tempArray = result.filter((item2) => {
                    return item2['tab_id'] === item['parent_tab_id']

                })
                if (tempArray.length > 0) curParentTab = tempArray[0]
            }
            if (!curParentTab['sub']) {
                curParentTab['sub'] = []
            }
            curParentTab['sub'].push(item)
            result.pop()
        }
    }
    // ------ 找个时间把这段代码优化一下，现在是 O(n^2) 的时间复杂度「结束」

    console.log(JSON.stringify(result))
    ctx.response.body = result
    ctx.response.code = 200
    ctx.response.type = "text/json"
    let userAgent = ctx.request.headers['user-agent'] // 浏览器信息
    let ip = ctx.request.headers['host'] // ip
    // https://segmentfault.com/q/1010000009544146/


}
module.exports = {
    "GET /tab/tabList": getTabList
}