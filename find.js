const net=require("node:net")
l=[];
var testPort = (port,host)=>new Promise((resolve,reject)=>{
        var nsk = new net.Socket();
        nsk.setTimeout(5000);
        nsk.on('connect',function(){nsk.destroy();resolve([port,'open']);})
        .on('timeout',function(){nsk.destroy();resolve([port,'timeout']);})
        .on('error',function(){nsk.destroy();resolve([port,'closed']);});
        nsk.connect(port,host);
    })
    
for(var i=0;i<(15535+1);i++){
    testPort(i,"43.143.144.22").then((p)=>{if(p[1]!="timeout"){console.log(p[0],p[1])}})
}