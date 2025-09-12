 
var containsDuplicate = function(nums) {
    
      
    let bucketOne = new Set();
    let duplicates= new Set()   ;

    for(let n of nums){
        if (bucketOne.has(n)){
            duplicates.add(n)
        }
        else{
            bucketOne.add(n)
        }
    }
    
    
        console.log('bucketOne:', bucketOne);
        console.log('duplicates:', duplicates);
    return duplicates;
    
    
};
containsDuplicate([1,2,1,3,4,5,6,7,8,9,10]);