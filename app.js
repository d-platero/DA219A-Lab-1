let createData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");
let updateData = document.getElementById("updateButton");
let showAlbums = document.getElementById("showAlbumsButton")
let test = document.getElementBy

async function getData() { 
    try { 
        const result = await fetch('http://localhost:3000/api/albums', { 
            method: 'GET', 
            headers: { 'content-type': 'application/json' } 
        });
        return(result.json()) 
    } catch (error) { 
        console.log(error) 
    }
}

showAlbums.addEventListener("click", event => {     
    const value = Promise.resolve(getData()); 
    value.then(albums =>{ 
    console.log(albums)
    let html = ` <table cellspacing="20">
    <tr>
      <th align="left">ID</th>
      <th align="left">Title</th>
      <th align="left">Artist</th>
      <th align="left">Year</th>
    </tr>`

    for (let elem in albums) {
        console.log(albums[elem])
        html += "<tr><td><input type=\"text\" id=\"idText\" value=\"" + albums[elem].id + 
        "\"</input></td><td><input type=\"text\" id=\"titleText\" value=\"" + albums[elem].title
         + "\"</input></td><td><input type=\"text\" id=\"artistText\" value=\"" + albums[elem].artist 
         + "\"</input></td><td><input type=\"text\" id=\"yearText\" value=\"" + albums[elem].year 
         + "\"s</input></td>"
         
        html += `<button type="button" id="addButton">Add album</button>
        <button type="button" id="deleteButton">Delete album</button>
        <button type="button" id="updateButton">Update album</button></tr>`
        console.log(elem)
    }

    html += "</table>"
    /*          <input type="text" id="idText"></input>
          <input type="text" id = "titleText" ></input>
          <input type="text" id = "artistText" ></input>
          <input type="text" id = "yearText" ></input> */

    document.getElementById("showAlbums").innerHTML = html

//    document.getElementById("showAlbums").innerHTML = books.map(b => JSON.stringify(b)).join('<br/>')
    console.log(document.getElementById("showAlbums").innerHTML)
    }).catch(err => { 
        console.log(err); 
    }) 
 
});



async function deletedata(name, category, date, author) { 
    try { 
        const result = await fetch('http://localhost:3000/deleteData', { 
            method: 'POST', 
            headers: { 'content-type': 'application/x-www-form-urlencoded' } ,
            body: new URLSearchParams({ "name": name, "category": category, "date": date, "author": author})
        });
    } catch (error) { 
        console.log(error) 
    }
}

deleteData.addEventListener('click', event => {
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    Promise.resolve(deletedata(name, category, date, author));

});

async function adddata(name, category, date, author) { 
    try { 
        const result = await fetch('http://localhost:3000/addData', { 
            method: 'POST', 
            headers: { 'content-type': 'application/x-www-form-urlencoded' } ,
            body: new URLSearchParams({ "name": name, "category": category, "date": date, "author": author})
        });
        return
    } catch (error) { 
        console.log(error) 
    }
}

createData.addEventListener('click', event => {
    // add data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value
    Promise.resolve(adddata(name, category, date, author));
     
});