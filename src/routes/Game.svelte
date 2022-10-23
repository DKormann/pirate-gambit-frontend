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



    if (target_info && target_info.status && 
    target_info.status.Taken && 
    target_info.status.Taken[1] == 'King'&& 
    target_info.status.Taken[0] == my_number ){
        spawning = true
    }else{

        console.log(target_info)
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

    if (d == null){
        return "water tile"
    }



    if (d.status.Taken){
        return 'tile c' + d.status.Taken[0]
    }

    let safety =''
    if (d.ground=='Safe'){
        safety = ' safe'
    }
    if (d.ground== "Treasure"){
        safety = ' treasure'
    }

    return ["light","dark"][o%2] +safety+ " tile"

}

function piececlass(d){


    if (d == null){
        return ""
    }

    if (d.status == 'Empty'){
        return ""
    }

    if (d.status.Taken){

        let content = d.status.Taken;

        let num = content[0]
        let piece = content[1]
        let is_mine = num == my_number

        if( piece == "King" && is_mine && spawn_target >1){
            return "piece t"+spawn_target
        }

        return "piece " + piece + (is_mine? "" : ' enemy')

    }

    return 'piece error'

   
}

function prep_spawn(x){
    spawn_target = x +2
}

function get_piece_tag(d){

    

    if (d && d.status && d.status.Taken &&d.status.Taken[1] == "King"){

        let num = d.status.Taken[0]
        let name = opponents.reduce((a,b) => a[1] == num? a:b)[0]
        
        name = name.split(' ')[0]
        return name.slice(0,8)
}
    return ''

}

</script>

<div class=board>

    {#if state.got_treasure}
        <h2>you got the treasure</h2>
        <h2>go to the green zone to win!</h2>
        <p></p>

    {:else if state.treasure_holder == -1}
        <h2>get the treasure at the center!</h2>
    {:else}

        <h2>{opponents.reduce((a,b)=>a[1] == state.treasure_holder?a:b)[0]} found the treasure! get his King to win</h2>
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
        <div class = "tile">no </div>
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
    .t2,.Queen{
        background-position-x: 16.5em;
    }
    /* bishop */
    .t3,.Bishop{
        background-position-x: 13em;
    }
    /*knight*/
    .t4,.Knight{
        background-position-x: 9.5em;
    }
    /* rook */
    .t5,.Rook{
        background-position-x: 6em;
    }
    /* pawn */
    .t6,.Pawn{
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

    .dark.safe{
        background-color: rgb(0, 81, 0);
    }
    .light.safe{
        background-color: green;
    }

    .treasure{
        /* background-color: gold; */
        /* background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='100px' width='120px'><text x='0' y='15' fill='red' font-size='40'>X</text></svg>"); */
        background-image: url('../assets/treasure.svg');

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