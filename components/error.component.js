export const ErrorComponent=({title, message})=>{
    return(
        <div>
            <h3 className="text-center">{title}</h3>
            <div>{message}</div>
        </div>
    )
}