<script>
    import utils from './utils'

    export let user
    export let succ



    let loginError = ""

    function login(){


        user.passhash = utils.hash(user.password)

        if (user.password == ""){
            loginError = "password cant be empty"
            return 
        }
        if (user.name == ""){
            loginError = "username cant be empty"
            return 
        }
        
        utils.set_local('user_name', user.name)
        utils.set_local('pass_hash', user.passhash)



        fetch (utils.url + `login/${user.name}/${user.passhash}`,{method:'get'}).then((res)=>{
            console.log(res)
            console.log({res})
            res.text().then(
                response=>{
                    console.log({response})

                    if (response == "true"){
                        succ()
                    }else{
                        loginError = "password or username incorrect"
                    }
                    
                })
        })
    
    }

    function doGet(){

        fetch(
            '127.0.0.1:8000/api/register/john/wilry/undefined',
            {
                method:'GET',
            }
        )
    }
</script>



<h1>
    login
</h1>

<h2>

username
<input bind:value= {user.name} type="text">
    
<p></p>

password
<input type ="password" bind:value= {user.password}>



{#if loginError}
    <p style ="color:red">{loginError}
{/if}
    
<p></p>

 <button on:click={login}> login</button>
</h2>
