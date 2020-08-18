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
testKPI.start();
/*
Features to add:
---------------
.load(data) - done

1.select area to add wireframe
2.append wireframe
3.create KPIs


wireframe class
- Holds ids of all KPIs


Options:
--------
    Target based KPI <- working on
        - Set target (json or code)
    History Target based KPI
        - Colors calculated based on previous measures

    ** For warning range -> kpi.setWarning(100)

    const sales_kpi = new KPI();
    sales_kpi.load("data_file.json");
    ** if not in the data file:
    ** sales_kpi.target = 8928;
    sales_kpi.warningRange(100);
    sales_kpi.refresh(60);
    wireframe.append(sales_kpi);
*/


function KPI(){

    this.start = function(){
        console.log("HELLO@@@@");
        let element = this.build(this.kpiStructure);
        console.log("KPI structure:");
        console.log(element);
        this.loadKPI("tools/js/data_file_4.json");
        setTimeout(()=>{
            console.log("Data:");
            console.log(this.data);
            console.log("Let's start to build KPI...");
            this.addValues(element);
        },2000);
    };

    this.addValues = function(element){

        /*
            1 - Grab parent to append KPI 
            2 - Build KPI using structure
            3 - add content using this.data
            4 - append completed element to parent KPI
        */

        // 1
        let uiBody = document.getElementsByClassName("ui-body")[0];
        // 2
        //let KPI_tag = this.build(this.kpiStructure);
        //console.log(KPI_tag);
        // 3 - create addData()
        element = this.addKPIData(element, this.data[0]);
        console.log(element);
        // 4 
        uiBody.appendChild(element); 
        
    };

    this.addKPIData = function(element, data){
        //add src .png to img class "img-tag"

        const image = element.querySelector("img");
        image.src = "./tools/img/visitors.png";

        console.log("KPI image:");
        console.log(image);
        //measureTitle
        const titleElement = element.getElementsByClassName("measureTitle")[0];
        titleElement.innerText = data.title || "";
        //tag-value ** change data files 'description' to 'value' **
        const valueElement = element.getElementsByClassName("tag-value")[0];
        valueElement.innerText = data.value || "";
        //tag-value-diff ** also change style color
        const diffElement = element.getElementsByClassName("tag-value-diff")[0];

        //check target in JSON or this.target
        if(data.target){
            const arrowElement = element.getElementsByClassName("measure-arrow-path")[0];
            const differance = data.value - data.target;
            if(data.value > data.target){
                //set color green
                arrowElement.setAttribute("D", "M 0 10 L 10 10 L 5 4");
                arrowElement.setAttribute("style", "fill:'#6b9c37';stroke:0;");
                element.setAttribute("style", "border-left: 2px solid #85c990;");
                diffElement.setAttribute("style", "color:#6b9c37;");
                diffElement.innerText = differance || "";
            }else{
                //set color red
                //rotate when red **
                //arrowElement.setAttribute("transform", "rotate(180)");
                arrowElement.setAttribute("D", "M 0 10 L 10 10 L 5 4");
                arrowElement.setAttribute("style", "fill:'red';stroke:0;");
                element.setAttribute("style", "border-left: 2px solid #de7a7a;");
                diffElement.setAttribute("style", "color:red;");
                diffElement.innerText = differance || "";
            }
        }else{
            console.log("no target provided");
        }
        return element;
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
        class : "ui-tag",
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



