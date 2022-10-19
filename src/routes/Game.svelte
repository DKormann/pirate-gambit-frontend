<script>
    import { start_hydrating } from "svelte/internal";


    import Piece from "./Piece.svelte"

    
    export let state
    
    export let my_number;
    export let make_move;
    export let opponents;

    let data = state.data
    

    let oldoffset = [4,4]

    $: {

        if (state.offset != oldoffset){
            active = [
                active[0] + oldoffset[1] - state.offset[1],
                active[1] + oldoffset[0] - state.offset[0],
            ]
            oldoffset = state.offset
        }
    }

    const costs = [9,3,3,5,1]

    let active = [-5,-5]
    let spawning = false
    let spawn_target = 1

    let update_freq = 20
    let energy_regen = .2

    setInterval(()=>{
        if (state.energy <= 10){
            state.energy = Math.min(state.energy + energy_regen/update_freq,10)
        }
    },
    1000/update_freq
    )


function get_piece_info(d){


    if (d == undefined){
        return [0,0]
    }

    if (d[0] == -1){
        return [false,0]
    }

    let player_num = d[0]
    let is_mine = player_num == my_number

    let piece = d[1]


    return [is_mine,piece,player_num]
}

function clicked(x,y){

    let target_info = state.data[x+y*9]


    if (target_info[1] == 1 ){
        spawning = true
    }else{
        spawning = false
    }


    if ( true ) {

        let oldnum = coord_to_num(active[0],active[1])

        let newnum = coord_to_num(x,y)

        if (newnum == oldnum){
            return 
        }

        make_move(oldnum,newnum,spawn_target,(res)=>{

            if (res){
                spawn_target = 0
            }
        })
    }

    set_active(x,y)
}

function set_active(x,y){

    let old = document.querySelector("#t"+active[0]+active[1])
    if (old){
        old.classList.remove("active")
    
    }


    active = [x,y]

    let tile = document.querySelector("#t"+x+y)
    tile.classList.add("active")

}

function coord_to_num(x,y){
    return x+y*9
}

function tileclass(d,o){


    if  (d[0] == -1){
        return "water tile"
    }

    if (d[1] != 0){
        return `c${d[0]} tile`
    }

    return ["light","dark"][o%2] + " tile"

}

function piececlass(d){


    if (d[1] == -2){
        return "piece treasure"
    }

    if (d[1] <= 0){
        return ""
    }


    if (d[1] == 1 && spawn_target > 1 && d[0] == my_number){
        return `piece t${spawn_target}`
    }


    return `piece t${d[1]}` + (d[0] == my_number ? "" : ' enemy')
}

function prep_spawn(x){
    spawn_target = x +2
}

function get_piece_tag(x){

    if (x[1]==1){

        let name = opponents.reduce((a,b)=>a[1] == x[0]?a:b)[0]
        name = name.split(' ')[0]
        return name.slice(0,8)

    }
    return  ""
}

</script>

<div class=board>

    {#if state.got_treasure}
        <h2>you got the treasure</h2>
        <h2>get to the left border!</h2>
        <p></p>

    {:else if state.treasure_holder == -1}
        <h2>find the treasure at the center!</h2>
    {:else}

        <h2>{opponents.reduce((a,b)=>a[1] == state.treasure_holder?a:b)[0]} found the treasure!</h2>
        <!-- {state.treasure_holder} -->
        <p></p>
    {/if}

    {#each {length:9} as _ , x}
        <div class = row>
            {#each {length:9} as _,y}
                <div 
                class={ (x==active[0]&&y==active[1]?'active ':'') + tileclass(state.data[x+y*9], state.offset[0]+state.offset[1]+x+y )}  
                id={"t"+x +y}
                on:click={()=>clicked(x,y)}
                >

                    <div

                    class = {piececlass(state.data[x+y*9])}
                    >
                    <p class=pinfo>{get_piece_tag(state.data[x+y*9])}</p>
                
                    </div>

                </div>
            {/each}
        </div>
    {/each}

    <p></p>

    {#if spawning}
        <div class = row>

            {#each {length: 5} as _,f }

                {#if costs[f] <= state.energy}

                    <div class = "tile" on:click= {()=>{prep_spawn(f)}} >
                        <div class = {`piece t${f+2}`} > </div>
                    </div>

                {/if}

            {/each}

        </div>
    {:else}
        <div class = "tile"></div>
    {/if}
    
    <div class = energybar style = {`width:${state.energy*2.7}em`}>
        <p>{Math.round(state.energy*50)/50}</p>
    </div>

    
</div>
    
<style>
    .board{
        display: inline-block;
    }
    .piece{
        height:100%;
        width:100%;
        background: transparent;
        background-image: url('../assets/pieces.png');
        background-size: 20em;
    }

    .treasure{
        /* background-color: gold; */
        background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='50px' width='120px'><text x='0' y='15' fill='red' font-size='20'>X</text></svg>");

    }

    .energybar{

        margin-top: 1em;
        background-color: #33ffff;
        height:1em;
        color:blue;
        text-align: left;
        font-weight: normal;
        box-shadow: 0 0 7px #00ffff;
    }

    .energybar>p{
        padding-left: .5em;
    }

    

    /* queen */
    .t2{
        background-position-x: 16.5em;
    }
    /* bishop */
    .t3{
        background-position-x: 13em;
    }
    .t4{
        background-position-x: 9.5em;
    }
    /* rook */
    .t5{
        background-position-x: 6em;
    }
    /* pawn */
    .t6{
        background-position-x: 2.9em;
    }

    .enemy{
        background-position-y: 2.9em;
    }

    .active{
        background-color: gold;
        box-shadow: 0 0 15px gold;
    }

    .row{
        padding: 0;
        line-height: 0;
        width: 27em;
    }

    .tile{
        width:3em;
        height:3em;
        display: inline-flex;
    }
    .water{
        background-color: #226;
    }
    .dark{
        background-color: #433;
    }
    .light{
        background-color: #667;
    }

    .c0{
        background-color: blue;
    }

    .c1{
        background-color: red;
    }

    .c2{
        background-color: green;
    }

    .c3{
        background-color: yellow;
    }
    .c4{
        background-color: violet;
    }
    .c5{
        background-color: darkblue;
    }
    .c6{
        background-color: magenta;
    }
    .c7{
        background-color:chocolate;
    }
    .c8{
        background-color: orangered;
    }
    .c9{
        background-color: lime;
    }
    .c10{
        background-color: pink;
    }
    .c11{
        background-color: black;
    }
    .c12{
        background-color: orange;
    }

    .active{
        background-color: gold;
        box-shadow: 0 0 15px gold;
    }

    .pinfo{
        position: absolute;
        color:white;
        text-shadow: 0 0 3px black;
        font-size: .7em;
    }
</style>