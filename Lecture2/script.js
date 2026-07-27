const express=require('express');
const app=express();
app.use(express.json());
let Notes=[
    {id:1, title:"Learning Node js",done:false},
    {id:2, title:"Learning Data Science",done:true}
];
  // Home page
 
app.get('/',(req,res)=>{
    res.json('Welcome to Note App');
})

//  Get all notes
app.get('/note',(req,res)=>{
     let result=Notes;
     res.json(result);
})

// Get A note by id
app.get('/note/:id',(req,res)=>{
    let id=Number(req.params.id);
    let note=Notes.find(n=>n.id===id);
    if(!note){
       return res.status(404).json('Note not found');
    };
    res.json(note);
})
 // add a note
app.post('/note',(req,res)=>{
    const title=req.body;
    if(!title){
        return res.status(400).json('Note is empty');
    }
    const newNote={
        id:Notes.length +1,
        title,
        done:false
    }
    Notes.push(newNote);
    res.status(201).json(newNote);
})
// Update a note
app.put('/note/:id',(req,res)=>{
    let id=Number(req.params.id),
    title=req.body;
    let note=Notes.find(n=> n.id===id);
    if(!note){
        return res.status(404).json('Note not found');
    }
    note.title=title;
    res.json(note);
});
 // Delete a note
 app.delete('/note/:id',(req,res)=>{
    let id=Number(req.params.id);
    let note=Notes.find(n=> n.id===id);
    if(!note){
        return res.status(404).json('Note not found');
    }
    let index=Notes.indexOf(note);
    Notes.splice(index,1);
    console.log('Note deleted succcessfully');
    res.json(note);
 });
 // Server running
app.listen(3000,()=>{
    console.log('Running at port 3000');
})