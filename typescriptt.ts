const msg: string = "Hello!";
alert(msg);

console.log('for przeddddd');
const stylearr:string[]=['style/lab1c.css', 'style/style2.css', 'style/style3.css']

const linkdivid = document.getElementById("links") as HTMLDivElement
const styleid= document.getElementById("style-sheet") as HTMLLIElement

console.log('for przed');

for(let i=0;i<stylearr.length;i++){
    console.log('for start');
    const link = document.createElement("a")
    link.href = stylearr[i];
    link.textContent=`Style ${i+1}                 `;
    link.addEventListener("click", (event)=>{
        event.preventDefault();
        styleid.setAttribute('href', link.href);
        console.log(`Zmieniono na ${link.textContent}`)
    })
    linkdivid.appendChild(link);
}

