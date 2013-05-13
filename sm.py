import sys, random

fname = sys.argv[1]

ifile = open(fname+'.txt', 'r')
ofile = open(fname+'.html', 'w')

ofile.write("""
<!doctype html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="./sm.js"></script>
<link type="text/css" href="./t.css" rel="stylesheet"></link>

<body>
<div id="message">Let the learning begin.</div>
<div id="wrapper">

""")

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

random.seed(12345)

for p in pairs(ifile.readlines()):
    ofile.write('<div class="pair"><div class="question %s"><button class="delete" title="delete forever">X</button>%s</div>'%('color'+str(random.randint(0, 5)), p[0]))
    ofile.write('<div class="answer">%s</div></div>'%p[1])


ofile.write("""
</div>
</body>
</html>
""")
