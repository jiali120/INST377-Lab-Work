
function myfunction(y1,y2,...y3){
    const[x1, ...[result]] = y3

    console.log(result)
}

const myA = ['rock','paper','act','lis','spo']

myfunction(...myA)