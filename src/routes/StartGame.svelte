
<script>
    import { update_await_block_branch } from "svelte/internal";
    import Join from "./Join.svelte";
    import Game from "./Game.svelte";

    export let user

    import utils from "./utils"

    let status = 0

    let game_data 

    let token = 0
    let game_id = 0
    let my_number = 0
    let opponents = []
    let view = null
    let end = null
    let winner = null
    let leave = null
    let running_queue = false
    let queue = []

    function joingame(){
        fetch (utils.url + `join_game/${user.name}/${user.passhash}`).then(res=>{
            console.log(res)
            res.text().then(text=>{
                console.log({text})
                let data = JSON.parse(text)
                console.log({data})

                game_data = data

                if (data.Join) {
                    status = 1
                    console.log("got join message")

                    token = data.Join.token
                    game_id = data.Join.game_id
                    my_number = data.Join.number

                    getUpdate()

                }else if (data.Lobby){
                    console.log("got lobby message");
                }else if (data.State){
                    console.log("got state message");
                }

            })
        })
    }

    function getUpdate(){
        console.log("sending update request")
        fetch (utils.url + `get_update/${game_id}/${token}`).then(res=>{
            console.log(res)
            res.text().then(text=>{
                console.log({text})
                let data = JSON.parse(text)
                console.log({data})

                game_data = data

                if (data.Join) {
                    console.log("got join message")
                }else if (data.Lobby){
                    console.log("got lobby message"); 
                    opponents = data.Lobby.players
                }else if (data.State){
                    console.log("got state message");
                    view = data.State
                    status = 2;
                }else if (data.End){
                    status = 3;
                    console.log("got game over message")
                    end = data.End
                    console.log(end);
                    winner = opponents.reduce((a,b)=>a[1] == end.winning_number?a:b)
                    return
                }else if (data == "Leave"){
                    console.log("got leave message")
                    alert("you disconnected from the game")
                    status = 0
                    return 
                }

                getUpdate()
            })
        })
    }

    function startGame(){
        console.log("sending start request")
        fetch (utils.url + `start_game/${game_id}/${token}`).then(res=>{
            console.log(res)
            res.text().then(text=>{
                console.log(text)
            })
        })
    }

    function make_move(start,end,upgrade,callback){

        console.log("sending move")

        fetch(utils.url + `make_move/${game_id}/${token}/${start}/${end}/${upgrade}`, {method: "post"} ).then(answer=>{
            answer.text().then(text=>{
                console.log(text)
                let res = JSON.parse(text)
                callback(res)
            })
        })
    }


    //leave the lobby before the game actually started
    function leavelobby(){
        console.log("leaving lobby")
        fetch (utils.url+ `leave_lobby/${game_id}/${token}`).then(res=>{
            console.log(res);
            res.text().then(text=>{
                console.log(text)
            })
        })
        status = 0
    }

    //leave ongoing game
    function leavegame(){
        console.log("game leave request")
        fetch (utils.url+`leave_game/${game_id}/${token}`).then(response=>{
            console.log(response)


            response.text().then(t=>{
                
                console.log(t)

                let data = JSON.parse(t)

                if (data.End){
                    status = 3;
                    console.log("got game over message")
                    end = data.End
                    console.log(end);
                    winner = opponents.reduce((a,b)=>a[1] == end.winning_number?a:b)
                    status = 3
                    return
                }else{
                    leave = data

                    status = 4
                }

                
            })
        })
    }

</script>

<h2>

    <p class = "usertag" >{user.name}</p>
    
    {#if status == 0}

        <div class = logo></div> 

        <h2 class =gold >Welcome to Tarcarot</h2>


        <button class = "joingame" on:click = {joingame} >Join game</button>

        <p></p>
        <a href="/leaderboard"> 
            <button class = leaderboard>
                leaderboard
            </button>
        </a>


    {:else if status == 1}

        <h2>waiting for players ...</h2>
        
        {#each opponents as [name, num]}

            <p>{name}</p>

        {/each}


        <button class = leaderboard on:click={leavelobby}>leave</button>
        
        {#if opponents.length > 1}

            <button class = "startgame" on:click = {startGame}> Start </button>

        {/if}


    {:else if status == 2}

        <button class = surrender on:click={leavegame}> leave game </button>
    
        <Game state = {view} my_number = {my_number} make_move ={make_move} opponents = {opponents}/>

    {:else if status == 3}

        <h2>GAME OVER</h2>

        <h3>{winner[0]} won {end.value} points!</h3>

        <p></p>

        <button class = "joingame" on:click={joingame}>Play again</button>


        <p></p>
        <a href="/leaderboard"> 
            <button class = leaderboard>
                leaderboard
            </button>
        </a>
    
    {:else if status == 4}

        <h3>you left</h3>
        <h3>score: <span class = gold> {leave.Leave.value} </span></h3>

        <button id = "joingame" on:click={joingame}> Play again </button>

        <a href="/leaderboard">
            <button class=leaderboard>
                leaderboard
            </button>
        </a>
        
    {/if}
    

</h2>

<style>

    .joingame{
        font-weight: bold;
        margin-top: 10vh;
        background-color: #fa2;
        color: white;
        padding:1em;
        border-radius: .5em;
        box-shadow: 0 7px 0 #a61;
    }

    .startgame{
        font-weight: bold;
        margin-top: 5vh;
        background-color: #f62;
        color: white;
        padding:.5em;
        border-radius: .3em;
        box-shadow: 0 7px 0 rgb(196, 78, 28);
    }

    .surrender{
        font-style: italic;
        position: absolute;
        top:1em;
        left:1em;   
        text-decoration: underline;
        color:rgb(207, 0, 0);
        background: none;
    }

    .gold{
        color:#ffe139;
        text-shadow: 0 0 2px rgba(255, 217, 0, 0.849);
    }
    .logo{
        width:20vh;
        height:20vh;
        background-image: url("../assets/icon.svg");
        display: inline-block;

    }
    .leaderboard{

        font-weight: bold;
        margin-top: 5vh;
        background-color: rgb(0, 140, 255);
        color: white;
        padding:.5em;
        border-radius: .3em;
        box-shadow: 0 7px 0 rgb(4, 96, 171);
    }


    .usertag{
        position: absolute;
        right: 1em;
        top:0;
        font-weight: lighter;
        font-size: .7em;
    }


</style>