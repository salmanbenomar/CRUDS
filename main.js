var table = document.querySelector("table")
var inputs = document.querySelectorAll("input")
let title = document.getElementById("title")
let totalInputs = document.querySelectorAll(".total input")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total-value")
let count = document.getElementById("count")
let category = document.getElementById("category")
let search = document.getElementById("search")
let searchBy = document.querySelectorAll(".search button")
var deleteAll = document.querySelector("#deleteAll")
let numDeleted = document.getElementById("numDeleted")
var tbody = document.querySelector("tbody")
let sum = 0
var updateEle = ''
let getTotal = () => {
	sum = Number(price.value) + Number(ads.value) + Number(taxes.value) - Number(discount.value)
	total.innerHTML = sum

}
totalInputs.forEach(input => {
	input.addEventListener("keyup", getTotal)
})

function createData() {
	
	if (!title.value || !price.value) {
        if(!title.value)
		   title.classList.add("emptyInput")
        else
           title.classList.remove("emptyInput")
        if(!price.value)
		    price.classList.add("emptyInput")
        else
            price.classList.remove("emptyInput")
            
        
		return;
	}
    totalInputs.forEach(e=>{
        if(!e.value && e.id != 'price')
            e.value = 0;
           
    })
	var obj = {
		title: title.value,
		price: price.value,
		taxes: taxes.value,
		ads: ads.value,
		discount: discount.value,
		sum: sum,
		category: category.value
	}
	if (!localStorage.getItem("product")) {

		var arr = [];
		arr = localStorage.setItem("product", JSON.stringify(arr))
	}
	arr = JSON.parse(localStorage.getItem("product"))
	var id = updateEle;
	if (count.value == "") {
		if (!updateEle)
			arr.unshift(obj)
		else {
			arr[updateEle] = obj
			updateEle = ''

		}
	} else {
		
		if (!updateEle) {
			for (let i = 1; i <= count.value; i++) {
				arr.unshift(obj)
			}
		} else {
			
			arr[updateEle] = obj;
			var k = Number(updateEle) + 1;
			for (let i = 1; i < count.value; i++) {
				arr.splice(k, 0, obj)
			}
			updateEle = ''
		}

	}
	inputs.forEach(input =>input.value = "")
    title.classList.remove("emptyInput")
    price.classList.remove("emptyInput")
	total.innerHTML = ''
	deleteAll.style.display = "block"
	numDeleted.innerHTML = arr.length
	localStorage.setItem("product", JSON.stringify(arr))
	showData()
	if(id){
		var element = document.getElementById(id)
        var scroll = element.parentNode.offsetTop + table.offsetTop - 150
		window.scrollTo(0, scroll)
	    
	}
	else{
		window.scrollTo(0, table.offsetTop - 150)
	}
	  
	

}


function showData() {
	if (localStorage.getItem("product")) {
		tbody.innerHTML = ""
		arr = JSON.parse(localStorage.getItem("product"));
		if (arr.length > 0) {
			for (let i = 0; i < arr.length; i++) {
				tbody.innerHTML += ` <tr>
            <td>${i+1}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].sum}</td>
            <td>${arr[i].category}</td>
            <td>
              <button class="update" id=${i} onclick='update(this.id)' >update</button>
            </td>
            <td>
              <button class="delete" id=${i}  onclick='deleteEle(this.id)'>delete</button>
            </td>
          </tr>`

			}
			deleteAll.style.display = "block"
			numDeleted.innerHTML = arr.length
		}
	}
}
showData()

function removeAll() {
	arr.splice(0)
	localStorage.setItem("product", JSON.stringify(arr))
	tbody.innerHTML = ""
	deleteAll.style.display = "none"

}

function deleteEle(i) {
	arr.splice(i, 1)
	if (arr.length == 0)
		deleteAll.style.display = "none"
	localStorage.setItem("product", JSON.stringify(arr))
	showData()

}

function update(i) {
	title.value = arr[i].title
	price.value = arr[i].price
	ads.value = arr[i].ads
	taxes.value = arr[i].taxes
	category.value = arr[i].category
	discount.value = arr[i].discount
	total.innerHTML = arr[i].sum;
	updateEle = i
	window.scrollTo(0, 0)
}

searchBy.forEach(btn => {
	btn.addEventListener("click", () => search.placeholder = btn.innerHTML)
})
searchProduct = () => {
	tbody.innerHTML = ""
	if (search.placeholder == "search") {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].title.toLowerCase().includes(search.value.toLowerCase()) ||
				arr[i].title.toLowerCase().includes(search.value.toLowerCase()))
				searchedData(i)
		}
	} else if (search.placeholder == "search by name") {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].title.toLowerCase().includes(search.value.toLowerCase()))

				searchedData(i)
		}
	} else {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].category.toLowerCase().includes(search.value.toLowerCase()))

				searchedData(i)
		}

	}


}

function searchedData(i) {
	tbody.innerHTML += ` <tr>
    <td>${i+1}</td>
    <td>${arr[i].title}</td>
    <td>${arr[i].price}</td>
    <td>${arr[i].taxes}</td>
    <td>${arr[i].ads}</td>
    <td>${arr[i].discount}</td>
    <td>${arr[i].sum}</td>
    <td>${arr[i].category}</td>
    <td>
      <button class="update" id=${i+1} onclick='update(this.id)' >update</button>
    </td>
    <td>
      <button class="delete" id=${i+1}  onclick='deleteEle(this.id)'>delete</button>
    </td>
    </tr>`
}
search.onkeyup = searchProduct
