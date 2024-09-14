let length;
let width;

calculateArea() {
    length = parseFloat(document.getElementById("length").value);
    width = parseFloat(document.getElementById("width").value);

    let area = lenth * width;

    document.getElementById("result").innerHTML `The area of the rectangle is ${area}`;
}