import{R as r}from"./index.37bf5aad.js";const c=r("shopCar",{state:()=>({car:[]}),actions:{clearCar(){this.car=[]}},getters:{countCarNumber:r=>r.car.reduce(((r,c)=>r+=c.goodscount),0),countPrice:r=>r.car.reduce(((r,c)=>(c.done&&(r+=c.price*c.goodscount),r)),0),isAllcheckedGoods(r){const c=r.car.reduce(((r,c)=>(c.done&&r++,r)),0);return 0!==r.car.length&&c===r.car.length}}});export{c as u};