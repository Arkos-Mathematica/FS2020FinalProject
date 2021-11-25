//class for events
class nEvent {
  constructor(eName,time=0,date=0,length=100) {
    this.eName=eName;
    this.time=time;
    this.date=date;
    this.length=length;
  }
  //info is primarily for testing purposes
  //random comment
  random_function()
  {
    alert('hellow')
  }
  info()
  {
    alert(`${this.eName} is at ${this.time} on ${this.date}`)
  }
  //shows event
  display()
  {
    //find canvas
    var canvas = document.getElementById("calCan");
    var ctx = canvas.getContext("2d");
    //rectangle
    ctx.fillStyle="#FF0000";
    ctx.fillRect(this.date*document.getElementById('calendar').offsetWidth/7, this.time, document.getElementById('calendar').offsetWidth/7, this.length);
    //border
    ctx.fillStyle="#000000";
    ctx.strokeRect(this.date*document.getElementById('calendar').offsetWidth/7, this.time, document.getElementById('calendar').offsetWidth/7, this.length);
    //time & name text
    ctx.fillStyle="#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText(this.eName, this.date*document.getElementById('calendar').offsetWidth/7+10, this.time+20);
    //write time using length values in pixels
    ctx.fillText(`${toTime(this.time)}-${toTime(this.time+this.length)}`, this.date*document.getElementById('calendar').offsetWidth/7+10, this.time+40);
  }
}

function toTime (time){
  //convert input to 4 digit value (using a ternary statement and length)
  let full = (time<10? `000${String(time)}`: time<100? `00${time}`: time<1000? `0${time}`: `${time}`);
  //template literal with ternary operator determining second expression, containing another template literal
  return `${full.slice(0,2)}:${String(Number(full.slice(2))*.6).length==1? `0${Number(full.slice(2))*.6}`:Number(full.slice(2))*.6}`;
}

//create object to act as list of existing events
var eList = {};

function newEvent(){
  //get input from document.
  let name=document.getElementById("eName").value;
  let time=Number(document.getElementById("startTime").value);
  let date=Number(document.getElementById("day").value);
  let length=Number(document.getElementById("length").value);

  //dynamically add new instance in object using bracket notation
  //two ternary statements combined to avoid disappearing events and events being cut off for extending over a day
  //this is used to allow for a string (value of a text input) to be associated with an event
  name in eList? alert('Sorry, an event with this name already exists. Try renaming or adding a number to the end of this event to differentiate it.'): time+length>2400? alert('This event extends into the next day. To ensure it is correctly displayed, please separate it into two events.'): eList[name]= new nEvent(name,time,date,length);

  //mandatory audio effect. Sound from zapsplat.com
  let newRing = new Audio('mediaSources/addEventSound.mp3');
  newRing.play();
  //show it
  eList[name].display();
}

//the following two functions are based on Framework Television's video "Canvas Tutorial: Fit to Screen": https://youtu.be/InrYeaIyKhY. The video explains how to to resize a canvas to a window and deal with resizing. It effectively calls a function whenever the event listener for a "resize" is set off. The function that resizes the canvas effectively takes the 2d canvas element and adjusts the built in width and height properties.
//I edited down the functions and fit the canvas to a div using the "Determining the dimensions of Elements" page by MDN: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
{
  window.onload = function(){
    //calls the function to redraw the canvas when the page is resized
    init();
    window.addEventListener('resize',init,false);
  }
  function init() {
    //set canvas width to the calendar div width (which automatically adjusts using css)
    document.getElementById('calCan').getContext('2d').canvas.width =(document.getElementById('calendar').offsetWidth);
    //set calendar height
    document.getElementById('calCan').getContext('2d').canvas.height = 2400;
    //set form height to minimum or page height, whichever is larger
    document.getElementById('form').style.height = `${(window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)<670? 670: (window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)}px`;
    //set div height to equate to form height
    document.getElementById('calendar').style.height = `${(window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)<670? 670: (window.innerHeight-(document.getElementsByTagName('h1')[0].offsetHeight)-80)}px`;
    //show all events
    let e;
    for (e in eList){
      eList[e].display();
    }
  }
}
function remove (){
  //find the canvas and property to remove
  let eRemove=document.getElementById('eRemove').value;
  let canvas = document.getElementById('calCan');
  let ctx = canvas.getContext('2d');
  //remove the property from the list
  delete eList[`${eRemove}`];
  //required audio
  //bell sound by Daniel Simion, found on http://soundbible.com/2206-Tolling-Bell.html
  let delBell = new Audio('mediaSources/deleteEventBell.mp3');
  delBell.play();

  //clear the canvas and show all remaining events
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let a;
  for (a in eList){
    eList[a].display();
  }
}
