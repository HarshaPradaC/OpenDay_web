document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 100;
    let currentPage = 1;
    let allDepartments = []; 

    function fetchDepartments(page) {
        fetch("https://openday.kumaraguru.in/api/v1/departments/")
            .then(response => response.json())
            .then(res => {
                allDepartments = res; 

                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;

                displayDepartments(allDepartments.slice(start, end));
                renderPaginationControls(allDepartments.length);
            })
            .catch(err => {
                document.getElementById('alldepartments').innerHTML = `<h2 style="color: red;">Error Fetching Data: ${err}</h2>`;
            });
    }

    function displayDepartments(departments) {
        const departmentsDiv = document.getElementById('alldepartments');
        departmentsDiv.innerHTML = ''; 

        departments.forEach(depart => {
            const randomImageId = Math.floor(Math.random() * 1000); 

            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'department';
            departmentDiv.setAttribute('data-id', depart.id); 
            
            departmentDiv.addEventListener('click', () => {
                onPress(depart.id); 
            });

            const img = document.createElement('img');
            img.src = `https://picsum.photos/id/${randomImageId}/200/300`;
            departmentDiv.appendChild(img);

            const nameDiv = document.createElement('div');
            nameDiv.className = 'department-name';
            nameDiv.innerHTML = `<h3>${depart.name}</h3>`;
            departmentDiv.appendChild(nameDiv);

            departmentsDiv.appendChild(departmentDiv);
        });
    }

    function renderPaginationControls(totalItems) {
        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = '';

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        
        if (currentPage > 1) {
            const prevButton = document.createElement('a');
            prevButton.className = 'page-button';
            prevButton.textContent = 'Previous';
            prevButton.href = '#';
            prevButton.addEventListener('click', (event) => {
                event.preventDefault();
                currentPage--;
                fetchDepartments(currentPage);
            });
            paginationControls.appendChild(prevButton);
        }

        
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('a');
            pageButton.className = 'page-button';
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.textContent = i;
            pageButton.href = '#';
            pageButton.addEventListener('click', (event) => {
                event.preventDefault();
                currentPage = i;
                fetchDepartments(currentPage);
            });
            paginationControls.appendChild(pageButton);
        }

        if (currentPage < totalPages) {
            const nextButton = document.createElement('a');
            nextButton.className = 'page-button';
            nextButton.textContent = 'Next';
            nextButton.href = '#';
            nextButton.addEventListener('click', (event) => {
                event.preventDefault();
                currentPage++;
                fetchDepartments(currentPage);
            });
            paginationControls.appendChild(nextButton);
        }
    }

    
    const searchBox = document.getElementById("search-bar");
    searchBox.addEventListener('input', () => {
        const search = searchBox.value.toLowerCase();
        console.log(search);

        const results = allDepartments.filter(department => department.name.toLowerCase().includes(search));
        displayDepartments(results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        renderPaginationControls(results.length);
        console.log(results);
    });

   
    fetchDepartments(currentPage);
});

function onPress(id) {
    const url = `https://openday.kumaraguru.in/api/v1/department/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
           
            localStorage.setItem("result0", `<img src="https://picsum.photos/id/${id}/1600/600" alt="Department Image">`);
            localStorage.setItem("result1", `<h2>Department Name: ${result.name}</h2>`);
            localStorage.setItem("result2", `<p>Description: ${result.description}</p>`);
            localStorage.setItem("result3", `<h2><a href="${result.link}" target="_blank">${result.link}</a></h2>`);
            localStorage.setItem("result4", `<h2>Block: ${result.block}</h2>`);

           
            window.location.href = "department.html";
        })
        .catch(error => console.error('Error fetching department details:', error));
}
