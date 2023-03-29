export function formatDate(date){
    var cleaned = date.split('-')
    var dd = cleaned.slice(1).pop()
    dd = dd.split('T')[0]
    cleaned.splice(2,1, dd)
    var mmDD = cleaned.slice(1)

    mmDD.push(cleaned[0])
    return mmDD.join('/')
}

