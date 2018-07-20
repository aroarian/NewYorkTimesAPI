$('#search').on("click",function(){
    var searchTerm = $('#searchTerm').val();
    var numRecords = $('#numrecords').val();
    var startYear = $('#startyear').val() + "0101";
    var endYear = $('#endyear').val() + "0101";
    var key = "97a7584639d64124945a57e13f31dc06"
    var queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&q=${searchTerm}`;
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function(response){
        var data = response.response.docs;
        data.forEach(element => {
            var articleDiv = $("<article>");
            var header =$('<p>');
            header.html(element.headline.main);
            var author =$('<p>');
            var uglyAuthor = (element.byline.original)
            var cleanAuthor = titleCase(uglyAuthor);
            author.html(cleanAuthor);
            var date =$('<p>');
            var uglyDate = new Date(element.pub_date); 
            var cleanDate = (uglyDate.getMonth() + 1) + '/' + uglyDate.getDate() + '/' +  uglyDate.getFullYear()
            date.html(cleanDate);
           
           
            var snippet =$('<p>');
            snippet.html(element.snippet);
            var hr = $("<hr>");
            articleDiv.append(header).append(author).append(date).append(snippet).append(hr);
            $('.artDiv').prepend(articleDiv);
        });
    })
})
$('#clear').on("click", function(){
    $('#endYear').val("");
    $('#starYear').val("");
    $('#numRecords').val("");
})
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }