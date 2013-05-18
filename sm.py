import sys, random

fname = sys.argv[1]

ifile = open(fname+'.txt', 'r')
ofile = open('./www/'+fname+'.html', 'w')

ofile.write("""
<!doctype html>
<html>
<head>
<link type="text/css" href="/css/t.css" rel="stylesheet"></link>

<script id="questions" type="text/json">[""")

def pairs(lst):
    cur = None
    retval = []
    for l in lst:
        if cur is None:
            cur = l
        else:
            retval.append((cur, l))
            cur = None
    return retval

lines = []
random.seed(12345)

for p in pairs(ifile.readlines()):
    lines.append('{"show": "q", "color": "%s", "question": "%s", "answer": "%s"}'%('color'+str(random.randint(0, 5)),p[0][:-1], p[1][:-1]))

ofile.write(','.join(lines))

ofile.write("""]
</script>

<script data-main="js/main.js" src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.5/require.min.js"></script>

<script type="text/template" id="card-template">
  <div class="question <%= color %>">
    <button class="delete" title="delete forever">X</button>
    <%- question %>
  </div>
  <div class="answer <%= show == 'q' ? 'show' : 'hide'%>">
    <%- answer %>
  </div>
</script>

</head>
<body>
<div id="message">Let the learning begin.</div>
<div id="content">
</div>
</body>
</html>
""")
