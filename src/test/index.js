var arr = [
    { "id":4, "parent":2 },
    { "id":1, "parent":null },
    { "id":2, "parent":1 },
    { "id":5, "parent":3 },
    { "id":3, "parent":1 },
]
  
var childrenMap = {
    "root" : [{ id:1, parent:null }],
    '1' : [{ id:2, parent:1 }, { id:3, parent:1 }],
    '2' : [{ id:4, parent:2 }],
    '3' : [{ id:5, parent:3 }],
    '4' : [],
    '5' : []
}
  