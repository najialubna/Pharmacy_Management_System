const form = document.getElementById("medicineForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const medicine = {

            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            company: document.getElementById("company").value,
            price: document.getElementById("price").value,
            quantity: document.getElementById("quantity").value,
            expiry_date: document.getElementById("expiry").value

        };

        try {

            const response = await fetch("/api/medicines", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(medicine)

            });

            const data = await response.json();

            alert(data.message);

            form.reset();

        } catch (error) {

            console.log(error);

            alert("Failed to Connect Backend");

        }

    });

}
const table = document.getElementById("medicineTable");

if (table) {

    fetch("/api/medicines")
        .then(response => response.json())
        .then(medicines => {

            medicines.forEach((medicine) => {

              let imageHTML = "No Image";

if (medicine.image) {
    imageHTML = `
        <img
            src="/uploads/${medicine.image}"
            width="60"
            height="60"
            alt="Medicine Image"
            style="object-fit: cover; border-radius: 5px;">
    `;
}

table.innerHTML += `
<tr>
    <td>${imageHTML}</td>
    <td>${medicine.name}</td>
    <td>${medicine.category}</td>
    <td>${medicine.price} Tk</td>
    <td>${medicine.quantity}</td>
    
    <button onclick="editMedicine(${medicine.id})">Edit</button>
    <button onclick="deleteMedicine(${medicine.id})">Delete</button>
</td>
                           
                </tr>
                `;

            });

        })
        .catch(error => {
            console.log(error);
            alert("Failed to load medicines");
        });

}


function searchMedicine() {

    let input = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#medicineTable tr");

    rows.forEach(function(row){

        let medicine = row.cells[1].textContent.toLowerCase();

        if(medicine.includes(input)){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

}

async function deleteMedicine(id){

    if(confirm("Are you sure you want to delete this medicine?")){

        try{

           const response = await fetch(
    `/api/medicines/${id}`,
    {
        method: "DELETE"
    }
);
            

            const data = await response.json();

            alert(data.message);

            location.reload();

        }
        catch(error){

            console.log(error);
            alert("Delete Failed");

        }

    }

}

async function editMedicine(id) {

    const name = prompt("Enter Medicine Name:");
    if (name === null) return;

    const category = prompt("Enter Category:");
    if (category === null) return;

    const company = prompt("Enter Company:");
    if (company === null) return;

    const price = prompt("Enter Price:");
    if (price === null) return;

    const quantity = prompt("Enter Quantity:");
    if (quantity === null) return;

    const expiry_date = prompt("Enter Expiry Date (YYYY-MM-DD):");
    if (expiry_date === null) return;

    try {

        const response = await fetch(`/api/medicines/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                category,
                company,
                price,
                quantity,
                expiry_date
            })

        });

        const data = await response.json();

        alert(data.message);

        location.reload();

    } catch (error) {

        console.log(error);
        alert("Update Failed");

    }

}

      const inventoryTable = document.getElementById("inventoryTable");

if (inventoryTable) {

    fetch("/api/medicines")
        .then(response => response.json())
        .then(medicines => {

            let lowStock = 0;
            let outStock = 0;

            document.getElementById("totalMedicine").innerText = medicines.length;

            medicines.forEach((medicine) => {

                let status = "Available";

                if (medicine.quantity == 0) {
                    status = "Out of Stock";
                    outStock++;
                } else if (medicine.quantity <= 10) {
                    status = "Low Stock";
                    lowStock++;
                }

                inventoryTable.innerHTML += `
                <tr>
                    <td>${medicine.name}</td>
                    <td>${medicine.category}</td>
                    <td>${medicine.price} Tk</td>
                    <td>${medicine.quantity}</td>
                    <td>${status}</td>
                </tr>
                `;
            });

            document.getElementById("lowStock").innerText = lowStock;
            document.getElementById("outStock").innerText = outStock;
        });
}



const salesForm = document.getElementById("salesForm");

if (salesForm) {

    const medicineSelect = document.getElementById("saleMedicine");

    
   fetch("/api/medicines")
        .then(response => response.json())
        .then(medicines => {

            medicines.forEach((medicine) => {

                medicineSelect.innerHTML += `
                    <option value="${medicine.id}">
                        ${medicine.name}
                    </option>
                `;

            });

        });

    
    fetch("/api/sales")
        .then(response => response.json())
        .then(sales => {

            const salesTable = document.getElementById("salesTable");

            sales.forEach((sale) => {

                salesTable.innerHTML += `
                    <tr>
                        <td>${sale.id}</td>
                        <td>${sale.customer}</td>
                        <td>${sale.medicine_id}</td>
                        <td>${sale.quantity}</td>
                        <td>${sale.total} Tk</td>
                    </tr>
                `;

            });

        });

    
    salesForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const sale = {

            medicine_id: medicineSelect.value,
            customer: document.getElementById("customer").value,
            quantity: document.getElementById("saleQuantity").value,
            price: document.getElementById("salePrice").value,
            total:
                Number(document.getElementById("saleQuantity").value) *
                Number(document.getElementById("salePrice").value)

        };

        try {

            const response = await fetch("/api/sales", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(sale)

            });

            const data = await response.json();

            alert(data.message);

            location.reload();

        } catch (error) {

            console.log(error);

            alert("Failed to Add Sale");

        }

    });

}