 /*
 Input: 
 const obj = {
    fullName: "Son Hao",
    age: undefined
 }
 //Out put
 return {
    fullName: "Son Hao"
 }
*/
export const filterFalsyValues = (obj: Record<string, any>) => {
    const objItems = Object.entries(obj)
    return objItems.reduce((result, item) => {
        const [key, value] = item;
        if(value){
            result[key] = value
        }
        return result
    }, {})
} 