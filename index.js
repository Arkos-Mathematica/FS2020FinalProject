class nEvent {
  constructor(eName,time=0,date=0,length=100) {
    this.eName=eName;
    this.time=time;
    this.date=date;
    this.length=length;
  }
  //info is primarily for testing purposes
  info()
  {
    alert(`${this.eName} is at ${this.time} on ${this.date}`)
  }
  display()
  {
    //shows event
    var canvas = document.getElementById("calCan");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle="#FF0000";
    ctx.fillRect(this.date*document.getElementById('calendar').offsetWidth/7, this.time, document.getElementById('calendar').offsetWidth/7, this.length);
    ctx.fillStyle="#000000";
    ctx.strokeRect(this.date*document.getElementById('calendar').offsetWidth/7, this.time, document.getElementById('calendar').offsetWidth/7, this.length);
    ctx.fillStyle="#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(this.eName, this.date*document.getElementById('calendar').offsetWidth/7+10, this.time+20);
    ctx.fillText(`${toTime(this.time)}-${toTime(this.time+this.length)}`, this.date*document.getElementById('calendar').offsetWidth/7+10, this.time+40);
  }
}

function toTime (time){
  let full = (time<10? `000${String(time)}`: time<100? `00${time}`: time<1000? `0${time}`: `${time}`);
  return `${full.slice(0,2)}:${String(Number(full.slice(2))*.6).length==1? `0${Number(full.slice(2))*.6}`:Number(full.slice(2))*.6}`;
}

var eList = {};

function newEvent(){
  //get input from document. time and date not yet in html
  let name=document.getElementById("eName").value;
  let time=Number(document.getElementById("startTime").value);
  let date=Number(document.getElementById("day").value);
  let length=Number(document.getElementById("length").value);

  //dynamically add new instance in object, allowing for bracket notation call
  eList[name]= new nEvent(name,time,date,length);

  //mandatory audio effect. Sound from zapsplat.com
  let newRing = new Audio('mediaSources/addEventSound.mp3');
  newRing.play();
  //show it
  eList[name].display();
}

//the following two functions are based on Framework Television's video "Canvas Tutorial: Fit to Screen": https://youtu.be/InrYeaIyKhY
//I edited down the functions and fit the canvas to a div using the "Determining the dimensions of Elements" page by MDN: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
{
  window.onload = function(){
    init();
    window.addEventListener('resize',init,false);
  }
  function init() {
    document.getElementById('calCan').getContext('2d').canvas.width =(document.getElementById('calendar').offsetWidth);
    document.getElementById('calCan').getContext('2d').canvas.height = 2400;
    document.getElementById('form').style.height = `${(window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)<670? 670: (window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)}px`;
    document.getElementById('calendar').style.height = `${(window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)<670? 670: (window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)}px`;
    for (e in eList){
      eList[e].display();
    }
  }
}
function remove (){
  let eRemove=document.getElementById('eRemove').value;
  let canvas = document.getElementById('calCan');
  let ctx = canvas.getContext('2d');
  delete eList[`${eRemove}`];
  //bell sound by Daniel Simion, found on http://soundbible.com/2206-Tolling-Bell.html
  let delBell = new Audio('mediaSources/deleteEventBell.mp3');
  delBell.play();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (e in eList){
    eList[e].display();
  }
}
