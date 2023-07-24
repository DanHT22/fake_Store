// Traer los elementos
let mainProds = document.getElementById("mainProds");

// Promesa 
function getData() {
    let promesa = fetch("https://fakestoreapi.com/products/", {
        method: "GET"
    });

    promesa.then((response) => {
        response.json()
            .then(
                (data) => {
                    createCards(data);
                })
            .catch((error) => {
                console.error("Problema en el json", error);
            })
    }).catch((error) => {
        console.error(error, "Ocurrió un error en la solicitud");
    });

}

//llamar a la función
getData();

//crear cards
function createCards(data) {
    data.forEach(producto => {
        mainProds.insertAdjacentHTML("beforeend", `
        <div class="card col" style="width: 18rem">
            <img src="${producto.image}" alt="${producto.description}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${producto.title}</h5>
            <p class="card-text"><strong>${producto.category}</strong></p>
            <p class="card-text">${producto.description.slice(0, 80)} ... </p>
            <button type="button" class="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal_${producto.id}">
            Más Info
            </button>
            </div>
    </div> <!--card-->

    <!-- Modal -->
    <div class="modal fade" id="exampleModal_${producto.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${producto.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal">
                </div>
                <div class="modal-body">
                ${producto.description}
                <p class="text-end"><strong>$${producto.price} USD</strong></p>
                </div>
                <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
        `);

    }//foreach
    );
}//createCards

