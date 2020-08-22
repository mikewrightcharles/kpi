this.loadTag2 = function(tagId, itParent, itMenu, dataIn){
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
        
        container.setAttribute("style", "z-index:" + itMenu.next().value);

        document.body.append(uiTagStyleTag);
        tag.after(container);

    };