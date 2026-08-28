const table = document.getElementById("medicineTable");

if (table) {

    fetch("http://localhost:5000/api/medicines")
        .then(response => response.json())
        .then(medicines => {

            table.innerHTML = "";

            medicines.forEach((medicine) => {

                let imageHTML = "No Image";

                if (medicine.image) {
                    imageHTML = `
                        <img
                            src="http://localhost:5000/uploads/${medicine.image}"
                            width="60"
                            height="60"
                            alt="Medicine Image"
                            style="object-fit: cover; border-radius: 5px;">
                    `;
                }

                table.innerHTML += `
                    <tr>

                        <td>
                            ${imageHTML}
                        </td>

                        <td>${medicine.name}</td>

                        <td>${medicine.category}</td>

                        <td>${medicine.price} Tk</td>

                        <td>${medicine.quantity}</td>

                        <td>
                            <button onclick="editMedicine(${medicine.id})">
                                Edit
                            </button>

                            <button onclick="deleteMedicine(${medicine.id})">
                                Delete
                            </button>
                        </td>

                    </tr>
                `;

            });

        })
        .catch(error => {

            console.log(error);
            alert("Failed to Load Medicines");

        });
}



function searchMedicine() {

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();

    let rows = document.querySelectorAll("#medicineTable tr");

    rows.forEach(function (row) {

        if (row.cells.length > 1) {

            let medicine = row.cells[1]
                .textContent
                .toLowerCase();

            if (medicine.includes(input)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        }

    });

}



async function deleteMedicine(id) {

    if (confirm("Are you sure you want to delete this medicine?")) {

        try {

            const response = await fetch(
                `http://localhost:5000/api/medicines/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            alert(data.message);

            location.reload();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    }

}



async function editMedicine(id) {

    const name = prompt("Medicine Name");
    if (name === null) return;

    const category = prompt("Category");
    if (category === null) return;

    const company = prompt("Company");
    if (company === null) return;

    const price = prompt("Price");
    if (price === null) return;

    const quantity = prompt("Quantity");
    if (quantity === null) return;

    const expiry_date = prompt("Expiry Date (YYYY-MM-DD)");
    if (expiry_date === null) return;

    try {

        // First get existing medicine
        const getResponse = await fetch(
            `http://localhost:5000/api/medicines`
        );

        const medicines = await getResponse.json();

        const existingMedicine = medicines.find(
            medicine => medicine.id == id
        );

        const image = existingMedicine
            ? existingMedicine.image
            : null;


        // Update medicine
        const response = await fetch(
            `http://localhost:5000/api/medicines/${id}`,
            {

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
                    expiry_date,
                    image

                })

            }
        );

        const data = await response.json();

        alert(data.message);

        location.reload();

    } catch (error) {

        console.log(error);

        alert("Update Failed");

    }

}