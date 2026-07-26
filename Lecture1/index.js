const express=require('express');
const app=express();
app.use(express.json());
let notes=[
    {id:1, title:"Learning Node js", done:false},
    {id:2, title:"Learning Data Science", done:true}
]
app.get('/',(req,res)=>{
    res.json('Welcom to Note App');
})


  // get note
app.get('/note',(req,res)=>{
    const {done}=req.query;
    let result=notes;
    if(done !== undefined){
        result=notes.filter(n=> String(n.done)==done);
    }
    res.status(200).json(result);
});


 // get not by id
app.get('/note/:id',(req,res)=>{
    let id= Number(req.params.id);
    let note=notes.find(n=> n.id==id);
    if(!note){
        res.status(401).json('Note cannot found');
    }
    res.status(200).json(note);
});

  // add note
app.post('/note',(req,res)=>{
    const title=req.body;
    if(!title){
        res.status(401).json('Title is required');
    }
    const newNote={
        id:notes.length +1,
        title,
        done:false
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.delete('/note/:id',(req,res)=>{
    let id= Number(req.params.id);
    let note=notes.find(n=>n.id==id);
    if(!note){
        res.status(401).json('Note cannot found');
    }
    notes.splice(notes.indexOf(note),1);
    res.status(200).json('Note deleted successfully');
})
app.listen(3000,()=>{
    console.log('Running at port 3000');
})