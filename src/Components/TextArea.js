import React,{useState} from 'react'


export default function TextArea(props) {
    
    const [text,setText] = useState("");

    const onChangeHandler = (event)=>{
        setText(event.target.value);
    }

    const changeToPostfix = (event) =>{
        /* Javascript implementation to convert
        infix expression to postfix*/
        
        //Function to return precedence of operators
        function prec(c) {
            if(c === '^')
                return 3;
            else if(c === '/' || c==='*')
                return 2;
            else if(c === '+' || c === '-')
                return 1;
            else
                return -1;
        }

        // The main function to convert infix expression
        //to postfix expression
        function infixToPostfix(s) {

            let st = []; //For stack operations, we are using C++ built in stack
            let result = "";

            for(let i = 0; i < s.length; i++) {
                let c = s[i];

                // If the scanned character is
                // an operand, add it to output string.
                if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
                    result += c;

                // If the scanned character is an
                // ‘(‘, push it to the stack.
                else if(c === '(')
                    st.push('(');

                // If the scanned character is an ‘)’,
                // pop and to output string from the stack
                // until an ‘(‘ is encountered.
                else if(c === ')') {
                    while(st[st.length - 1] !== '(')
                    {
                        result += st[st.length - 1];
                        st.pop();
                    }
                    st.pop();
                }

                //If an operator is scanned
                else {
                    while(st.length !== 0 && prec(s[i]) <= prec(st[st.length - 1])) {
                        result += st[st.length - 1];
                        st.pop();
                    }
                    st.push(c);
                }
            }

            // Pop all the remaining elements from the stack
            while(st.length !== 0) {
                result += st[st.length - 1];
                st.pop();
            }

            setText(result);
        }
        
        let exp = text;
        infixToPostfix(exp);
    }

    const changeToPrefix = (event) =>{
    // JavaScript program to convert
    // infix to prefix.

    // Function to check if
    // given character is
    // an operator or not.
    function isOperator(c)
    {
        return (!(c >= 'a' && c <= 'z') &&
                !(c >= '0' && c <= '9') &&
                !(c >= 'A' && c <= 'Z'));
    }

    // Function to find priority
    // of given operator.
    function getPriority(C)
    {
        if (C === '-' || C === '+')
            return 1;
        else if (C === '*' || C === '/')
            return 2;
        else if (C === '^')
            return 3;
        return 0;
    }

    // Function that converts infix
    // expression to prefix expression.
    function infixToPrefix(infix)
    {
        // stack for operators.
        let operators = [];

        // stack for operands.
        let operands = [];

        for (let i = 0; i < infix.length; i++)
        {

            // If current character is an
            // opening bracket, then
            // push into the operators stack.
            if (infix[i] === '(')
            {
                operators.push(infix[i]);
            }

            // If current character is a
            // closing bracket, then pop from
            // both stacks and push result
            // in operands stack until
            // matching opening bracket is
            // not found.
            else if (infix[i] === ')')
            {
                while (operators.length!==0 &&
                    operators[operators.length-1] !== '(')
                    {

                    // operand 1
                    let op1 = operands.pop();
                    

                    // operand 2
                    let op2 = operands.pop();
                    

                    // operator
                    let op = operators.pop();
                    

                    // Add operands and operator
                    // in form operator +
                    // operand1 + operand2.
                    let tmp = op + op2 + op1;
                    operands.push(tmp);
                }

                // Pop opening bracket
                // from stack.
                operators.pop();
            }

            // If current character is an
            // operand then push it into
            // operands stack.
            else if (!isOperator(infix[i]))
            {
                operands.push(infix[i] + "");
            }

            // If current character is an
            // operator, then push it into
            // operators stack after popping
            // high priority operators from
            // operators stack and pushing
            // result in operands stack.
            else
            {
                while (operators.length &&
                    getPriority(infix[i]) <=
                        getPriority(operators[operators.length-1]))
                    {

                    let op1 = operands.pop();
                    

                    let op2 = operands.pop();
                    

                    let op = operators.pop();
                    

                    let tmp = op + op2 + op1;
                    operands.push(tmp);
                }

                operators.push(infix[i]);
            }
        }

        // Pop operators from operators
        // stack until it is empty and
        // operation in add result of
        // each pop operands stack.
        while (operators.length!==0)
        {
            let op1 = operands.pop();
            

            let op2 = operands.pop();
            

            let op = operators.pop();
            

            let tmp = op + op2 + op1;
            operands.push(tmp);
        }

        // Final prefix expression is
        // present in operands stack.
        return operands[operands.length-1];
    }
    setText(infixToPrefix(text));
    }

    const copyToClipborad = () =>{
        navigator.clipboard.writeText(text);
        props.alertDetails("Copied To Clipbord 🎉","info");
    }

    const clearText=()=>{
        let newText="";
        setText(newText);
    }
    return (
    <div>
        <div className="container my-3">
            <div className="mb-3">
                <h2 style={{'color':props.mode==='dark'?'white':'black'}}>Enter Your Expression Here</h2>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" value={text} onChange={onChangeHandler} style={props.modeStyle}></textarea>
            </div>
            <div className="btn btn-primary mx-1 my-1" onClick={changeToPostfix}>Convert To Postfix</div>
            <div className="btn btn-primary mx-1 my-1" onClick={changeToPrefix}>Convert To Prefix</div>
            <div className="btn btn-primary mx-1 my-1" onClick={copyToClipborad}>Copy Text</div>
            <div className="btn btn-primary mx-1 my-1" onClick={clearText}>Clear Text</div>
        </div>
    </div>
  )
}
