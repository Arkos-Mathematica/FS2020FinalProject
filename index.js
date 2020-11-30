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
function newEvent(){
  let eName=document.getElementById("eName").value;
  let `${eName}`= new nEvent(eName);
  eName.info();
}
