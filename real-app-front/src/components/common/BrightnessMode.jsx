import { useState } from 'react'
import '../../css/brightnessMode.css'
function BrightnessMode() {
    const [isBright, setIsBright] = useState(false)

    const toggleBrightness = () => {
        setIsBright((prev) => !prev);

        document.body.style.backgroundColor = isBright ? 'black' : 'white'
        document.body.style.color = isBright ? 'white' : 'black'

        const divs = document.querySelectorAll('div')
        divs.forEach(div => {
            div.style.backgroundColor = isBright ? '#222' : '#f5f5f5'
            div.style.color = isBright ? '#ddd' : '#333'
        })

        const texts = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,ul,li,')
        texts.forEach(text => {
            text.style.color = isBright ? 'white' : 'black';
        });
    };


    return (
        <>
            <div className={`custom-toggle ${isBright ? 'bright' : 'dark'}`}
                onClick={toggleBrightness} >
                <div className={`toggle-icon ${isBright ? 'bright' : 'dark'}`}>
                    {isBright ? (
                        <i className="bi bi-brightness-high-fill"></i>
                    ) : (
                        <i className="bi bi-moon"></i>
                    )}
                </div>
            </div>

        </>

    );
}

export default BrightnessMode;
