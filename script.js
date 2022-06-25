
//chrome://extensions/
let myLeads = []
const inputEL = document.getElementById("input")
const button = document.getElementById("submitBTN")
const ulEL = document.getElementById("urlList")
const deleteButton = document.getElementById("deleteBTN")
const saveTab = document.getElementById("saveTabBTN")

const loadfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if(loadfromLocalStorage){
    myLeads = loadfromLocalStorage
    render(myLeads)
}else{
    console.log("error")
}

saveTab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ 
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })  
})

function render(leads){
    let listItems = ""
    for (i = 0; i < leads.length; i++){
        // listItems += "<li> <a target='_blank' href='" + myLeads[i] +"'>" + myLeads[i] + "</a> </li>"
        listItems += `
        <li> 
            <a target='_blank' href='${ leads[i] }'> ${leads[i]}</a> 
         </li>`
    }
    ulEL.innerHTML = listItems
 }


deleteButton.addEventListener("dblclick", function (){
       localStorage.clear()
       myLeads = []
       render(myLeads)
})

button.addEventListener("click", function(){
    myLeads.push(inputEL.value)
    inputEL.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    
})



