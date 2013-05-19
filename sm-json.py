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

import json
id = 0
for p in pairs(ifile.readlines()):
    id += 1
    jsonDict = {
        'id': id, 
        'difficulty': 5,
        'show': 'q', 
        'color': 'color'+str(random.randint(0, 5)), 
        'question': p[0][:-1], 
        'answer': p[1][:-1]
        }
    lines.append(json.dumps(jsonDict))

ofile.write(','.join(lines))

ofile.write("]")
