define
(['stepCon'],

 function (stepCon) {

     var sheet = {cname: 'sheet'}

     var cards = [{cquestion: 'question1', 
                   canswer: 'answer1', 
                   cdifficulty: 5, 
                   cshow: 'q', 
                   ccolor: 'color1'}]

     return function(pool, callb){
         var conn = null
         stepCon(
             pool,
             function (connection) {
                 conn = connection
                 conn.query('insert into tsheet SET ?', sheet, this)
             },
             function (result) {
                 cards[0].csheet = result.insertId
                 conn.query('insert into tcard SET ?', cards[0], callb)
             }
         )
     }
 }
)

