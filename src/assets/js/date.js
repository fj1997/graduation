 export function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(parseInt(shijianchuo));
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'/'+add0(m)+'/'+add0(d);
}
function add0(m){return m<10?'0'+m:m }