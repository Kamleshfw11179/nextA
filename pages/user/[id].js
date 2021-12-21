import styles from "../../styles/styles.module.css"
import Link from "next/link"
export default function User({data}){
    console.log(data)
    return(
        <div style={{margin:"auto"}} className={styles.main}>
        <div className={styles.tile}>
         <img src={data.avatar}></img>
            <h3>{data.first_name} {data.last_name}</h3>
            <h4>{data.email}</h4>
            <Link href="/"><button>Home</button></Link>
            </div>
        </div>
    )
}

export async function getStaticPaths(){
    const res = await fetch("https://reqres.in/api/users?page=1")
    const data = await res.json();
    const paths = data.data.map((e)=>({
        params:{id:e.id.toString()}
    }))
    return {paths,fallback:false}
}

export async function getStaticProps({params}){
    let res = await fetch(`https://reqres.in/api/users/${params.id}`);
    let data = await res.json();
    if(!data){
        return{
            notFound:true
        }
    }else{
        return{
            props:data
        }
    }
}