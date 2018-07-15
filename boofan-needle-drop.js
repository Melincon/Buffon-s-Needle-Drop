import * as Floor from 'floor';
import P5Behavior from 'p5beh';
import * as Display from 'display';
import * as Sensors from 'sensors';

const pb = new P5Behavior();
const NEEDLE_LENGTH = 16;
const DISTANCE_BETWEEN_LINES = 32;
var randomRadianOne;
var randomRadianTwo;
var xCenter;
var yCenter;
var approximation = "Pi is approximatly 2l*n/th for large n"
var probability = "P = 2l/t*Pi"
var legend = "Pi = 3.14, l = Needle Length, \nn = Total Needles, \nt = Gap Between Lines, \nh = total Needles Crossing Lines, \nP=probability"
var authors = "Lawrence Yip && Travis Claus";

function pdfInTermsOfX(x){
    if(0 <= x && x <= t/2)
        return 2/t;
    else return 0;
}

function pdfInTermsOfTheta(theta){
    if(0 <= theta && theta <= Math.PI/2)
        return 2/Math.PI;
    else return 0;
}

function jointProbabilityFunction(x,theta){
    if((0 <= x && x <= t/2) && (0 <= theta && theta <= Math.PI/2))
        return 4/(t*Math.PI);
    else return 0;
}

function didNeedleCross(x,length,theta){
    if(x <= (length/2)*Math.cos(theta))
        return true;
    else return false;
}

function probabilityOfCrossing(length,t){
    switch(length>t){
        case false:
            return (2*length)/t*Math.PI;
        case true:
            return ((2/Math.PI)*Math.acos(t/length) + (2/Math.PI)*(length/t)*(1-Math.sqrt(1-Math.pow((t/length),2))));
    }
}
function approximationForPi(totalNeedles,totalIntersectingNeedles,length,distanceBetweenLines){
    return (2*length*totalNeedles)/(totalIntersectingNeedles*distanceBetweenLines);
}

class Needle{
    constructor(length,center){
        this.length = length;
        this.center = center;
    }
    get length(){
        return this.length;
    }
    set length(length){
        this.length = length;
    }
    get center(){
        return this.center;
    }
    set center(){
        this.center = center;
    }
    static buildNeedle(length,center){
        return new Needle(length,center);
    }
}

class Plane{
    constructor(lines){
        this.lines = lines;
    }
    get lines(){
        return this.lines;
    }
    set lines(lines){
        this.lines = lines;
    }
    static buildPlane(lines){
        return new Plane(lines);
    }
}

pb.preload = function(p){
    /*called once before setup
    only for loadImage,loadJSON,
    loadFont,loadStrings*/
}

pb.setup = function(p){
    /*called once when the program starts
    define here screen size and background
    and other initial environment properties
    variables defined here are private*/
    this.createCanvas(576,576);
    this.background('rgba(0,255,0, 0.25)');
    this.text(approximation,10,10,70,80);
    this.text(probability,500,550,567,567);
    this.text(legend,370,10,560,100);
    this.text(authors,10,550,200,567);
    for(var y =32;y < 576;y = y +32)
        this.line(0,y,576,y);
}
pb.draw = function(floor,p){
    /*called directly after setup executes until
    program stops or untill noLoop() is called,
    do not call explicitly. controll with noLoop(),
    redraw(), and loop()*/
    randomRadianOne = this.random(0,2*Math.PI);
    randomRadianTwo = this.random(0,2*Math.PI);
    xCenter = this.random(0,576);
    yCenter = this.random(0,576);
    this.translate(randomRadianOne);
    this.rotate(randomRadianTwo);
    this.line(xCenter - 8,yCenter - 8,xCenter + 8,yCenter + 8);

}

export const behavior = {
    title: "Buffon's Needle Drop",
    init: pb.init.bind(pb),
    render: pb.render.bind(pb),
    frameRate: 20
};
export default behavior