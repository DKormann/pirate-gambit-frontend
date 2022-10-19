<script>
    export let data


    function get_piece_class(){
                return (
                    "piece " + ("t"+data[1])+
                    (data[0]? ' me': ' enemy')+
                    ' c'+(data[2])%12
                    )

            }
</script>

<div class = {get_piece_class()}></div>


<style>
    .piece{
        height:100%;
        width:100%;

        background: transparent;
        background-image: url('../assets/pieces.png');
        background-size: 20em;
        
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
</style>