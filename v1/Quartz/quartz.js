
var App = {
    usedID:{},
    createdScreens: {},
    createdComponents: {}    
}


function replaceAll(text, from, to) {
    if (from && from != "") {
        if (text.split(from).length > 1) {
            return (replaceAll(text.replace(from, to), from, to))
        } else {
            return text
        }
    }    
}

function Query(s){
    var u = s || window.location;
    return (new URL(u).search).toString().slice(1)
    .split('&')
    .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
    b = b.split('=');
    a[b[0]] = decodeURIComponent(b[1]);
    return a;
    }, {});
}


var Quartz = {
    ID(id){
        function regenID(id_) {
            if (!id_ || id_ == null || App.usedID[id_]) {
                id_ = "ID__" + Math.random()
                return regenID(id_)
            } else {
                if (id != id_) {
                    App.usedID[id_] = "used";
                }
                return id_;
            }        
        }
        return regenID(id);
    },
    functions:{
        data: "",
        get Element(){
            return document.getElementById(this.data);
        },
        get HTML(){
            var e = document.getElementById(this.data);
            if(e){
                return e.outerHTML;
            }else{
                return;
            }
        },
        addChildren(c){
            let children = c || [];
            let e = document.getElementById(this.data);
            if(e){
                Quartz.Render(children, e);
            }
        }
    },

    Render(children, parent, doClear){
        var p = parent ? parent : (document.getElementById("app-base"));
        if(doClear){p.innerHTML = ""}
        if (children instanceof Array) {
            addC(children, p);
        } else {
            p.appendChild(children);
        }

        function addC(c, p) {
            c.forEach(v => {                
                if (v && v != undefined && v != null) {
                    var oldElement = document.getElementById(v.id)
                    p.appendChild(v);
                                      
                }
            })
        }
        
        const buttons = document.getElementsByClassName("animation-ripple");
        for (const button of buttons) {
          button.addEventListener("mousedown", (event)=>{createRipple(event, button)});
        }

        return p;
    },

    newElement(tag, attr, child){
        if(!attr){var attr = {}}
        var e = document.createElement(tag);
        var properties = {
            id(dt){
                if(dt){
                    e.id = dt;
                }                
            },
            height(dt){
                if(dt == "fill"){
                    e.style["height"] = "100%";
                }else if(typeof dt == "number"){
                    e.style["height"] = dt + "px";
                }else{
                    e.style["height"] = dt;
                }
            },
            width(dt){
                if(dt == "fill"){
                    e.style["width"] = "100%";
                }else if(typeof dt == "number"){
                    e.style["width"] = dt + "px";
                }else{
                    e.style["width"] = dt;
                }
            },
            maxHeight(dt){
                if(dt == "fill"){
                    e.style["max-height"] = "100%";
                }else if(typeof dt == "number"){
                    e.style["max-height"] = dt + "px";
                }else{
                    e.style["max-height"] = dt;
                }
            },
            maxWidth(dt){
                if(dt == "fill"){
                    e.style["max-width"] = "100%";
                }else if(typeof dt == "number"){
                    e.style["max-width"] = dt + "px";
                }else{
                    e.style["max-width"] = dt;
                }
            },

            size(dt){
                if(dt instanceof Array){
                    if(dt.length == 2){
                        properties.height(dt[0])
                        properties.width(dt[1])
                    }
                }
            },
            maxSize(dt){
                if(dt instanceof Array){
                    if(dt.length == 2){
                        properties.maxHeight(dt[0])
                        properties.maxWidth(dt[1])
                    }
                }
            },

            backgroundColor(dt){
                e.style["background"] = dt;
            },
            textColor(dt){
                e.style["color"] = dt;
            },

            borderRadius(dt){
                e.style["border-radius"] = (typeof dt =="number") ? (dt + "px") : dt;
            },

            padding(dt){
                if(typeof dt == "number"){
                    e.style["padding"] = dt + "px";
                }else if(typeof dt == "object"){
                    e.style["padding"] = `${dt[0]}px ${dt[1]}px ${dt[2]}px ${dt[3]}px `;
                }else{
                    e.style["padding"] = dt;
                }
            },
            margin(dt){
                if(typeof dt == "number"){
                    e.style["margin"] = dt + "px";
                }else if(typeof dt == "object"){
                    e.style["margin"] = `${dt[0]}px ${dt[1]}px ${dt[2]}px ${dt[3]}px `;
                }else{
                    e.style["margin"] = dt;
                }
            },

            textSize(dt){
                if(typeof dt == "number"){
                    e.style["font-size"] = dt + "px";
                }else {
                    e.style["font-size"] = dt;
                }
            },
            textColor(dt){
                e.style["color"] = dt;
            },
            textStyle(dt){
                if(dt == "bold"){
                    e.style["font-weight"] = "bold";
                }else if(dt == "italic"){
                    e.style["font-style"] = "italic";
                }else{
                    e.style["font-style"] = dt;
                }
            },

            align(dt){
                if(dt == "start"){
                    e.style["justify-content"] = "flex-start";
                }else if(dt == "center"){
                    e.style["justify-content"] = "center";
                }else if(dt == "end"){
                    e.style["justify-content"] = "flex-end";
                }
            },
            crossAlign(dt){
                if(dt == "start"){
                    e.style["align-items"] = "flex-start";
                }else if(dt == "center"){
                    e.style["align-items"] = "center";
                }else if(dt == "end"){
                    e.style["align-items"] = "flex-end";
                }
            },
            strech(dt){
                if(dt == true){
                    e.style["align-items"] = "strech";
                }
            },

            grow(dt){
                e.style["flex-grow"] = "1";
                if(typeof dt == "number" || dt == 0){
                    e.style["flex-grow"] = dt;
                }
            },
            shrink(dt){
                e.style["flex-shrink"] = "1";
                if(typeof dt == "number" || dt == 0){
                    e.style["flex-shrink"] = dt;
                }
            },

            innerHTML(dt){
                e.innerHTML = dt;
            },

            animation(dt){

            },

            classNames(dt){
                dt.forEach(v=>{
                    e.className = v + " " + e.className;
                })
            }
        }

        if(attr.id && attr.id != "" && document.getElementById(attr.id)){
            e = document.getElementById(attr.id)
        }

        ObjectLoop(attr, (key, value) =>{
            var tProp = properties[key];
            if(value && value != null){
                if(properties[key]){
                    tProp(value)
                }else{
                    e.setAttribute(key, value)
                    e.style[key] = value;
                }                
            }
        })

        if(child && child instanceof Array){
            e = Quartz.Render(child, e)
        }

        return e;
    },

    Component: function(comp, prop, renderFunction){
        var args = arguments.callee.caller.arguments;
        var inputProp = args[0] || {};
        var inputChild = args[1] || [];
        var id = Quartz.ID(inputProp.id);
        UI[id] = {...inputProp, ...prop.properties};
        var properties = UI[id];

        properties.children = inputChild;

        return {
            render(p){
                renderFunction({...(p || {}), ...properties})
            }
        }
    },

    newComponent: function (component, renderFunction){
        let comp = arguments.callee.caller;
        let args = comp.arguments;

        let prop = {};
        let child = [];

        ObjectLoop(args, ((k, v) =>{
            if(typeof v == "object"){
                if(v instanceof Array){
                    child = v;
                }else{
                    prop = v;
                }
            }
        }))

        let properties = {
            id: Quartz.ID(prop.id),
            children: child,
            render: renderFunction || (()=>{}),
            classNames: [],
            addClasses: (dt)=>{
                dt.forEach(v=>{
                    component.classNames.push(v)
                })
            },
            addProperties: (dt)=>{
                ObjectLoop(dt, (k, v)=>{
                    if(!component[k]){
                        component[k] = v;
                    }
                })
            }
        }

        ObjectLoop({...properties, ...prop}, (key, value)=>{
            Object.defineProperty(component, key, {
                value: value,
                configurable: true
            })
        })

        Object.defineProperty(component, "properties", {
            value: {
                classNames: component.classNames,
                ...prop
            },
            configurable: true
        })

        UI[properties.id] = component;
    },

    instantiate(comp, rArgs, rfunc){        
        let args = (((Object.entries(rArgs)[0]) || [])[1]) || {}; 
        let values ={
            id:Quartz.ID(args.id),
            properties:args,
            child:(rArgs[1] || []),
            class:(args.class || []),
            style:(args.style || {}),
            setDefaultProperties:(dt)=>{
                setFunctionProperty(comp, "properties", {
                    ...(comp.properties), ...(dt || {})
                });
                //console.log(comp.properties)
                return comp;
            },
            setDefaultStyle:(dt)=>{
                ObjectLoop(dt, (key, value) =>{
                    if(!comp.style[key]){
                        setFunctionProperty(comp.style, key, value);
                    }
                });
                return comp;
            },
            setProperties:(dt)=>{
                setFunctionProperty(comp, "properties", {
                    ...(dt || {}), ...(comp.properties)
                });
                return comp;
            },
            addClass(dt){
                dt.forEach(v =>{comp.class.push(v)})
                return comp;
            },
            addStyle(dt){
                ObjectLoop(dt, (key, value) =>{
                    setFunctionProperty(comp.style, key, value);
                });
                return comp;
            },
            remove:()=>{
                let e =document.getElementById(values.id);
                if(e){document.removeChild(e)};                
                return comp;
            },
            render:()=>{
                return rfunc();
            }
        }

        ObjectLoop(values, (key, value)=>{
            this[key] = value;
        })

        return comp;
    }
}

var UI = {

}

function setFunctionProperty(func, key, value){
    Object.defineProperty(func, (key + ""), {
        value:value,
        configurable: true
    })
}

function ObjectLoop(obj, func){
    Object.entries(obj).forEach(v =>{
        func(v[0], v[1])
    }) 
}

class Screen{
    constructor(n, l, oc){
        this.name = Quartz.ID(n);
        this.layout = l || [];
        this.onCreate = oc || (() => {}); 
        App.createdScreens[this.name] = this;

        this.Open = function(){
            Quartz.Render(this.layout, null, true);
            this.onCreate();
        }
        this.Close = function(){
            Quartz.Render([], null, true);
        }
    }       
}

function $$(dt){
    if(dt && dt != null){
        Quartz.functions.data = dt;
        return Quartz.functions;
    }
}

function $$$(dt){
    if(dt && dt != null){
        return App.createdComponents[dt];
    }
}


function createRipple(event, ele) {
    const button = event.currentTarget;
    
  
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${(-1 * (button.getBoundingClientRect().x - event.pageX)) - radius}px`;
    circle.style.top = `${(-1 * (button.getBoundingClientRect().y - event.pageY)) - radius}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
  }
  
