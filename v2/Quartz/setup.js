function initializeApp(){
    function addScript(url){
        var newScript = document.createElement("script");
        newScript.src = url;
        newScript.defer = true;
        document.body.appendChild(newScript);
    }

    fetch("/data/appdata.json")
    .then(response => response.json())
    .then(data =>{
        var appdata = {
            "name": "App Name",
            "icon": "/asset/icon.png",
            "main": "/app/main.js",
            ...data
        }

        document.title = appdata.name;
    
        var appIcon = document.createElement("link");
        appIcon.rel = "icon";
        appIcon.href = appdata.icon;
        document.head.appendChild(appIcon);
    
        var libs = [
            "/Quartz/quartz.js",
            "/Quartz/colors.js",
            
            "/Quartz/UI/raw.js",
            "/Quartz/UI/button.js",
            "/Quartz/UI/card.js",
            "/Quartz/UI/container.js",
            "/Quartz/UI/text.js",

            "/Quartz/API/web.js",

            (appdata.main)
        ]
        
        let mi  = libs.length;
        //for(i = 0; i < mi; i++){
            //addScript(libs[i])
        //}

    });
}



initializeApp()