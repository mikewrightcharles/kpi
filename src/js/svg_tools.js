

function Text(x, y, font_size, fill, orientation, text_content){
    var x, y, font_size, fill, orientation, text_content, font_weight;
    this.x = x || 0; 
    this.y = y || 0;
    this.font_size = font_size || 0;
    this.fill = fill || "black";
    this.orientation = orientation || "left";
    this.text_content = text_content;
    this.font_weight = font_weight || "300";

    this.build = function(){
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("font-weight","300");
        text.setAttribute("font-size", this.font_size + "px"); 
        text.setAttribute("fill", this.fill);
        text.setAttribute("x",this.x);
        text.setAttribute("id",this.type);
        text.setAttribute("font-weight",this.font_weight);
        text.setAttribute("y", this.y);
        if(this.orientation === "left"){
            text.setAttribute("text-anchor","start");
        }
        if(this.orientation === "right"){
            text.setAttribute("text-anchor","end");
        }
        text.textContent = this.text_content;
        return text;
    }
}

function Circle(x, y, r, stroke_width, stroke_color, fill){
    this.x = x;
    this.y = y;
    this.r = r;
    this.stroke_width = stroke_width;
    var stroke_color;
    this.stroke_color = stroke_color || "white";
    var fill;
    this.fill = fill || "none";

    this.build= function(){
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx",this.x);
        circle.setAttribute("cy",this.y);
        circle.setAttribute("r",this.r);
        circle.setAttribute("fill",this.fill);
        circle.setAttribute("stroke",this.stroke_color);
        circle.setAttribute("stroke-width",this.stroke_width);
        return circle;
    }
}

function Arrow(x, y, color, angle){
    this.x = x || 0;
    this.y = y || 0;
    var path;
    this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.color = color || "white";
    var body_height, angle, body_width_sides, arrow_width, arrow_height;
    this.arrow_height = arrow_height || 10;
    this.arrow_width = arrow_width || 10;
    this.body_height = body_height || 0;
    this.body_width_sides = body_width_sides || 0;
    this.angle = angle || 0;
    this.build = function(){
        this.path.setAttribute("id","arrow");
        this.path.setAttribute("stroke","black");
        this.path.setAttribute("stroke-width","0");
        this.path.setAttribute("fill", this.color);
        switch(this.angle){
            case "up":
                this.angle="0";
                break;
            case "right":
                this.angle="90";
                break;
            case "down":
                this.angle="180";
                break;
            case "left":
                this.angle="270";
                break;
            case "top-right":
                this.angle="45";
                break;
            case "down-right":
                this.angle="135";
                break;
            case "down-left":
                this.angle="225";
                break;
            case "top-left":
                this.angle="315";
                break;
            default:
                this.angle = angle;
                break;
        }
        var x1 = this.x - (this.arrow_width/2);
        var x2 = x1 + this.arrow_width;
        var x3 = (this.arrow_width/2) + x1;
        var y1 = this.y + (this.arrow_height/2);
        var y2 = y1;
        var y3 = y1 - this.arrow_height;
        var x4 = x1;
        var y4 = y1;

        var arrow_body_height = this.body_height;

        //Arrow Thickness
        var x5 = x1 + this.body_width_sides;
        var y5 = y1;
        var x6 = x5;
        var y6 = y1 + arrow_body_height;

        var x7 = x2 - this.body_width_sides;
        var y7 = y6;
        var x8 = x7;
        var y8 = y1;

        var path_coordinates = "M " + x1 + " " + y1 + " L " + x2 + " " + y2 + " L " + x3 + " " + y3 + " L " + x4 + " " + y4 + " L " + x5 + " " + y5 + " L " + x6 + " " + y6 + " L " + x7 + " " + y7 + " L " + x8 + " " + y8;
        var x_center_coordinates = x1 + (this.arrow_width/2);
        var y_center_coordinates = y3 + (this.arrow_height/2);

        this.path.setAttribute("d", path_coordinates);
        this.path.setAttribute("transform", "rotate(" + this.angle + " " + x_center_coordinates + " " + y_center_coordinates + ")");
        
        return this.path;
    }
}