/// load orders from api 

const loadorders = () => {
    const xhttp = new XMLHttpRequest();
    // using xhttp 
    xhttp.open("GET", "http://localhost:3000/orders", false);
    xhttp.send();

    const orders = JSON.parse(xhttp.responseText);
    // now check how many orders we have and last value of json parse is total for all
    let resarray = orders.split(",\\n");
  /// vertiy strings very well
    for (let i = 0; i < resarray.length - 1; i++) {

        let order = resarray[i].split("\\n");;

        order.forEach(reomvequtes)
/// remove any spicel character
        function reomvequtes(item, index, arr) {
            arr[index] = arr[index].replace('"', '');
        }
/// printing to html page
        let x = "  <tr ><td> " + order[0] + "</td> <td> " + order[1] + "</td> <td>" + order[2] + "</td> ";
        let itemdetails = order[3].split(" ");
        let y = "";
        for (let s of itemdetails) {
            y += "<td>" + s + "</td>";
        }
        x += y + "</tr>";

        document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + x;
    }
    /// this is last value form hson parse I will make it in one table row
    let lastitem = resarray[resarray.length - 1];
    let last = lastitem.replace('"', '');
    let lastrow = ' <tr class="text-left"> <td colspan="1"> <b>Total </b></td><td class="text-center">' + last + '</td><td colspan="2"></td></tr>'
    document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + lastrow;

}
// finish

/// loading Restful api
loadorders();