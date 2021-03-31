import { useRouter } from 'next/router'
import { client } from '../../config/client'

const Detail=()=>{
    const router = useRouter()
    const { id } = router.query
    console.log(router.query)
    return <p>Post: {id}</p>
}

export default Detail