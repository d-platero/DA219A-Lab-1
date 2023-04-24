let showDetails = document.getElementById("detailsButton");
let createData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");
let updateData = document.getElementById("updateButton");
let showAlbums = document.getElementById("showAlbumsButton")


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
        html += "<tr><td>" + albums[elem].id + "</td><td>" + albums[elem].title + "</td><td>" + albums[elem].artist + "</td><td>" + albums[elem].year + "</td></tr>"
        console.log(elem)
    }

    html += "</table>"

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