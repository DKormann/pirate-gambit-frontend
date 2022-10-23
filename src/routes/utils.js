
const remoteurl = "https://www.tarcarot.com/api/"
const devurl = "http://127.0.0.1:8000/api/"
let url = remoteurl

import {browser} from "$app/environment"

let dburl = "https://fdyzrdylphrevhqfghxd.supabase.co/rest/v1/"
let dbkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeXpyZHlscGhyZXZocWZnaHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUxNTg0ODAsImV4cCI6MTk4MDczNDQ4MH0.TeByafu7L_Yj1blsGWhUg7nXJSQt2_WCBDWFYal7RLM"


export default {
    

    url,
    dburl,
    dbkey,

    hash(string){
        var hash = 0;

        if (string.length == 0) return hash;

        for (var i = 0; i < string.length; i++) {
            var char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        return String(hash);
    },

    request(op = "GET", route, callback = ()=>{} ){

        let Http = new XMLHttpRequest()

        Http.onreadystatechange = ()=>{
            if (Http.readyState == 4){
                callback()
            }
        }

        let dest = `${url}${route}`

        Http.open(op,dest,true)
        Http.send()

    },


    get_local(val){
        if (browser){
            return localStorage[val]
        }else{
            return undefined
        }
    },

    set_local(val,arg){
        if (browser){
            localStorage[val] = arg
        }
    }
}