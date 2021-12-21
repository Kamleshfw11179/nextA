import styles from "../styles/styles.module.css"
import Link from "next/link"
export default function Users({data}){
    return(
        <div className={styles.main}>
         <h1>Next App</h1>
           {data.data.map((e)=>{
               return(
                   <div key={e.id}>
                  
                   <div className={styles.tile}>
                       <img src={e.avatar}></img>
                       <h3>{e.first_name} {e.last_name}</h3>
                       <h4>{e.email}</h4>
                       <Link href={`/user/${e.id}`}><button key={e.id}>Check</button></Link>
                       </div>
                   </div>
               )
           })}
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch("https://reqres.in/api/users?page=1")
    const data = await res.json();
    
    if(!data){
        return{
            notFound:true
        }
    }else{
        return{
        props:{data}
        }
    }
}
