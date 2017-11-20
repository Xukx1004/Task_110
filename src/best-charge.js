const AllItems = require('./items.js') ;
console.log(AllItems);
const promotions = require('./promotions.js') ;
module.exports =function bestCharge(selectedItems) {
    let allItems = AllItems();
    let promotion = promotions();
    let input = Obj_inputs(selectedItems);
    let obj_Sum = obj_sum(input,allItems);
    let final_sum =final_Sum(obj_Sum);
    let arr = output(input,obj_Sum,promotion,final_sum);
    let str = `============= 订餐明细 =============\n`+ arr[0];
    if(arr[1]){
      str += `使用优惠:\n` + `${arr[1]}\n` +
      `-----------------------------------\n`
    }
    str +=`总计：${arr[2]}元\n`+
    `===================================`
    return str;
  }
function Obj_inputs(inputs){
  let allItems= AllItems();
  let promotion = promotions();
  let obj={};
  let arr = inputs.map((str)=>(str.split(' x ')));
  for( let item of arr){
    obj[item[0]] = item[1] ;
  }
  return obj;
}
function obj_sum(input,allItems){
  let sum=0;
  let arr=[];
  for(let key in input){
    for(let i of allItems){
      if(i.id===key){
        let obj = {};
        obj[key]=input[key];
        obj.name=i.name;
        obj.sum=i.price*input[key];
        arr.push(obj);
      }
    }  
  }
  return arr;
}
function final_Sum(obj_Sum){
  let final_sum=0;
  for(let item of obj_Sum){
    final_sum+=item.sum;
  }
  return final_sum;
}
function output(input,obj_Sum,promotion,final_sum){
    let arr_out=[];
    let menu='';
    let promo='';
    for(let item of obj_Sum){
      for(let key in item){
         if(input[key]){
           menu += `${item.name} x ${input[key]} = ${item.sum}元\n`;
         }
      }
    }
    menu +=`-----------------------------------\n`;
    arr_out.push(menu);
    let pro1=0;
    let pro2=0;
    let pro=0;
    let  pro2_name=''; 
   if(final_sum>=30){
     pro1=6;
   } 
   for(let item of  obj_Sum){
     for(let key in item){
       if(promotion[1].items.indexOf(key)!== -1){
         pro2+=item.sum/2;
         pro2_name += `${item.name}，`;  
         }
      }
    }
    // pro2_name = pro2_name.slice(0,6);
    pro2_name = pro2_name.slice(0,-1);
    if(pro2>pro1){
      pro=pro2;
      promo=`${promotion[1].type}(${pro2_name})，省${pro}元`
    }
    if(pro1>pro2){
      pro=pro1;
      promo=`${promotion[0].type}，省${pro}元`;
    }
    arr_out.push(promo);
    arr_out.push(final_sum-pro);
    return  arr_out;   
}