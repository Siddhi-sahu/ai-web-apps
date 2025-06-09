import Link from "next/link";

const Home =()=>{
    return (
    <div>
        <p>AI web Apps</p>
    <ul className="list-disc pl-14">
        <li><Link className="underline" href={"/nueronest"}>NeuroNest</Link></li>
        <li><Link className="underline" href={"/docubuddy"}>Docubuddy</Link></li>
        
    </ul>
    
    </div>
    )
};

export default Home;