function formatDate(date){
    var cleaned = date.split('-')
    var dd = cleaned.slice(1).pop()
    dd = dd.split('T')[0]
    cleaned.splice(2,1, dd)
    var mmDD = cleaned.slice(1)

    
    mmDD.push(cleaned[0])
    return mmDD.join('/')

}

console.log(formatDate("2004-04-10T00:00:00.000Z"))