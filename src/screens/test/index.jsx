export default function postScreen(){
   const [typeId,setTrypeId] = useState(0);
   return(
       <PostScreen typeId={typeId} />
   )
}