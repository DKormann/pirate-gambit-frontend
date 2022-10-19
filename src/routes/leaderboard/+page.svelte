<script>

    import utils from "../utils"

    let leaderboard = []

    let yourscore = ""


    fetch(utils.dburl + "leaderboard?select=*&apikey=" + utils.dbkey)
    .then((r)=>{
        r.text().then((t)=>{

            leaderboard = JSON.parse(t)
            console.log(leaderboard)

        })
    })

    let username = utils.get_local("user_name")

    let url = utils.dburl + `pirate_gambit_scores?select="score"&username=eq.${username}&apikey=${utils.dbkey}`

    fetch(url)
    .then((r)=>r.text().then(t=>{
        console.log("personal score:" ,t)
        let item = (JSON.parse(t)[0])

        if (item){

            yourscore = item.score
        }

    }))

    



</script>

<div id = 'leaderboard'>

<h1>LEADERBOARD</h1>

<table>

<tr>
    <th>Rank</th>
    <th>Name</th>
    <th >Score</th>
</tr>

{#each leaderboard as  pirate,i}
    <tr>

        <td>
            {i +1}.
        </td>
        <td>
            {pirate.username}
        </td> 
        <td class = gold>
            {pirate.score} 
        </td>
    </tr>
{/each}


</table>

{#if yourscore}
    <p class = yourscore>your score: <span class = gold>{yourscore}</span></p>
{/if}

<a href="/"><button class = leaderboard>play</button></a>

</div>

<style>



    #leaderboard{
        padding-top: 2em;
        color:var(--active);
        text-align: -moz-center;
        text-align: -webkit-center;

        font-size: 1.5em;
        align-content: center;
    }
    .gold{
        color:gold;
        text-shadow: 0 0 2px #ffd000;
    }
    table, .yourscore{
        align-self: center;
        font-size: 1.5em;
    }
    th{
        padding: 1em;
    }
    td{
        padding-left: 1em;
    }


</style>