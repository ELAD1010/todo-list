var id = 1;
var idList = 1;

function addNewList()
{
    taskName = document.getElementById("input-list").value;
    document.getElementById("input-list").value = "";
    var elm = document.createElement("li");
    elm.classList.add("task-list");
    var text = document.createTextNode(taskName);
    elm.appendChild(text);
    //elm.onmouseover = function(){elm.innerHTML = "<b>" + elm.innerHTML + "</b>"};
    //elm.onmouseout = function(){elm.innerHTML = elm.innerHTML.slice(3,elm.innerHTML.lastIndexOf("</"))};
    //elm.setAttribute("onmouseover", "boldText(this);")
    //elm.setAttribute("onmouseout", "unBoldText(this);")
    elm.setAttribute("onclick","addNewTask(this);");
    var ul = document.getElementById("todo-list");
    ul.appendChild(elm);
    localStorage.setItem("listname" + id, elm.outerHTML);
    id = incID(id)
}
function addNewTask(elm)
{
    taskName = elm.innerHTML;//.slice(3,elm.innerHTML.lastIndexOf("</"));
    var listDivArr = document.getElementsByClassName("task-list-div");
    var stringDiv = localStorage.getItem("list" + taskName);
    if(listDivArr.length != 0)
    {
        document.getElementById("main-div").removeChild(listDivArr[listDivArr.length-1]);
    } 

    if(stringDiv)
    {
        var div = document.getElementById("main-div");
        div.innerHTML += stringDiv;
    }
    else
    {
        var taskDiv = document.createElement("div");
        taskDiv.classList.add("task-list-div");
        taskDiv.setAttribute("id", "div1");
        taskDiv.setAttribute("name", taskName);
        var taskList = document.createElement("ul");
        taskList.setAttribute("id", "task-ul");
        taskDiv.innerHTML += "<h3 style='color:black; background-color:grey;'>" + taskName + "</h3>";
        taskDiv.appendChild(taskList);
        taskDiv.innerHTML += "<input type=\"text\" id =\"input-task\"></input>";
        var button = document.createElement("button");
        button.innerHTML = '+';
        button.classList.add("btn");
        button.setAttribute("onclick", "addTask(taskName);");
        taskDiv.appendChild(button);
        var div = document.getElementById("main-div");
        div.appendChild(taskDiv);
        localStorage.setItem("list" + taskName, taskDiv.outerHTML);
    }
}
function addTask(taskList)
{
    var taskDiv = document.getElementById("div1")
    taskName = document.getElementById("input-task").value;
    document.getElementById("input-task").value = "";
    var elm = document.createElement("li");
    elm.classList.add("task");
    elm.setAttribute("name", taskName);
    var text = document.createTextNode(taskName);
    elm.appendChild(text);
    elm.innerHTML = "<hr>" + "<input type=\"checkbox\" id = \"chkbox\" onchange=\"check(this)\">" + elm.innerHTML + "</hr>" 
    var delButton = document.createElement("button");
    delButton.classList.add("btn");
    delButton.classList.add("delete");
    delButton.innerHTML = "-";
    delButton.setAttribute("onclick", "deleteTask(this);");
    elm.append(delButton);
    var editButton =document.createElement("button");
    editButton.classList.add("btn");
    editButton.classList.add("edit");
    editButton.innerHTML = 'Edit';
    editButton.setAttribute("onclick", "editTask(this);");
    elm.append(editButton);
    var ul = document.getElementById("task-ul");
    ul.appendChild(elm);
    taskName = taskList
    localStorage.setItem("list" + taskList, taskDiv.outerHTML);
    
}
function incID(id)
{
    return ++id;
}
function loadLists()
{
    var i, elmStr;
    for(i = 0; i< localStorage.length; i++)
    {
        elmStr = localStorage.getItem("listname" + id++);
        if(elmStr)
        {
            var ul = document.getElementById("todo-list");
            ul.innerHTML += elmStr;
        }
    }

}
function unBoldText(elm)
{
    elm.innerHTML = elm.innerHTML.slice(3,elm.innerHTML.lastIndexOf("</"));
}
function boldText(elm)
{
    elm.innerHTML = "<b>" + elm.innerHTML + "</b>"
}
function check(checkbox)
{
    if(checkbox.checked)
    {
        checkbox.parentElement.classList.add("completed");
    }
    else
    {
        checkbox.parentElement.classList.toggle("completed");
    }
    var currentDiv = document.getElementById("div1");
    var listName =  currentDiv.getAttribute("name");
    localStorage.setItem("list" + listName, currentDiv.outerHTML);
}
function deleteTask(button)
{
    button.parentElement.innerHTML = '';
    var currentDiv = document.getElementById("div1");
    var listName =  currentDiv.getAttribute("name");
    localStorage.setItem("list" + listName, currentDiv.outerHTML);

}
function editTask(button)
{
    button.innerHTML = "Done";
    button.setAttribute("onclick", "changeText(this);");
    var listItem = button.parentElement;
    var input = document.getElementById("input-task");
    input.value = listItem.getAttribute("name");


}
function changeText(button)
{
    button.innerHTML = "Edit";
    button.setAttribute("onclick", "editTask(this);");
    var listItem = button.parentElement;
    var newName = document.getElementById("input-task").value;
    document.getElementById("input-task").value = "";
    var text = listItem.getElementsByTagName(listItem.getAttribute("name"));
    listItem.setAttribute("name", newName);
    listItem.innerHTML = listItem.innerHTML.slice(0, listItem.innerHTML.indexOf("check(this)") + 13) + newName + listItem.innerHTML.slice(listItem.innerHTML.indexOf("<button"));
    var currentDiv = document.getElementById("div1");
    var listName =  currentDiv.getAttribute("name");
    localStorage.setItem("list" + listName, currentDiv.outerHTML);
}

