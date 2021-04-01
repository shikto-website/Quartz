function RawButton(prop, child){
    return Quartz.newElement("button", (prop || {}), (child || []))
}

function RawContainer(prop, child){ 
    return Quartz.newElement("div", (prop || {}), (child || []))
}

function RawText(prop, child){
    return Quartz.newElement("span", (prop || {}), (child || []))
}

function RawTextBox(prop, child){
    return Quartz.newElement("input", (prop || {}), (child || []))
}

function RawImage(prop, child){
    return Quartz.newElement("img", (prop || {}), (child || []))
}

//----------------------------------------

function Button(){
    Quartz.newComponent(this, (prop)=>{
        return RawButton({
            ...prop
        }, this.children)
    })
    this.addClasses(["button", "animation-elevate", "animation-ripple"])
    return this.render({
        innerHTML: this.text,
        ...this.properties
    });
}

function TinyText(){
    Quartz.newComponent(this, (prop)=>{
        return RawText({
            ...prop
        }, this.children)
    })
    this.addClasses([])
    return this.render({
        innerHTML: this.text,
        textSize: 10,
        ...this.properties
    });
}

function SmallText(){
    Quartz.newComponent(this, (prop)=>{
        return RawText({
            ...prop
        }, this.children)
    })
    this.addClasses([])
    return this.render({
        innerHTML: this.text,
        textSize: 13,
        ...this.properties
    });
}

function BigText(){
    Quartz.newComponent(this, (prop)=>{
        return RawText({
            ...prop
        }, this.children)
    })
    this.addClasses([])
    return this.render({
        innerHTML: this.text,
        textSize: 20,
        ...this.properties
    });
}

function HugeText(){
    Quartz.newComponent(this, (prop)=>{
        return RawText({
            ...prop
        }, this.children)
    })
    this.addClasses([])
    return this.render({
        innerHTML: this.text,
        textSize: 25,
        ...this.properties
    });
}

function Text(){
    Quartz.newComponent(this, (prop)=>{
        return RawText({
            ...prop
        }, this.children)
    })
    this.addClasses([])
    return this.render({
        innerHTML: this.text,
        ...this.properties
    });
}

function TextBox(){
    Quartz.newComponent(this, (prop)=>{
        return RawTextBox({
            ...prop
        }, this.children)
    })
    this.addClasses(["textbox"])
    return this.render({
        ...this.properties
    });
}

function Image(){
    Quartz.newComponent(this, (prop)=>{
        return RawImage({
            ...prop
        }, this.children)
    })
    this.addClasses(["image"])
    return this.render({
        ...this.properties
    });
}

function Container(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["container"])
    return this.render({
        ...this.properties
    });
}

function Card(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["card", "paper", "animation-ripple", "animation-ripple-dark"])
    return this.render({
        ...this.properties
    });
}

function Paper(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["paper"])
    return this.render({
        ...this.properties
    });
}

function FlexibleBox(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["flexible-box"])
    return this.render({
        ...this.properties
    });
}

function StrechBox(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["strech-box"])
    return this.render({
        ...this.properties
    });
}

function Column(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["column"])
    return this.render({
        ...this.properties
    });
}

function Row(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["row"])
    return this.render({
        ...this.properties
    });
}

function ScrollColumn(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["column", "scroll-v"])
    return this.render({
        ...this.properties
    });
}

function ScrollRow(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["row", "scroll-h"])
    return this.render({
        ...this.properties
    });
}

function Circle(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["circle", "center-box"])
    return this.render({        
        height: this.size || 50,
        width: this.size || 50,
        ...this.properties
    });
}

function CenterBox(){
    Quartz.newComponent(this, (prop)=>{
        return RawContainer({
            ...prop
        }, this.children)
    })
    this.addClasses(["center-box"])
    return this.render({
        ...this.properties
    });
}

function Avatar(){
    Quartz.newComponent(this, (prop)=>{
        return Circle({
            padding: prop.size * 0,
            ...prop
        },[
            StrechBox([
                Image({
                    onclick:prop.onclick,
                    src: (prop.src || prop.image) || "https://microsoft.com/favicon.ico"
                })
            ])
        ])
    })
    this.addClasses(["avatar"])
    return this.render({
        ...this.properties
    });
}

function ChatInterphase(){
    Quartz.newComponent(this, (prop)=>{
        return (
            Container({
                classNames:["scroll-v"],
                size:["fill", "fill"], 
                align:"end",
                id: this.id + "_messageBox"
            },[
                Container({
                    classNames:["animation-smoothWidth"]
                },[
                    
                ]),
                
            ])
        )
    })
    
    this.lastMsgEle;
    this.scroll = ()=>{
        if(this.lastMsgEle &&  this.lastMsgEle != null){
            this.lastMsgEle.scrollIntoView({ block: 'end',  behavior: 'smooth' })        
        }
    }
  
    var chatboxID = this.id + "_messageBox";
    this.msgIDCount = 0;
    this.allMessages = {};
    this.addMessage = function (msgData){
        this.msgIDCount++;
        var newMsgID = msgData.id || this.msgIDCount + "";
        var newMsgElement = (
            Row({
                align:"start", 
                width:"fill",
                padding:[0,5,0,5]
            },(
                ChatMessageTemplate({
                    message: msgData.message || "This is a sample message",
                    type: msgData.type || "text",
                    senderName: msgData.senderName || "Sender",
                    senderAvatar: msgData.senderAvatar || "https://microsoft.com/favicon.ico",
                    timestamp: msgData.timestamp || 1500000,
                    meSender: msgData.meSender || false,
                    sent: msgData.sent
                })          
            ))            
        )

        if(allMessages[newMsgID]){
            $$(newMsgID).Element.innerHTML = newMsgElement.innerHTML
        }else{
            newMsgElement.id = newMsgID
            this.allMessages[newMsgID] = (
                newMsgElement
            )
            $$(chatboxID).addChildren([
                newMsgElement
            ])
            this.lastMsgEle = newMsgElement;
            newMsgElement.scrollIntoView({ block: 'end',  behavior: 'smooth' })
        }

        //$$(newMsgID).Element.scrollIntoView(false)
    }
    return this.render({
        ...this.properties
    });
}

function ChatMessageTemplate({message, type, id, senderName, senderAvatar, timestamp, meSender, sent}){
    var msgBody;
    if(type == "text"){
        msgBody = (
            Text({text:replaceAll(message, "\n", "<br />")})
        )
    }else if(type == "image"){
        msgBody = (
            Image({src:message})
        )
    }

    return (
        (
            (()=>{
                if(!meSender){
                    return [
                        Avatar({size:30, src:senderAvatar}),
                        Card({
                            borderRadius:10,
                            backgroundColor:Colors.light_blue  ,
                            textColor:Colors.white,    
                            maxSize:[null, "70%"]            
                        }, [msgBody])
                    ]
                }else{
                    return [
                        FlexibleBox({
                        }),
                        Card({
                            borderRadius:10,
                            backgroundColor:Colors.white  ,
                            textColor:Colors.black,    
                            maxSize:[null, "70%"]          
                        }, [
                            Column({
                                crossAlign:"end"
                            },[
                                msgBody
                            ])
                        ])
                    ]
                }
            })()            
        )
    )
}




