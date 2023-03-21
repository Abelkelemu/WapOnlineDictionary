const express = require("express");
var word = require("./word.js")

var getDef = word.getDefinition;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))


app.get('/', function(req,res){
    res.sendFile(__dirname +'/dict.html')
})

app.get("/lookup", async function (req,res){
    let theWord = req.query.word;
    try{
        const result = await getDef(theWord);
        res.status(200).json(result)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Problem.  Please, try again later.' });
    }
})
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})