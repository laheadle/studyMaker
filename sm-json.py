import sys, random

fname = sys.argv[1]

ifile = open(fname+'.txt', 'r')
ofile = open('./json/'+fname+'.json', 'w')

ofile.write("[")

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

ofile.write("]")
