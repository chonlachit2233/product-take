function loadProduct(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:5000/products");
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            var trHTML = '';
            for(let object of objects){
                trHTML += '<tr>';
                trHTML += '<td>' + object['id'] + '</td>';
                
                trHTML += '<td>' + object['product_name'] + '</td>';
                trHTML += '<td>' + object['product_price'] + '</td>';
                trHTML += '<td>' + object['product_cost'] + '</td>';
                trHTML += '<td><img width="50px" src="' + object['product_image'] + '"> </td>';
                trHTML += '<td>';
                trHTML += '<button type="button" class="btn btn-outline-warning" onclick="showProductEditBox(' + object['id'] + ')"> Edit </button>';
                trHTML += ' <button type="button" class="btn btn-outline-danger" onclick="productDelete(' + object['id'] + ')"> Delete </button>';
                

                trHTML += '</td>';
                trHTML += '</tr>';
            }
            document.getElementById("mytable").innerHTML = trHTML;
            
        }
    }
}
loadProduct();

function showProductEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:5000/products/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            const product = objects[0];

            Swal.fire({
                title: "Edit Product",
                html: `
                    <br>ID: <input id="id" type="text" value="${product.id}" readonly>
                    <br>Product Name: <input id="product_name" type="text" class="swal2-input" value="${product.product_name}">
                    <br>Price: <input id="product_price" type="text" class="swal2-input" value="${product.product_price}">
                    <br>Cost: <input id="product_cost" type="text" class="swal2-input" value="${product.product_cost}">
                    <br>Image URL: <input id="product_image" type="text" class="swal2-input" value="${product.product_image}">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    productEdit();
                }
            });
        }
    };
}

function productEdit(){
    const id = document.getElementById("id").value;
    const product_name = document.getElementById("product_name").value;
    const product_price = document.getElementById("product_price").value;
    const product_cost = document.getElementById("product_cost").value;
    const product_image = document.getElementById("product_image").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:5000/products/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({
        "id": id, "product_name": product_name, "product_price": product_price, "product_cost": product_cost, "product_image": product_image
    }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadProduct();
        }
    }
}

function productDelete(id) {
    Swal.fire({
        title: "คุณเเน่ใจที่จะลบไหม?",
        text: "เเน่ใจนะ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes!"
    }).then((result) => {
        if (result.isConfirmed) {
            const xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "http://localhost:5000/products/delete");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhttp.send(JSON.stringify({ "id": id }));

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    Swal.fire("Deleted!", "Product has been deleted.", "success");
                    loadProduct();
                }
            }
        }
        
    });
   // ฟังก์ชันสำหรับโหลดข้อมูลสินค้า
function loadProduct() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:5000/products");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            var trHTML = '';
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + object['id'] + '</td>';
                trHTML += '<td>' + object['product_name'] + '</td>';
                trHTML += '<td>' + object['product_price'] + '</td>';
                trHTML += '<td>' + object['product_cost'] + '</td>';
                trHTML += '<td><img width="50px" src="' + object['product_image'] + '"> </td>';
                trHTML += '</tr>';
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    }
}
loadProduct();

// ฟังก์ชันสำหรับแสดงกล่องเพิ่มสินค้า
function showAddProductBox() {
    Swal.fire({
        title: "Add New Product",
        html: `
            Product Name: <input id="product_name" type="text" class="swal2-input" placeholder="Enter product name">
            Price: <input id="product_price" type="text" class="swal2-input" placeholder="Enter product price">
            Cost: <input id="product_cost" type="text" class="swal2-input" placeholder="Enter product cost">
            Image URL: <input id="product_image" type="text" class="swal2-input" placeholder="Enter image URL">
        `,
        focusConfirm: false,
        preConfirm: () => {
            addProduct();
        }
    });
}

// ฟังก์ชันสำหรับเพิ่มสินค้าใหม่
function addProduct() {
    const product_name = document.getElementById("product_name").value;
    const product_price = document.getElementById("product_price").value;
    const product_cost = document.getElementById("product_cost").value;
    const product_image = document.getElementById("product_image").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:5000/products/add");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "product_name": product_name,
        "product_price": product_price,
        "product_cost": product_cost,
        "product_image": product_image
    }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadProduct(); // รีเฟรชข้อมูลสินค้า
        }
    }
}


    






    
    

}