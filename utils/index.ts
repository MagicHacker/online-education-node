/**
 * 工具包
 */
// 日期格式化
const formatDate = time => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDay()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const senond = date.getSeconds()
  return `${year}-${month <= 10 ? '0' + month : month}-${
    day <= 10 ? '0' + day : day
  } ${hours <= 10 ? '0' + hours : hours}:${
    minutes <= 10 ? '0' + minutes : minutes
  }:${senond <= 10 ? '0' + senond : senond}`
}
// 格式化成功响应
interface SuccessResult {
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any
  total: number
  pageNum: string
  pageSize: string
}
const formatSuccessRes = (result, total, pageNum, pageSize): SuccessResult => {
  return {
    code: 0,
    result,
    total,
    pageNum,
    pageSize
  }
}
module.exports = {
  formatDate,
  formatSuccessRes
}
