'use-strict'
$(document).ready(()=>{
    $(document).ajaxStart( ()=> {$("#loader").show()})
    $(document).ajaxStart( ()=> {$("#lookup").hide()})
    $(document).ajaxStop( ()=> {$("#loader").hide()})
    $(document).ajaxStop( ()=> {$("#lookup").show()})
    $("#lookup").click(lookup);
});

function lookup(){
    if($("#word").val().length ==0){
        return;
    }
    $.ajax({
        url: "http://localhost:3000/lookup",
        type: "GET",
        data: { word:$("#word").val()},
        dataType: "json",
        "success" : showDefinition,
        "error": noWord
    })
}

function showDefinition(data){
    var myString = "";
    if(data.length ==0){
        myString = `<li>
                        We're sorry, but the word you're looking for cannot be found in our online dictionary. 
                        It's possible that the word is misspelled or doesn't exist in our database. 
                        Please try searching for a different word or double-checking the spelling. 
                    </li>`
    }
    else{
        for(let i =0 ; i< data.length;i++){
            myString += `<li>
                           <strong>${i+1} - (${data[i].wordtype})</strong> :: ${data[i].definition} 
                        </li>`
        }
    }
    $("#definition").html(myString)
}

function noWord(err){
    var myString = "";
    myString = `<li> ${err.responseJSON.error} </li>`
    $("#definition").html(myString)
}

