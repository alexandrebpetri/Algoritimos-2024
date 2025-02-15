let a = [1,2,3];

let b = [3,4,5];

function uniao(arr1, arr2){ 
    let u = [];

    for (let i = 0; i < arr1.length; i++){
         let u = arr1[i];

         console.log(u);

        for (let j = 0; j < arr2.length; j++){    
            u += arr2[j];
        }
    }   

    return u;
}

uniao(a, b);
//console.log(uniao(a, b)) ;