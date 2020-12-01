class nEvent {
  constructor(eName,time=0,date=0) {
    this.eName=eName;
    this.time=time;
    this.date=date;
  }
  info()
  {
    alert(`${this.eName} is at ${this.time} on ${this.date}`)
  }
}
var eList = {};
function newEvent(){
  //get input from document. time and date not yet in html
  let name=document.getElementById("eName").value;
  let time=0;
  let date=0;

  //dynamically add new instance in object, allowing for bracket notation call
  eList[name]= new nEvent(name,time,date);
  //testing
  eList[name].info();
  console.log(eList);
}
