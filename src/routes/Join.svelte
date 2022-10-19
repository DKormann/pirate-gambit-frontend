<script>
    import utils from './utils'

    export let user
    export let succ



    let loginError = ""

    function login(){

        if( user.name  && user.password){

            user.passhash = utils.hash(user.password)

            if (user.email == ""){
                loginError = "email cant be empty"
                return 
            }
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
            utils.set_local('email', user.email)

            


            fetch (utils.url + `register/${user.name}/${user.email}/${user.passhash}`,{method:'get'}).then((res)=>{
                console.log(res)
                res.text().then(
                    response=>{
                        console.log({response})
                        let res = JSON.parse(response)
                        console.log(res)
                        if (res[0]){
                            user.loggedIn = true
                            succ()
                        }else{
                            loginError = `${res.details}`
                        }
                    })

                
            })


        }else{

            loginError = "cant be empty"
        }

    
    }

    function doGet(){

        fetch(
            utils.url+'register/john/wilry/undefined',
            {
                method:'GET',
            }
        )
    }
</script>



<h1>
    create account  
</h1>

<h2>

username
<input bind:value= {user.name} type="text">
    
<p></p>

password
<input type = "password" bind:value= {user.password}>

<p></p>

email
<input bind:value={user.email}>


{#if loginError}
    <p style ="color:red">{loginError}
{/if}
    
<p></p>

 <button on:click={login}> join</button>
</h2>
