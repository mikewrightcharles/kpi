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
let _itParent = IndexGenerator(888);
let _itMenu = IndexGenerator(299);

const salesKPI = new KPI();
salesKPI.load("tools/js/data_file_1.json");


const visitorsKPI = new KPI();
visitorsKPI.load("tools/js/data_file_2.json");


const returnsKPI = new KPI();
returnsKPI.load("tools/js/data_file_3.json");

const testKPI = new KPI();
testKPI.buildKPI();
/*
Features to add:
---------------
.load(data) - done

1.select area to add wireframe
2.append wireframe
3.create KPIs


wireframe class
- Holds ids of all KPIs


*/


function KPI(){
    
    this.buildKPI = function(){
        let element = this.build(this.kpiStructure);
        console.log("KPI structure:");
        console.log(element);
        let uiBody = document.getElementsByClassName("ui-body");
        console.log("UI Body:");
        console.log(uiBody);

        this.loadKPI("tools/js/data_file_4.json");
        setTimeout(()=>{
            console.log(this.data);
        },2000);
    };

    this.data = [];

    this.id = "kpi-"+storageID.ids.newID();

    this.loadKPI = function(path){
        let responseArray = [];
        loadDataFile(path).then(
            results=>{
                this.data = results; 
               // this.loadTag(this.id, _itParent, _itMenu, this.data);
            }
        ).catch(error=>{
            console.log("Oops, error occured:");
            console.log(error);
        });
        function loadDataFile(url){
            return new Promise((resolve, reject)=>{
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
    };

    this.buildKPI = function(){

    };

    this.load = function(path){
        let responseArray = [];
        loadDataFile(path).then(
            results=>{
                this.data = results; 
                this.loadTag(this.id, _itParent, _itMenu, this.data);
            }
        ).catch(error=>{
            console.log("Oops, error occured:");
            console.log(error);
        });
        function loadDataFile(url){
            return new Promise((resolve, reject)=>{
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
    };


    this.kpiStructure = {
        type : "div",
        class : "ui-tag tag-warning",
        other : {
            id : "item-4"
            /* id gets calculated programatically
            from IDStorage obj */
        },
        children : [{
            type : "div",
            class : "ui-tag-img",
            children : [{
                type : "img",
                class : "img-tag",
                other : {
                    src : "./tools/img/visitors.png"
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
                    /* style="color:green/orange/red"
                        depends on target. 
                        this needs to be set programatically */
                },{
                    type : "svg",
                    class : "measure-arrow",
                    children : [{
                        type : "path",
                        class : "measure-arrow-path"
                        /* D="M 0 10 L 10 10 L 5 4"
                            Up or down arrow, 
                            depends on target. 
                            this needs to be set programatically */
                         
                    }]
                }]
            }]
        }]
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
        if(obj.other){
       //     console.log("this object has other attributes");
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
                return "./tools/img/check_green.png"
            case "warning":
                return "./tools/img/check_warning.png"
            case "danger":
                return "./tools/img/check_danger.png"
            default:
                return "./tools/img/check.png"
        }
    };

    this.IndexGenerator = function *(index){
        const ui = 99999;
        const uiHeader = 299;
        //let index = 299;
        while(true){
            yield --index;
        }
    };

    this.process = function(element, data){
        const title = element.getElementsByClassName("ui-tag-expand-content-title")[0];
        title.innerText = data.title || "";

        const description = element.getElementsByClassName("ui-tag-expand-content-desc")[0];
        description.innerText = data.description || "";

        const image = element.querySelector("img");
        image.src = this.state(data.state);

        return element;
    };

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
    };
    
}



/*
    ==================
    FUTURE DEVELOPMENT
    ==================

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

