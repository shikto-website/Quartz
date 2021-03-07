var quartzConfig  ={
    appBase: document.getElementById("appBase")
}

var Temp = {
    usedID:{}
}

var UI = {}
var ComponentData = {}

var Quartz = {
    Render(children){
        var parent = quartzConfig.appBase;
        children = children || [];
        
        Component.addChildren(children, parent)
    },
    generateID(id){
        function genID(_id){
            if(_id && _id != null && Temp.usedID[_id]){
                genID("ID_" + Math.random());
            }else{
                return _id;
            }
        }
        return genID(id)
    }
}

var Component = {
    addChildren(children, parent){
        if(children && parent){
            let childrenCount = children.length;
            for(i=0; i<childrenCount; i++){
                let c = children[i];
                if(c && c != null){
                    if(c instanceof Array){
                        this.addChildren(c, parent)
                    }else{
                        parent.appendChild(c)
                    }
                }
            }
            return parent
        }
    },

    Create(properties, renderFunction){
        return function (){            
            let children = [];
            let inputProperties = {};

            let argCount = arguments.length;
            if(argCount == 1){
                let a = arguments[0];
                if(a instanceof Array){
                    children = a;
                }else if(typeof a == "object"){
                    inputProperties = a;
                }
            }else if(argCount == 2){
                inputProperties = arguments[0];
                children = arguments[1];
            }

            let id = Quartz.generateID(inputProperties.id);

            let finalProperties = {};
            ComponentData[id] = {};
            UI[id] = {};
            UI[id].render = renderFunction;

            finalProperties = {...properties, children, ...inputProperties, id};

            for(i in finalProperties){
                let key = i;  
                let value = finalProperties[key];
                ComponentData[id][key] = value;
                Object.defineProperty(UI[id], key, {
                    get: function () {
                        return ComponentData[id][key]
                    },
                    set: function (newValue) {
                        ComponentData[id][key] = newValue;
                        UI[id].render(ComponentData[id]);
                    }
                })
            }

            return renderFunction(ComponentData[id])
        }
    },

    CreateRaw(tag, attr, child){
        console.log("attr", attr)
        let e;
        if(attr.id){
            let eID = document.getElementById(attr.id);
            if(eID){
                e = eID;
            }else{
                e = document.createElement(tag);
            }
        }
        this.setAttribute(e, attr);
        if(child){
            this.addChildren(child, e);        
        }
        return e;
    }, 

    setAttribute(rawElement, arttibutes){        
        let allProperties = {
            id(dt){
                if(dt && dt != null){
                    e.id = dt;
                }
            },
            text(dt){
                e.innerHTML = dt;
            },
            innerHTML(dt){
                e.innerHTML = dt;
            },
            classNames(dt){
                if(dt instanceof Array){
                    dt.forEach(v=>{
                        e.className = v + " " + e.className;
                    })
                }else{
                    e.className = dt;
                }                
            },
            
            backgroundColor(dt){
                e.style.backgroundColor = dt;
            },

            height(dt){
                let p = e.style.height;
                if(dt == "fill"){
                    p = "100px";
                }else if(typeof dt =="number"){
                    p = dt + "px";
                }else{
                    p = dt;
                }
            },
            width(dt){
                let p = e.style.width;
                if(dt == "fill"){
                    p = "100px";
                }else if(typeof dt =="number"){
                    p = dt + "px";
                }else{
                    p = dt;
                }
            },
            size(dt){
                let p = e.style.width;
                if(typeof dt == "number"){
                    p = dt + "px";
                    p = dt + "px";
                }else if(st instanceof Array){
                    p = dt[0] + "px";
                    p = dt[1] + "px";
                }                
            },

            padding(dt){
                let p = e.style.padding;
                if(typeof dt == "number"){
                    p = dt + "px";
                }else if(dt instanceof Array){
                    p = `${dt[0]}px ${dt[1]}px ${dt[2]}px ${dt[3]}px `;
                }else{
                    p = dt;
                }
            },
            margin(dt){
                let p = e.style.margin;
                if(typeof dt == "number"){
                    p = dt + "px";
                }else if(dt instanceof Array){
                    p = `${dt[0]}px ${dt[1]}px ${dt[2]}px ${dt[3]}px `;
                }else{
                    p = dt;
                }
            },

            borderRadius(dt){
                let p = e.style.borderRadius;
                if(typeof dt == "number"){
                    p = dt + "px";
                }else if(dt instanceof Array){
                    p = `${dt[0]}px ${dt[1]}px ${dt[2]}px ${dt[3]}px `;
                }else{
                    p = dt;
                }
            },

            textSize(dt){
                let p = e.style.textSize;
                if(typeof dt == "number"){
                    p = dt + "px";
                }else{
                    p = dt;
                }
            },
            textColor(dt){
                let p = e.style.color;
                p = dt;
            },
            textStyle(dt){
                let p = e.style["font-weight"];
                let p2 = e.style["font-style"];
                if(dt == "bold"){
                    p = "bold";
                }else if(dt == "italic"){
                    p2 = "italic";
                }else{
                    p2 = dt;
                }
            }
        }

        let e = rawElement;
        for(i in arttibutes){
            let aP = allProperties[i];
            if(aP){
                aP(arttibutes[i])
            }
        }
    }
}