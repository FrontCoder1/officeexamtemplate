
/*
*
*
* 计算json文件是否应该显示
* 参数obj为身份的json文件
*
* */
module.exports = function reqmessage(obj){
    var resdata = JSON.parse(obj);
    for(let i=0;i<resdata.length;i++){
        let childrn = resdata[i]['child'];
        for(let j=childrn.length-1;j>=0;j--){
            var child = childrn[j];
            if(child.show ==0){
                childrn.splice(j,1);
            }
        }
    }

    return resdata;
}