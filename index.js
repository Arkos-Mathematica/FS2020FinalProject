class nEvent {
  constructor(eName,time=0,date=0,length=100) {
    this.eName=eName;
    this.time=time;
    this.date=date;
    this.length=length;
  }
  info()
  {
    alert(`${this.eName} is at ${this.time} on ${this.date}`)
  }
  display()
  {
    var canvas = document.getElementById("calCan");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle="#FF0000";
    ctx.fillRect(this.date, this.time, 150, this.length);
  }
}
var eList = {};
function newEvent(){
  //get input from document. time and date not yet in html
  let name=document.getElementById("eName").value;
  let time=Number(document.getElementById("drop down").value);
  let date=0;

  //dynamically add new instance in object, allowing for bracket notation call
  eList[name]= new nEvent(name,time,date);
  //testing
  eList[name].info();
  eList[name].display();
  console.log(eList);
}
