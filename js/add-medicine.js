const form = document.getElementById("medicineForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        try {

            const imageInput = document.getElementById("image");
            const imageFile = imageInput.files[0];

            let imageName = null;


            
            if (imageFile) {

                const formData = new FormData();

                formData.append("image", imageFile);

                const uploadResponse = await fetch(
                    "https://pharmacy-management-backend-sdqp.onrender.com/api/upload",
                    {
                        method: "POST",
                        body: formData
                    }
                );

                const uploadData = await uploadResponse.json();

                if (!uploadResponse.ok) {
                    alert(uploadData.message || "Image upload failed");
                    return;
                }

                imageName = uploadData.image;
            }


            
            const medicine = {

                name: document.getElementById("name").value,

                category: document.getElementById("category").value,

                company: document.getElementById("company").value,

                price: document.getElementById("price").value,

                quantity: document.getElementById("quantity").value,

                expiry_date: document.getElementById("expiry").value,

                image: imageName
            };


            
            const response = await fetch(
                "https://pharmacy-management-backend-sdqp.onrender.com/api/medicines",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(medicine)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message || "Failed to add medicine");

                return;
            }


            
            alert(data.message || "Medicine added successfully");

            form.reset();


        } catch (error) {

            console.log(error);

            alert("Failed to Connect Backend");

        }

    });

}