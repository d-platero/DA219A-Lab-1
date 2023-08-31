if (typeof window !== "undefined")
{
    let addData = document.getElementById("addButton");
    let deleteData = document.getElementById("deleteButton");
    let updateData = document.getElementById("updateButton");
    let showAlbums = document.getElementById("showAlbumsButton")
    let editData = document.getElementById("editButton");
}

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
        html += "<tr><td>" + albums[elem].id + 
        "</td><td>" + albums[elem].title
         + "</td><td>" + albums[elem].artist 
         + "</td><td>" + albums[elem].year 
         + "</td>"
         
        html += "</tr>"
    }

    html += "</table>"
    /*          <input type="text" id="idText"></input>
          <input type="text" id = "titleText" ></input>
          <input type="text" id = "artistText" ></input>
          <input type="text" id = "yearText" ></input> */

    document.getElementById("showAlbums").innerHTML = html

//    document.getElementById("showAlbums").innerHTML = books.map(b => JSON.stringify(b)).join('<br/>')
    }).catch(err => { 
        console.log(err); 
    }) 
 
});



async function deletedata(id, title, artist, year) { 
    try { 
        const result = await fetch('http://localhost:3000/api/albums', { 
            method: 'DELETE', 
            headers: { 'content-type': 'application/x-www-form-urlencoded' } ,
            body: new URLSearchParams({ "id": id, "title": title, "artist": artist, "year": year})
        });
    } catch (error) { 
        console.log(error) 
    }
}

deleteData.addEventListener('click', event => {
    const id = idText.value
    var title = titleText.value
    var artist = artistText.value
    var year = yearText.value
    Promise.resolve(deletedata(id, title, artist, year));

});

async function adddata(id, title, artist, year) { 
    try { 
        const result = await fetch('http://localhost:3000/api/albums', { 
            method: 'POST', 
            headers: { 'content-type': 'application/x-www-form-urlencoded' } ,
            body: new URLSearchParams({ "id": id, "title": title, "artist": artist, "year": year})
        });
        return
    } catch (error) { 
        console.log(error) 
    }
}

addData.addEventListener('click', event => {
    console.log('test')
    const id = idText.value
    var title = titleText.value
    var artist = artistText.value
    var year = yearText.value
    Promise.resolve(adddata(id, title, artist, year));
     
});

async function editdata(id, title, artist, year) { 
    try { 
        const result = await fetch('http://localhost:3000/api/albums', { 
            method: 'PUT', 
            headers: { 'content-type': 'application/x-www-form-urlencoded' } ,
            body: new URLSearchParams({ "id": id, "title": title, "artist": artist, "year": year})
        });
        return
    } catch (error) { 
        console.log(error) 
    }
}

editData.addEventListener('click', event => {
    console.log('test')
    const id = idText.value
    var title = titleText.value
    var artist = artistText.value
    var year = yearText.value
    Promise.resolve(editdata(id, title, artist, year));
});