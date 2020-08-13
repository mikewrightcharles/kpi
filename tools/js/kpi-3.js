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
let storageID = new IDStorage();
//let _itParent = this.IndexGenerator(888);
//let _itMenu = this.IndexGenerator(299);
/*
console.log("Id generated: "+storage.ids.newID());
console.log("All: "+ storage.ids.cache);
*/

let data = [{
    title : "July 14th",
    description : "$827,324", 
    state : "safe" 
},{
    title : "July 13th",
    description : "$747,332", 
    state : "safe" 
},{
    title : "July 12th",
    description : "$647,126", 
    state : "safe"
}]; 

const salesKPI = new KPI();
salesKPI.load(data);
salesKPI.run();

console.log(salesKPI.id);
//console.log(salesKPI.itParent);
//console.log(salesKPI.itMenu);

function KPI(){
    this.data = [];
    this.id = "kpi-"+storageID.ids.newID();
  //  this.itParent = _itParent;
  //  this.itMenu = _itMenu;
    this.load = function(dataIn){
        //can process from CSV file here - future update **
        this.data = dataIn; 
    };
    this.structure = {
        type : "div",
        class : "ui-tag-expand-item",
        other : "yes",
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
        const newElement = document.createElement(obj.type);
        newElement.setAttribute("class", obj.class);
        if(obj.other){console.log("this object has other attributes");}
        if(element){element.append(newElement)}
        if(obj.children){
            for(item of obj.children){
                this.build(item, newElement);
            }
        }
        return newElement;
    }

    this.state = (value)=>{
        switch(value){
            case "safe":
                return "./tools/svg/check_green.png"
            case "warning":
                return "./tools/svg/check_warning.png"
            case "danger":
                return "./tools/svg/check_danger.png"
            default:
                return "./tools/svg/default.svg"
        }
    }

    this.IndexGenerator = function *(index){
        const ui = 99999;
        const uiHeader = 299;
        //let index = 299;
        while(true){
            yield --index;
        }
    }

    this.process = function(element, data){
        const title = element.getElementsByClassName("ui-tag-expand-content-title")[0];
        title.innerText = data.title || "";

        const description = element.getElementsByClassName("ui-tag-expand-content-desc")[0];
        description.innerText = data.description || "";

        const image = element.querySelector("img");
        image.src = this.state(data.state);

        return element;
    }
    this.tagSize = 92;
    this.expandStyleClass = "";

    this.loadTag = function(tagId, itParent, itMenu, dataIn){

        const parentTag = tagId;
        const data = dataIn;

        const parentTagSize = (this.tagSize * data.length)+1;

        let parentTagClass = "";

        let expandStyleClass = '.ui-tag-expand{min-height:92px;font-family: "Montserrat";'+
            'font-size:15px;border-bottom:1px solid rgba(0, 0, 0, 0.048);background:#f9f9f9;'+
            'margin-top:-'+parentTagSize+'px;position:relative;'+
            'transition:margin-top 1.8s cubic-bezier(0.23, 1, 0.32, 1);}'+
            '.ui-tag-expand-after{margin-top:0;}';

        let uiTagStyleTag = document.createElement("style");
        uiTagStyleTag.innerText = expandStyleClass;

        let container = document.createElement("div"); 
        container.setAttribute("class", "ui-tag-expand");

        //each data item
        data.forEach(item=>{
            let element = this.build(this.structure);
            element = this.process(element, item);
            container.append(element);
        });

        const tag= document.getElementById(parentTag);
        tag.addEventListener('click', ()=>{
            container.classList.toggle("ui-tag-expand-after");
        });
        
        tag.setAttribute("style", "z-index:" + itParent.next().value);
        container.setAttribute("style", "z-index:" + itMenu.next().value);

        document.body.append(uiTagStyleTag);
        tag.after(container);
    }
    
    //constructor - manual, look into automatic
    this.run = function(){
        let itParent = this.IndexGenerator(888);
        let itMenu = this.IndexGenerator(299);

        this.loadTag(this.id, itParent, itMenu, this.data);
    }
}



/*
    ==================
    FUTURE DEVELOPMENT
    ==================
    **New Features


    const salesKPI = new KPI();
    salesKPI.name = "Total Sales"; 
    salesKPI.description = "Sales - Nov 2019";
    salesKPI.value = 1184;
    salesKPI.target = 1100;

    const data = [{
        name : "Total Sales",
        description : "Sales - Nov 2019",
        value : 1184,
        target : 1100 
    },
        name : "Total Sales",
        description : "Sales - Nov 2018",
        value : 1008,
        target : 900
    },
    {
        name : "Total Sales",
        description : "Sales - Nov 2017",
        value : 880,
        target : 700
    },
    {
        name : "Total Sales",
        description : "Sales - Nov 2016",
        value : 743,
        target : 600
    },
    {
        name : "Total Sales",
        description : "Sales - Nov 2015",
        value : 487,
        target : 300 
    }];
    
    salesKPI.history = historyData;
    salesKPI.refresh();


    const area = document.getElementById('');
    area.append(salesKPI);

    -----------------------------------------------
    data = [{
        title : "Week 3",
        description : "4005", 
        state : "warning" 
    },{
        title : "Week 2",
        description : "3090", 
        state : "warning" 
    },{
        title : "Week 1",
        description : "3011", 
        state : "warning"
    }]; 
    this.loadTag("item-2", itParent, itMenu, data);

    data = [{
        title : "Week 3",
        description : "$178", 
        state : "danger" 
    },{
        title : "Week 2",
        description : "$125", 
        state : "danger" 
    },{
        title : "Week 1",
        description : "$64", 
        state : "danger"
    }]; 
    this.loadTag("item-3", itParent, itMenu, data);

    -----------------------------------------------

    const data = [{
        name : "Total Sales",
        description : "Sales - Nov 2019",
        value : 1184,
        target : 1100 
    ,
        name : "Total Sales",
        description : "Sales - Nov 2018",
        value : 1008,
        target : 900
    ,
        name : "Total Sales",
        description : "Sales - Nov 2017",
        value : 880,
        target : 700
    ,
        name : "Total Sales",
        description : "Sales - Nov 2016",
        value : 743,
        target : 600
    ,
        name : "Total Sales",
        description : "Sales - Nov 2015",
        value : 487,
        target : 300 
    }];


*/
