import sys

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

for p in pairs(ifile.readlines()):
    ofile.write('<div class="question"> %s </div>'%p[0])
    ofile.write('<div class="answer"> %s </div>'%p[1])


ofile.write("""

</body>
</html>
""")
