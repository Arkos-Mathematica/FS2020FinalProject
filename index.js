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
    //shows event
    var canvas = document.getElementById("calCan");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle="#FF0000";
    ctx.fillRect(this.date, this.time, document.getElementById('calendar').offsetWidth/7, this.length);
    ctx.fillStyle="#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(this.eName, this.date+10, this.time+20);
  }
}
var eList = {};
function newEvent(){
  //get input from document. time and date not yet in html
  let name=document.getElementById("eName").value;
  let time=Number(document.getElementById("startTime").value);
  let date=Number(document.getElementById("day").value);
  let length=Number(document.getElementById("length").value);

  //dynamically add new instance in object, allowing for bracket notation call
  eList[name]= new nEvent(name,time,date);
  //testing
  eList[name].info();
  eList[name].display();
  console.log(eList);
}

//the following two functions are based on Framework Television's video "Canvas Tutorial: Fit to Screen": https://youtu.be/InrYeaIyKhY
//I edited down the functions and fit the canvas to a div using the "Determining the dimensions of Elements" page by MDN: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
{
  window.onload = function(){
    init();
    window.addEventListener('resize',init,false);
  }
  function init() {
    document.getElementById('calCan').getContext('2d').canvas.width =(document.getElementById('calendar').offsetWidth)-15;
    document.getElementById('calCan').getContext('2d').canvas.height = 2400;
  }
}
