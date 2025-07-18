import Title from "@/components/Title";
import StreamForm from "./StreamForm";

export default function NeuroNestHome(){
    return(
       <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex flex-col space-y-8 p-8 w-full max-w-4xl justify-center items-center">
            <Title title="StreamingFlow"/>
            <StreamForm />
        </div>
        </div>

        
    )
}

