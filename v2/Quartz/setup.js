appdata = {
    "name": "App Name",
    "icon": "/asset/icon.png",
    "main": "/app/main.js",
    ...appdata
}
document.title = appdata.name;
let appIcon = document.createElement("link");
appIcon.rel = "icon";
appIcon.href = appdata.icon;
document.head.appendChild(appIcon);