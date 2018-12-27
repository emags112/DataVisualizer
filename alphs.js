let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let array = [];

alpha.forEach(function(letter){
    let link = '#' + letter;
    array.push('<a href="' + link + '">' + letter + '</a>')
});

array.forEach(function(link){
    console.log(link);
})