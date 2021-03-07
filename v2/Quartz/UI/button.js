var TextButton = Component.Create({
    text: "Text for button",
    backgroundColor: Colors.yellow,
    textColor: Colors.red,
    textSize: 20,
    textStyle: "bold"
}, (prop)=>{
    return RawButton(prop, prop.children)
})