import { useState } from "react";
import './Create.css'
import { GrFormNextLink } from 'react-icons/gr'
import { IoIosSend } from 'react-icons/io'
import { GrFormPreviousLink } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const navigate = useNavigate();
    const numPrompts = 10;
    // Array of prompts
    const [prompts, setPrompts] = useState(Array(numPrompts).fill({
        text: "",
        speechBubble: "",
    }));

    const handleTextChange = (e, index) => {
        const newPrompts = [...prompts];
        newPrompts[index] = {
            ...newPrompts[index],
            text: e.target.value,
        }
        setPrompts(newPrompts);
    }

    const handleSpeechBubbleChange = (e, index) => {
        const newPrompts = [...prompts];
        newPrompts[index] = {
            ...newPrompts[index],
            speechBubble: e.target.value,
        }
        setPrompts(newPrompts);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const state = {
            prompts,
        }
        navigate('/result', {state});
    }


    return (
        <div className="Create">
            <section className="intro">
                <h1>Start creating comic!</h1>
                <p>Please provide prompts here as concisely as possible. The prompts will be used to generate a picture. also type the speech bubbles text that you wanted to show in your image with mentioning the character who says this.</p>
                <a href="#input0">Start</a>
            </section>
            {prompts.map((prompt, index) => (
                <section className="inputs" key={index} id={`input${index}`}>
                    <div className="number">{index + 1}</div>
                    <input
                        type="text"
                        id={`text${index}`}
                        value={prompt.text}
                        onChange={(e) => handleTextChange(e, index)}
                        className="input"
                        required
                        placeholder={`Please provide prompt ${index + 1} here...`}
                    />
                    <input
                        type="text"
                        id={`speechBubble${index}`}
                        value={prompt.speechBubble}
                        onChange={(e) => handleSpeechBubbleChange(e, index)}
                        className="input"
                        required
                        placeholder={`Please provide speech bubble ${index + 1} here...`}
                    />
                    <div className="buttons">
                    {
                        index !== 0 && prompt.text && prompt.speechBubble &&
                        <a href={`#input${index - 1}`}><GrFormPreviousLink className="icon"/> Previous </a>
                    }
                    {
                        index !== prompts.length - 1 && prompt.text && prompt.speechBubble &&
                        <a href={`#input${index + 1}`}>Next <GrFormNextLink className="icon"/></a>
                    }
                    {
                        index === prompts.length - 1 && prompts.every(prompt => prompt.text && prompt.speechBubble) &&
                        <button className="button" onClick={handleSubmit}>Submit <IoIosSend className="icon"/></button>
                    }
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Create