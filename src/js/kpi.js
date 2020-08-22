(()=>{

function DataWireFrame(){
    this.height = 0;
    this.width = 0;
    this.ids = {
        cache : [],
        id : 1,
        newID : function(){
            let _id = this.id++;
            this.cache.push("item-" + _id);
            return _id;
        }
    };

    this.IndexGenerator = function * (index){
        const ui = 99999;
        const uiHeader = 299;
        //let index = 299;
        while(true){
            yield --index;
        }
    };
    //KPIs get stored here
}
 


function IDStorage(){
    this.ids = {
        cache : [],
        id : 1,
        newID : function(){
            let _id = this.id++;
            this.cache.push("item-" + _id);
            return _id;
        }
    };
}
function * IndexGenerator (index){
    const ui = 99999;
    const uiHeader = 299;
    //let index = 299;
    while(true){
        yield --index;
    }
}
/**Setting up the environment */
let storageID = new IDStorage();
let _itParent = IndexGenerator(888);
let _itMenu = IndexGenerator(299);

let uiTagStyleTag = document.createElement("style");
uiTagStyleTag.innerText = '.ui-tag-expand-after{margin-top:0!important;}.ui-tag-expand-item{box-sizing: border-box;height:92px!important;}';
document.body.append(uiTagStyleTag);

const salesKPI = new KPI();
salesKPI.image = "sales.png";
salesKPI.type = "Money";
salesKPI.load("data_file_4.json");

const visitorsKPI = new KPI();
visitorsKPI.image = "visitors.png";
visitorsKPI.load("data_file_2.json");


const returnsKPI = new KPI();
returnsKPI.image = "returns3.png";
returnsKPI.type = "Money";
returnsKPI.load("data_file_3.json");

function KPI(){

    this.image_root= "src/img/";
    this.root = "src/data/";
    this.image = "";
    this.data = [];
    this.id = "kpi-"+storageID.ids.newID();
    this.element = "";
    this.range = 0;

    this.kpi_data = [];
    this.history_data = [];
    this.kpi_style = "";
    this.kpi_history_style = "";

    this.load = function(file){

        this.loadFile(`${this.root}${file}`).then(
            results=>{
                //data
                this.kpi_data = results.shift();
                this.history_data = results;

                this.element = this.build(this.kpiStructure);
                this.kpi_style += `z-index:${_itParent.next().value};`;
                this.element = this.addData(this.element, this.kpi_data);
                this.element.id = this.id;

                //append to ui
                let uiBody = document.getElementsByClassName("ui-body")[0];
                uiBody.appendChild(this.element);

                //load history
                this.historyElement = this.build(this.structure);
                this.loadHistory();

            }
        ).catch(error=>{
            console.log(`Oops, error occured: ${error}`);
        });
    };
    this.type = "";

    this.addData = function(element, data){
        const thumbnail = element.querySelector("img");
        thumbnail.src = `${this.image_root}${this.image}`;

        const titleElement = element.getElementsByClassName("measureTitle")[0];
        titleElement.innerText = data.title || "";
        const valueElement = element.getElementsByClassName("tag-value")[0];

        let measure_type = "";
        if(/money/i.test(this.type)){
            measure_type = "$";
        }
        valueElement.innerText = `${measure_type}${data.value}` || "";
        const diffElement = element.getElementsByClassName("tag-value-diff")[0];

        //check target in JSON or this.target
        if(data.target){
            //build arrow
            const svg = element.getElementsByClassName("measure-arrow")[0];
            const value = parseInt(data.value); 
            const target = parseInt(data.target); 
            const differance = value - target;
            if(value > target){
                let arrowElement = new Arrow(5,5,"#6b9c37","up");
                arrowElement.arrow_height = 7;
                arrowElement.arrow_width = 9;
                arrowElement = arrowElement.build();

                svg.append(arrowElement);

                this.kpi_style += "border-left: 2px solid #85c990;";
                element.setAttribute("style", this.kpi_style);

                diffElement.setAttribute("style", "color:#6b9c37;");
                diffElement.innerText = `(+${differance})` || "";

            }else{
                let arrowElement = new Arrow(5,5,"red","down");
                arrowElement.arrow_height = 7;
                arrowElement.arrow_width = 9;
                arrowElement = arrowElement.build();

                svg.append(arrowElement);

                this.kpi_style += "border-left: 2px solid red;";
                element.setAttribute("style", this.kpi_style);

                diffElement.setAttribute("style", "color:red;");
                diffElement.innerText = `(${differance})` || "";
            }
        }else{
            throw("no target provided");
        }
        return element;
    };

    this.loadFile = function (url){
        return new Promise((resolve, reject)=>{
            const responseArray = [];
            const request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                try{
                    if (this.readyState == 4 && this.status == 200) {
                        let response = JSON.parse(request.responseText);
                        for(item in response){
                                responseArray.push(response[item]);
                        }
                        resolve(responseArray);
                    }
                }catch(e){
                    reject(e.message);
                }
            };
            request.open("GET", url, true);
            request.send();
        });
    }

    this.kpiStructure = {
        type : "div",
        class : "ui-tag",
        other : {
            id : "test-kpi"
        },
        children : [{
            type : "div",
            class : "ui-tag-img",
            children : [{
                type : "img",
                class : "img-tag",
                other : {
                    src : ""
                }
            }]
        },{
            type : "span",
            class : "tag-content",
            children : [{
                type : "p", 
                class : "measureTitle"
            },{
                type : "p",
                class : "measureValue",
                children : [{
                    type : "span",
                    class : "tag-value"
                },{
                    type : "span",
                    class : "tag-value-diff"
                },{
                    type : "svg",
                    class : "measure-arrow"
                }]
            }]
        }]
    };

    this.structure = {
        type : "div",
        class : "ui-tag-expand-item",
        children : [{
            type : "div",
            class : "ui-tag-expand-icon",
            children : [{
                type : "div",
                class : "ui-tag-expand-icon-line"
            },{
                type : "div",
                class : "ui-tag-expand-icon-image",
                children : [{
                    type : "img",
                    class : "ui-tag-expand-icon-image-el"
                }]
            }]
        },{
            type : "div",
            class : "ui-tag-expand-content",
            children : [{
                type : "p",
                class : "ui-tag-expand-content-title",
                title : ""
            },{
                type : "p",
                class : "ui-tag-expand-content-desc",
                content : ""
            }]
        }]
    };


    this.build = function (obj, element){
        let newElement = "";
        if(obj.type === ("svg"||"circle"||"path"||"rect"||"line"||"text")){
            newElement = document.createElementNS("http://www.w3.org/2000/svg", obj.type);
        }else{
            newElement = document.createElement(obj.type);
        } 
        newElement.setAttribute("class", obj.class);
        if(obj.other){
            for(item in obj.other){
                newElement.setAttribute(item, obj.other[item]);
            }
        }
        if(element){element.append(newElement)}
        if(obj.children){
            for(item of obj.children){
                this.build(item, newElement);
            }
        }
        return newElement;
    };

    this.state = (value)=>{
        switch(value){
            case "safe":
                return "src/img/check_.png"
            case "warning":
                return "src/img/check_warning.png"
            case "danger":
                return "src/img/error_.png"
            default:
                return "src/img/check.png"
        }
    };


    this.process = function(element, data){
        const title = element.getElementsByClassName("ui-tag-expand-content-title")[0];
        title.innerText = data.title || "";

        const description = element.getElementsByClassName("ui-tag-expand-content-desc")[0];
        let measure_type = "";
        if(/money/i.test(this.type)){
            measure_type = "$";
        }
        description.innerText = `${measure_type}${data.value}` || "";

        const value = parseInt(data.value); 
        const target = parseInt(data.target); 
        const target_range = target + this.range;
        const differance = value - target;

        const image = element.querySelector("img");

        if(value > target_range){
            //green
            image.src = this.state("safe");
        }else{
            if(value >= target && value <= target_range){
                //yellow
                image.src = this.state("warning");
            }else{
                if(value < target){
                    //red
                    image.src = this.state("danger");
                }
            }
        }


        return element;
    };

    this.tagSize = 92;
    this.expandStyleClass = "";
    this.menu_index = "";

    this.loadHistory = function(){

        let parentTagSize = (this.tagSize * this.history_data.length)+1;


        let container = document.createElement("div"); 
        container.setAttribute("class", "ui-tag-expand");

        this.history_data.forEach(data_row=>{
            let cell_element = this.build(this.structure);
            cell_element = this.process(cell_element, data_row);
            container.append(cell_element);
        });


        this.element.addEventListener('click', ()=>{
            container.classList.toggle("ui-tag-expand-after");
        });

        this.menu_index = _itMenu.next().value;
        container.setAttribute("style", `z-index:${this.menu_index}; margin-top:-${parentTagSize}px;`);


        this.element.after(container);

    };
    
}



})();
