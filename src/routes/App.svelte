

<script>

    import Start from "./StartGame.svelte"
    import Join from "./Join.svelte"
    import Login from "./Login.svelte"

    import utils from "./utils"

    let want_to_register = true


    let user = {
        name : utils.get_local('user_name'),
        passhash : utils.get_local('pass_hash')
    }

    user.loggedIn = user.name !=undefined

    function login(){
        user.loggedIn = true
    }



</script>



<div class = welcome>


    <!-- {loggedIn} -->
    {#if user.loggedIn == true}

        <Start user = {user} ></Start>

    {:else}

        {#if want_to_register}

            <Join user = {user} succ ={login} />

        {:else}
            <Login user = {user} succ = {login} />

        {/if}

        <button id = "flip" on:click={ ()=>{want_to_register = ! want_to_register} }> {want_to_register? "login" : "register"} instead</button>

    {/if}

</div>



<style>

    .welcome{
        padding: 2em;
    }

    #flip{
        background-color: var(--beta);
        color: var(--active);
        font-style: italic;
        
    }

    
</style>