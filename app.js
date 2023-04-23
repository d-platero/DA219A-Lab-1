let showData = document.getElementById("dataButton");
let createData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");
let updateData = document.getElementById("updateButton");


async function getdata() { 
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

getData.addEventListener("click", event => {     
    const value = Promise.resolve(getdata()); 
    value.then(books =>{ 
    console.log(books)
    document.getElementById("showBooks").innerHTML = books.map(b => JSON.stringify(b)).join('<br/>')
    }).catch(err => { 
        console.log(err); 
    }) 
 
});



async function deletedata(name, category, date, author) { 
    try { 
        const result = await fetch('http://localhost:5000/deleteData', { 
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
        const result = await fetch('http://localhost:5000/addData', { 
            method: 'POST', 
            headers: { 'content-type': 'application/x-www-form-urlencoded' } ,
            body: new URLSearchParams({ "name": name, "category": category, "date": date, "author": author})
        });
        return
    } catch (error) { 
        console.log(error) 
    }
}

addData.addEventListener('click', event => {
    // add data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value
    Promise.resolve(adddata(name, category, date, author));
     
});