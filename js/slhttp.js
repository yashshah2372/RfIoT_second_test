class slhttp {
  get = (url) => {
    return new Promise(function(resolve,reject){
      fetch(url)
      .then(res=>{
        if(res.status>=200 && res.status<300){
        return res.json()
      }
      throw new Error(res.status + res.statusText);
    })
      .then(data=>resolve(data))
      .catch((err)=>reject(err))
    })
  }

  async post (url, data){
      const requestInfo={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      };
      const res=await fetch(url,requestInfo)
        if(res.ok){
         const data=res.json();
         return data;
        }  throw new Error(res.status + res.statusText);
      }

  async put(url,data){
        const requestInfo={
          method:"PUT",
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(data)
        };
       const res= await fetch(url,requestInfo)
          if(res.ok){
            const data=await res.json();
            return data;
          } throw new Error(res.status + res.statusText);
        }

 
  async delete(url){
        const requestInfo={
          method:"DELETE",
          headers:{
            'Content-Type':'application/json'
          }
        };
        const res=await fetch(url,requestInfo)
         if(res.ok){
          const data=await res.json();
          return data;
         }
         throw new Error(res.status + res.statusText);
        }
    }