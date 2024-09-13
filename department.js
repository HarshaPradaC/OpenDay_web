window.onload = function() {
   
    const img = localStorage.getItem("result0");
    const dname = localStorage.getItem("result1");
    const desc = localStorage.getItem("result2");
    const link = localStorage.getItem("result3");
    const block = localStorage.getItem("result4");


    document.getElementById('department-details').innerHTML = `
        ${img}
        ${dname}
        ${desc}
        ${block}
        ${link}
    `;
}
