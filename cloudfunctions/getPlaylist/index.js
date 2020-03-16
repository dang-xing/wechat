// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rp = require('request-promise')
const db=cloud.database()
const URL = 'http://musicapi.xiecheng.live/personalized'


// 云函数入口函数
exports.main = async (event, context) => {
  const playList= await rp(URL).then((res)=>{
    return JSON.parse(res).result;
  })
  console.log(playList);
  for(let i=0,len=playList.length;i<len;i++){
      await db.collection('playlist').add({
        data:{
          ...playList[i],
          createTime:db.serverDate(),
        }
      }).then((res)=>{
        console.log('插入成功')
      }).catch((err)=>{
        console.log('插入失败')
      })
  }
 
}