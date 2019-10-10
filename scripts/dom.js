function gid(name) {
	return document.getElementById(name);
}


let menuItems = document.getElementsByTagName('li');
console.log(menuItems);

let activeItems = document.getElementsByClassName("active");
console.log(activeItems);
console.log(activeItems[0].attributes.href);
let item = activeItems[0];
console.log(item.attributes.href);
console.log(item.attributes.class);



let x = gid("teine");
//x.innerText = "something else";
x.innerHTML = "<b>Teine</b>";
console.log(x.innerText);
console.log(x.innerHTML);
console.log(x);
