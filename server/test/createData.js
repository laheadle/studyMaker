define
(['stepCon', 'insertCards'],

 function (stepCon, insertCards) {

     var sheet = {cname: 'sheet'}

     var cards = [
         {
             cquestion: 'question1', 
             canswer: 'answer1', 
             cdifficulty: 5, 
             cshow: 'q', 
             ccolor: 'color1'
         },

         {
             cquestion: 'short', 
             canswer: 'answer',
             cdifficulty: 5, 
             cshow: 'q', 
             ccolor: 'color1'
         },

         {
             cquestion: 'tall', 
             canswer: 'answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1 answer1', 
             cdifficulty: 5, 
             cshow: 'q', 
             ccolor: 'color1'
         }
     ]

     return function(pool, callb){
         var conn = null
         stepCon(
             pool,
             function (connection) {
                 conn = connection
                 conn.query('insert into tsheet SET ?', sheet, this)
             },
             function (result) {
                 insertCards(conn, cards, result.insertId, callb)
             }
         )
     }
 }
)

