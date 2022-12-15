import Navbar from "./Components/Navbar";
import TextArea from "./Components/TextArea";
import Alert from "./Components/Alert";
import {useState} from'react';


function App() {
  const [mode,setMode]=useState('light');
  const toggel = () =>{
    if(mode==='dark'){
      setMode('light');
      setmodeStyle({'backgroundColor':'white', 'height':'100vh'});
      setTextAreaStyle({'backgroundColor':'white', 'color':'black'});
      alertDetails("Light Mode Enabled 🔥","success");
    }else{
      setMode('dark');
      setmodeStyle({'backgroundColor':'grey', 'height':'100vh'});
      setTextAreaStyle({'backgroundColor':'grey','color':'white'});
      alertDetails("Dark Mode Enabled 😎","success");
    }
  }
  const [modeStyle,setmodeStyle] = useState({'backgroundColor':'white', 'height':'100vh'});
  const [textAreaStyle,setTextAreaStyle] = useState({'backgroundColor':'white'});

  const [message,setMessage] = useState("");
  const [type,setType] = useState("")

  const alertDetails = (message,type) =>{
    setMessage(message);
    setType(type);

    setTimeout(()=>{
      setMessage("");
      setType("");
    },1500)
  }

  return (
    <div style={modeStyle}>
      <Navbar title="Expression Converter" mode={mode} toggel={toggel} style={modeStyle}/>
      <Alert message={message} type={type}/>
      <TextArea modeStyle={textAreaStyle} mode={mode} alertDetails={alertDetails}/>
    </div>
  );
}

export default App;