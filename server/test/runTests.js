define
(['open'],
 function (open) {
     return function (conf) {
         open('http://'+conf.host+':'+conf.port+'/runTests')
     }
 }
)

