const http=new slhttp();
const items=document.querySelector('#items');
var flag=0;
var i=0;
var check=0;
http.get('https://st0io9y728.execute-api.ap-south-1.amazonaws.com/v1/rfid')
.then(data=>{
        const result = data.Items;
        console.log(result);
        result.sort((a,b)=>{
          return new Date(a.ts.S) - new Date(b.ts.S);
        })
        // loop to process data
        for(let i=0;i<result.length;i++){
                if(result[i].IO.N==1 && result[i].traversed!=true && result[i].REC.N ==65){
                    flag=0;
                    var rfid=result[i].RFID.S;
                    var rec=result[i].REC.N;
                    const dataFromServer = result.filter((record)=>{
                      return record.RFID.S === rfid;
                    })
                    result[i].traversed=true;
                    console.log(dataFromServer);
                    // sort it ad then do j=i;
                    for(let j=0;j<dataFromServer.length;j++){
                        if(dataFromServer[j].REC.N == rec && dataFromServer[j].IO.N==0 && dataFromServer[j].traversed!=true){
                              flag=1;
                              dataFromServer[j].traversed=true;
                              const demo = dataFromServer.filter((record)=>{
                                return record.REC.N==66;
                              })
                              console.log(demo.length)
                              if(demo.length!=0){
                                check=1;
                                for(let c=0;c<demo.length;c++){
                                  if(demo[c].REC.N == 66 && demo[c].IO.N==1 && demo[c].traversed!=true){
                                      for(a=0;a<demo.length;a++){
                                        if(demo[a].REC.N == 66){
                                          if(demo[a].IO.N==0 && demo[a].traversed!=true){
                                          check=0;
                                          demo[c].traversed=true;
                                          demo[a].traversed=true;
                                          const time1= new Date(demo[a].ts.S)
                                          const time2= new Date(demo[c].ts.S)
                                          const diff = (time2-time1)/1000;
                                          if(diff< 61 && diff > 0){
                                            const output= `RFID Passed through both the receivers in 60 seconds`;
                                            loadAllData(result[i],output,result[j].ts.S);
                                            flag=1;
                                            break;
                                          }
                                          else{
                                            const output=`RFID took longer than 60 seconds to pass through both the receivers`;
                                            loadAllData(result[i],output,result[j].ts.S);
                                            flag=1;
                                            break;
                                          }
                                        }
                                      }
                                    }
                                  }
                              }
                            }else{
                              const output="RFID passed through rec 65 and is still there"
                              //console.log(result[i])
                              loadAllData(result[i],output,dataFromServer[j].ts.S)
                            }
                        }
                        else if(dataFromServer[j].RFID.S == rfid && dataFromServer[j].IO.N==1 ){
                                continue;
                            }
                    } //end of 2 loop
                    if(flag==0){
                        const output=`RFID still in range of receiver 65`;
                        loadAllData(result[i],output);
                    }
                    if(check==1){
                        const output = "RFID passed through receiver 65 and its in range of 66";
                        loadAllData(result[i],output)
                    }
                }
        } //end of 1 loop

})
.catch((err)=>console.log(err));


function loadAllData(data,result,exitTime){
    // for(let i=0;i<data.length;i++){
    const trow=document.createElement('tr');
    const tdata1=document.createElement('td');
    tdata1.className="text-center";
    const tdata2=document.createElement('td');
    tdata2.className="text-center";
    const tdata3=document.createElement('td');
    tdata3.className="text-center";
    const tdata4=document.createElement('td');
    tdata4.className="text-center";
    const tdata5=document.createElement('td');
    tdata5.className="text-center";
    const tdata6=document.createElement('td');
    tdata6.className="text-center";
    i = i + 1;
    tdata1.innerHTML=`${i}`;
    tdata2.innerHTML= new Date(`${data.ts.S}`).toLocaleString();
    tdata3.innerHTML=`${data.RFID.S}`;
    tdata4.innerHTML=`${data.REC.N}`;
    tdata5.innerHTML=`${result}`;
    tdata6.innerHTML=new Date(`${exitTime}`).toLocaleString();
    trow.appendChild(tdata1);
    trow.appendChild(tdata3);
    trow.appendChild(tdata5);
    trow.appendChild(tdata4);
    trow.appendChild(tdata2);
    trow.appendChild(tdata6);
    items.appendChild(trow);
}